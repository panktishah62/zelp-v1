import { showDialogBox } from '../../utils';

export function calculateTotal(billingData) {
    const restaurants = billingData.restaurants;
    let isWalletMoneyUsed = billingData.isWalletMoneyUsed;
    const config = billingData.config;
    let billingDetails = {};
    let discountAmount = billingData.discountAmount
        ? billingData.discountAmount
        : 0;
    let coupon = billingData.discountAmount ? billingData.coupon : null;
    const count = billingData.count ? billingData.count : 0;
    if (restaurants) {
        let totalPriceByRestaurant = 0;
        for (const restaurantId in restaurants) {
            restaurants[restaurantId].totalItemsOfRestaurant = 0;
            let restaurantTotal = 0;
            for (const foodItemId in restaurants[restaurantId].foodItems) {
                const price = Number(
                    restaurants[restaurantId].foodItems[foodItemId].foodItem
                        .price,
                );
                const count = Number(
                    restaurants[restaurantId].foodItems[foodItemId].count,
                );
                restaurantTotal += Number(price * count);
                restaurants[restaurantId].totalItemsOfRestaurant += count;
            }
            restaurants[restaurantId].restaurantTotal = Number(restaurantTotal);
            totalPriceByRestaurant += Number(restaurantTotal);
        }
        const taxes = Math.round(
            Number(totalPriceByRestaurant * config.GSTtaxes) / 100,
        );

        if (totalPriceByRestaurant < config.minOrderValue) {
            isWalletMoneyUsed = false;
        }
        const maxWalletMoneyToUse = isWalletMoneyUsed
            ? config.maxWalletMoneyToUse
            : 0;

        const canApplyCoupon = isCouponValidForCart(
            restaurants,
            count,
            config,
            totalPriceByRestaurant,
            coupon,
        );

        const totalAmountBeforeDiscount =
            Number(totalPriceByRestaurant) +
            Number(config.deliveryPartnerFees) +
            Number(config.packagingCharges) +
            Number(config.deliveryTip) +
            Number(taxes);

        if (!canApplyCoupon) {
            discountAmount = 0;
            coupon = null;
        } else {
            discountAmount = calculateCouponDiscount(
                coupon,
                totalAmountBeforeDiscount,
            );
        }

        const totalAmount =
            totalAmountBeforeDiscount -
            Number(maxWalletMoneyToUse) -
            Number(discountAmount);

        billingDetails = {
            totalItemsPrice: totalPriceByRestaurant,
            totalAmount: totalAmount,
            deliveryPartnerFees: config.deliveryPartnerFees,
            packagingCharges: config.packagingCharges,
            isDeliveryFree: config.isDeliveryFree,
            deliveryTip: config.deliveryTip,
            taxes: taxes,
            walletMoney: isWalletMoneyUsed ? config.maxWalletMoneyToUse : 0,
            discountAmount: discountAmount,
        };
    } else {
        return null;
    }
    return billingDetails;
}

export function addItemToRestaurants(_foodItem, _restaurant, state) {
    const foodItem = _foodItem;
    const restaurant = _restaurant;
    const restaurants = state.restaurants;
    const config = state.config;
    const isWalletMoneyUsed = state.isWalletMoneyUsed;
    let count = state.foodItemsCount;
    const discountAmount = state.discountAmount;
    const coupon = state.coupon;
    if (restaurants && foodItem && restaurant) {
        const restaurantId = restaurant._id;
        const foodItemId = foodItem._id;
        if (restaurantId in restaurants) {
            if (foodItemId in restaurants[restaurantId].foodItems) {
                restaurants[restaurantId].foodItems[foodItemId].count += 1;
            } else {
                restaurants[restaurantId].foodItems[foodItemId] = {
                    foodItem: foodItem,
                    count: 1,
                };
                count += 1;
            }
        } else {
            let updatedFoodItem = {};
            updatedFoodItem[foodItemId] = { foodItem: foodItem, count: 1 };
            restaurants[restaurantId] = {
                restaurant: restaurant,
                foodItems: updatedFoodItem,
            };
            count += 1;
        }

        const billingData = {
            restaurants,
            config,
            isWalletMoneyUsed,
            discountAmount,
            coupon,
            count,
        };

        const billingDetails = calculateTotal(billingData);
        return { restaurants, count, billingDetails };
    } else if (foodItem && restaurant) {
        const restaurantId = restaurant._id;
        const foodItemId = foodItem._id;
        let updatedRestaurants = {};
        let updatedFoodItem = {};
        updatedFoodItem[foodItemId] = { foodItem: foodItem, count: 1 };
        updatedRestaurants[restaurantId] = {
            restaurant: restaurant,
            foodItems: updatedFoodItem,
        };
        count += 1;

        const billingData = {
            restaurants: updatedRestaurants,
            config,
            isWalletMoneyUsed,
            discountAmount,
            coupon,
            count,
        };

        const billingDetails = calculateTotal(billingData);
        return { restaurants: updatedRestaurants, count, billingDetails };
    }

    const billingData = {
        restaurants,
        config,
        isWalletMoneyUsed,
        discountAmount,
        coupon,
        count,
    };

    const billingDetails = calculateTotal(billingData);
    return { restaurants, count, billingDetails };
}

export function removeItemFromRestaurant(_foodItem, _restaurant, state) {
    const foodItem = _foodItem;
    const restaurant = _restaurant;
    const restaurants = state.restaurants;
    const config = state.config;
    let isWalletMoneyUsed = state.isWalletMoneyUsed;
    let count = state.foodItemsCount;
    const discountAmount = state.discountAmount;
    const coupon = state.coupon;
    if (restaurants && foodItem && restaurant) {
        const restaurantId = restaurant._id;
        const foodItemId = foodItem._id;
        if (restaurantId in restaurants) {
            if (foodItemId in restaurants[restaurantId].foodItems) {
                if (restaurants[restaurantId].foodItems[foodItemId].count > 1) {
                    restaurants[restaurantId].foodItems[foodItemId].count -= 1;
                } else {
                    count -= 1;
                    delete restaurants[restaurantId].foodItems[foodItemId];
                }

                if (
                    Object.keys(restaurants[restaurantId].foodItems).length ===
                    0
                ) {
                    delete restaurants[restaurantId];
                }
            }
        }
        if (Object.keys(restaurants).length === 0) {
            return {
                restaurants: null,
                count: 0,
                billingDetails: null,
                isWalletMoneyUsed: false,
            };
        }

        const billingData = {
            restaurants,
            config,
            isWalletMoneyUsed,
            discountAmount,
            coupon,
            count,
        };

        const billingDetails = calculateTotal(billingData);
        if (billingDetails.totalItemsPrice < config.minOrderValue) {
            isWalletMoneyUsed = false;
        }
        return { restaurants, count, billingDetails, isWalletMoneyUsed };
    }

    const billingData = {
        restaurants,
        config,
        isWalletMoneyUsed,
        discountAmount,
        coupon,
        count,
    };

    const billingDetails = calculateTotal(billingData);
    if (billingDetails.totalItemsPrice < config.minOrderValue) {
        isWalletMoneyUsed = false;
    }
    return { restaurants, count, billingDetails, isWalletMoneyUsed };
}

export function reorder(orderData, _state) {
    let addItemsData = null;
    let state = _state;
    orderData.cart.foodItems.map(foodItem => {
        if (addItemsData && addItemsData.restaurants) {
            state.restaurants = addItemsData.restaurants;
            state.foodItemsCount = addItemsData.count;
        }
        addItemsData = addItemToRestaurants(
            foodItem.id,
            foodItem.id.restaurant,
            state,
        );
    });
    return {
        restaurants: addItemsData.restaurants,
        count: addItemsData.count,
        billingDetails: addItemsData.billingDetails,
    };
}

export function canApplyWallet(_state, showDialog = true) {
    const state = _state;
    if (
        state.walletMoney &&
        state.config &&
        Number(state.walletMoney) < Number(state.config.maxWalletMoneyToUse)
    ) {
        if (showDialog) {
            showDialogBox(
                'Wallet Error',
                'Not Enough money in Wallet',
                'warning',
                'OK',
                true,
            );
        }
        return false;
    }
    if (
        state.billingDetails &&
        state.config &&
        Number(state.billingDetails.totalItemsPrice) >
            Number(state.config.minOrderValue)
    ) {
        return true;
    } else {
        if (showDialog) {
            showDialogBox(
                'Wallet Error',
                `Cannot apply wallet money for the item total less than ${state.config.minOrderValue}`,
                'warning',
                'OK',
                true,
            );
        }
        return false;
    }
    return false;
}

export function applyCoupon(state, coupon) {
    const restaurants = state.restaurants;
    const config = state.config;
    const isWalletMoneyUsed = state.isWalletMoneyUsed;

    const discountUpto = Number(coupon.commonConstraints.valueUpto);
    const typeOfDiscount = coupon.discount.type;
    const totalAmount = Number(state.billingDetails.totalAmount);
    const count = Number(state.foodItemsCount);
    let discountAmount = 0;
    if (typeOfDiscount == 'fixed') {
        discountAmount = Math.min(
            discountUpto,
            Number(Math.max(coupon.discount.value, 0)),
        );
    } else {
        discountAmount = Math.min(
            discountUpto,
            Number(
                Math.max(
                    Math.round((totalAmount * coupon.discount.value) / 100),
                    0,
                ),
            ),
        );
    }

    const billingData = {
        restaurants,
        config,
        isWalletMoneyUsed,
        discountAmount,
        coupon,
        count,
    };
    const billingDetails = calculateTotal(billingData);
    return { discountAmount: discountAmount, billingDetails: billingDetails };
}

export function calculateCouponDiscount(coupon_, totalAmount_) {
    const coupon = coupon_;
    const totalAmount = totalAmount_;

    const discountUpto = Number(coupon.commonConstraints.valueUpto);
    const typeOfDiscount = coupon.discount.type;

    let discountAmount = 0;
    if (typeOfDiscount == 'fixed') {
        discountAmount = Math.min(
            discountUpto,
            Number(Math.max(coupon.discount.value, 0)),
        );
    } else {
        discountAmount = Math.min(
            discountUpto,
            Number(
                Math.max(
                    Math.round((totalAmount * coupon.discount.value) / 100),
                    0,
                ),
            ),
        );
    }

    return discountAmount;
}

export function removeCoupon(state, coupon) {
    const restaurants = state.restaurants;
    const config = state.config;
    const isWalletMoneyUsed = state.isWalletMoneyUsed;
    const discountAmount = 0;
    const count = state.foodItemsCount;
    const billingData = {
        restaurants,
        config,
        isWalletMoneyUsed,
        discountAmount,
        coupon,
        count,
    };
    const billingDetails = calculateTotal(billingData);
    return { discountAmount: discountAmount, billingDetails: billingDetails };
}

export function isCouponValid(
    restaurants,
    count,
    config,
    totalPriceByRestaurant,
    coupon,
) {
    let bagConstraints = coupon ? coupon.bagConstraints : null;
    if (bagConstraints) {
        const applicableCategories = bagConstraints.applicableCategories;
        const applicableFoodItem = bagConstraints.applicableFoodItem;
        const applicableRestaurants = bagConstraints.applicableRestaurants;

        let restCount = 0;
        let foodItemCount = 0;
        let categoryCount = 0;

        if (restaurants) {
            for (const restaurantId in restaurants) {
                if (applicableRestaurants.includes(restaurantId)) {
                    restCount += 1;
                }

                for (const foodItemId in restaurants[restaurantId].foodItems) {
                    if (applicableFoodItem.includes(foodItemId)) {
                        foodItemCount += 1;
                    }
                    const foodItem =
                        restaurants[restaurantId].foodItems[foodItemId]
                            .foodItem;
                    const categoryId = foodItem.category._id
                        ? foodItem.category._id
                        : foodItem.category;

                    if (applicableCategories.includes(categoryId)) {
                        categoryCount += 1;
                    }
                }
            }
        }

        if (
            (restCount || applicableRestaurants.length == 0) &&
            (foodItemCount || applicableFoodItem.length == 0) &&
            (categoryCount || applicableCategories.length == 0) &&
            totalPriceByRestaurant >= bagConstraints.minOrderAmount &&
            count >= bagConstraints.quantity
        ) {
            return true;
        }

        return false;
    }

    return false;
}

export function isCouponValidForCart(
    restaurants,
    count,
    config,
    totalPriceByRestaurant,
    coupon,
) {
    let bagConstraints = coupon ? coupon.bagConstraints : null;
    if (bagConstraints) {
        const applicableCategories = bagConstraints.applicableCategories;
        const applicableFoodItem = bagConstraints.applicableFoodItem;
        const applicableRestaurants = bagConstraints.applicableRestaurants;

        let isRestApplicable = false || applicableRestaurants.length == 0;
        let isFoodItemApplicable = false || applicableFoodItem.length == 0;
        let isCategoryApplicable = false || applicableCategories.length == 0;

        if (restaurants) {
            let restaurantTotal = 0;
            let restaurantTotalCount = 0;
            let foodItemTotal = 0;
            let foodItemTotalCount = 0;
            let categoryTotal = 0;
            let categoryTotalCount = 0;

            for (const restaurantId in restaurants) {
                if (applicableRestaurants.includes(restaurantId)) {
                    restaurantTotal +=
                        restaurants[restaurantId].restaurantTotal;
                    restaurantTotalCount +=
                        restaurants[restaurantId].totalItemsOfRestaurant;
                }

                for (const foodItemId in restaurants[restaurantId].foodItems) {
                    const foodItem =
                        restaurants[restaurantId].foodItems[foodItemId];
                    const categoryId = foodItem.foodItem.category._id
                        ? foodItem.foodItem.category._id
                        : foodItem?.foodItem?.category;
                    if (applicableFoodItem.includes(foodItemId)) {
                        foodItemTotal +=
                            foodItem.foodItem.price * foodItem.count;
                        foodItemTotalCount += foodItem.count;
                    }
                    if (applicableCategories.includes(categoryId)) {
                        categoryTotal +=
                            foodItem.foodItem.price * foodItem.count;
                        categoryTotalCount += foodItem.count;
                    }
                }
            }

            if (
                applicableRestaurants.length > 0 &&
                restaurantTotal >= bagConstraints.minOrderAmount &&
                restaurantTotalCount >= bagConstraints.quantity
            ) {
                isRestApplicable = true;
            }

            if (
                applicableFoodItem.length > 0 &&
                foodItemTotal >= bagConstraints.minOrderAmount &&
                foodItemTotalCount >= bagConstraints.quantity
            ) {
                isFoodItemApplicable = true;
            }

            if (
                applicableCategories.length > 0 &&
                categoryTotal >= bagConstraints.minOrderAmount &&
                categoryTotalCount >= bagConstraints.quantity
            ) {
                isCategoryApplicable = true;
            }

            if (
                applicableRestaurants.length == 0 &&
                applicableFoodItem.length == 0 &&
                applicableCategories.length == 0
            ) {
                let totalAmount = 0;
                let totalCount = 0;
                for (const restaurantId in restaurants) {
                    for (const foodItemId in restaurants[restaurantId]
                        .foodItems) {
                        const foodItem =
                            restaurants[restaurantId].foodItems[foodItemId];
                        totalAmount += foodItem.foodItem.price * foodItem.count;
                        totalCount += foodItem.count;
                    }
                }

                if (
                    totalAmount >= bagConstraints.minOrderAmount &&
                    totalCount >= bagConstraints.quantity
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        if (isRestApplicable && isFoodItemApplicable && isCategoryApplicable) {
            return true;
        }
        return false;
    }
    return false;
}
