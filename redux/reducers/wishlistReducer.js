import {
    ADD_ITEM_TO_CART,
    ADD_TO_CART_FOR_REORDER,
    APPLY_WALLET_MONEY,
    CALCULATE_TOTAL,
    CART_ACTIONS_ERROR,
    CART_ERROR,
    CHANGE_CART_ADDRESS,
    GET_CART_CONFIG,
    GET_USER_WALLET,
    REDEEM_COUPON,
    REMOVE_COUPON,
    REMOVE_ITEM_FROM_CART,
    REMOVE_WALLET_MONEY_FROM_CART,
    RESET_CART_ACTIONS,
    RESET_CART_ERROR,
    UPDATE_MAX_WALLET_MONEY_TO_USE,
    REMOVE_REFERRAL_CODE_MONEY,
    APPLY_REFERRAL_CODE_MONEY,
    GET_USER_REFERRAL_CODE_MONEY,
    GET_USER_REFERRAL_COIN_MONEY,
    UPDATE_MAX_REFERRAL_COIN_MONEY_TO_USE,
    WALLET_MULTIPLE,
    REFERRAL_COIN_MULTIPLE,
    REDEEM_WALLET,
    REMOVE_WALLET,
} from '../constants';
import {
    addItemToRestaurants,
    applyCoupon,
    calculateTotal,
    canApplyReferralCodeMoney,
    canApplyWallet,
    redeemWallet,
    removeCoupon,
    removeItemFromRestaurant,
    removeWallet,
    reorder,
} from '../services/cartService';

const initialState = {
    address: null,
    // walletMoney: null,
    // isWalletMoneyUsed: false,
    // restaurants: null,
    foodItemsCount: 0,
    // billingDetails: null,
    config: null,
    error: null,
    // coupon: null,
    // discountAmount: 0,
    // referralCoinsUsed: null,
    // isReferralCoinsUsed: false,
};

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_CONFIG:
            return {
                ...state,
                config: action.payload,
            };

        case WISHLIST_ERROR:
            return {
                ...initialState,
                walletMoney: state.walletMoney,
                config: state.config,
                error: action.payload,
            };
        case ADD_ITEM_TO_WISHLIST:
            const addToCartRestaurants = addItemToRestaurants(
                action.payload.foodItem,
                action.payload.restaurant,
                state,
            );
            return {
                ...state,
                restaurants: addToCartRestaurants.restaurants,
                foodItemsCount: addToCartRestaurants.count,
                billingDetails: addToCartRestaurants.billingDetails,
                discountAmount:
                    addToCartRestaurants.billingDetails.discountAmount,
                coupon:
                    addToCartRestaurants.billingDetails.discountAmount != 0 ||
                    addToCartRestaurants.billingDetails?.isApplicableOnWallet
                        ? state.coupon
                        : null,
            };
        case REMOVE_ITEM_FROM_WISHLIST:
            const removeFromCartRestaurants = removeItemFromRestaurant(
                action.payload.foodItem,
                action.payload.restaurant,
                state,
            );
            return {
                ...state,
                restaurants: removeFromCartRestaurants.restaurants,
                foodItemsCount: removeFromCartRestaurants.count,
                billingDetails: removeFromCartRestaurants.billingDetails,
                isWalletMoneyUsed: removeFromCartRestaurants.isWalletMoneyUsed,
                discountAmount: removeFromCartRestaurants?.billingDetails
                    ?.discountAmount
                    ? removeFromCartRestaurants?.billingDetails?.discountAmount
                    : 0,
                coupon:
                    removeFromCartRestaurants?.billingDetails?.discountAmount !=
                        0 ||
                    removeFromCartRestaurants?.billingDetails
                        ?.isApplicableOnWallet
                        ? state.coupon
                        : null,
                isReferralCoinsUsed:
                    removeFromCartRestaurants.isReferralCoinsUsed,
            };
        case RESET_WISHLIST_ACTIONS:
            return {
                ...initialState,
                config: state.config,
            };

        case WISHLIST_ACTIONS_ERROR:
            return {
                ...initialState,
                config: state.config,
                error: action.payload,
            };
        case RESET_WISHLIST_ERROR:
            return {
                ...state,
                coupon: null,
                error: null,
            };

        default:
            return state;
    }
};

export default wishlistReducer;
