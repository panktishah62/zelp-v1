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
} from '../constants';
import {
    addItemToRestaurants,
    applyCoupon,
    calculateTotal,
    canApplyReferralCodeMoney,
    canApplyWallet,
    removeCoupon,
    removeItemFromRestaurant,
    reorder,
} from '../services/cartService';

const initialState = {
    address: null,
    walletMoney: null,
    isWalletMoneyUsed: false,
    restaurants: null,
    foodItemsCount: 0,
    billingDetails: null,
    config: null,
    error: null,
    coupon: null,
    discountAmount: 0,
    referralCoinsUsed: null,
    isReferralCoinsUsed: false,
};

const cartActionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_CONFIG:
            return {
                ...state,
                config: action.payload,
            };
        case UPDATE_MAX_WALLET_MONEY_TO_USE:
            return {
                ...state,
                config: {
                    ...state?.config,
                    maxWalletMoneyToUse: action?.payload,
                },
                isWalletMoneyUsed: false,
            };
        case UPDATE_MAX_REFERRAL_COIN_MONEY_TO_USE:
            return {
                ...state,
                config: {
                    ...state?.config,
                    maxReferralCoinMoneyToUse: action?.payload,
                },
                isReferralCoinsUsed: false,
            };

        case CART_ERROR:
            return {
                ...initialState,
                walletMoney: state.walletMoney,
                config: state.config,
                error: action.payload,
            };
        case ADD_ITEM_TO_CART:
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
                    addToCartRestaurants.billingDetails.discountAmount != 0
                        ? state.coupon
                        : null,
            };
        case REMOVE_ITEM_FROM_CART:
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
                    0
                        ? state.coupon
                        : null,
                isReferralCoinsUsed:
                    removeFromCartRestaurants.isReferralCoinsUsed,
            };
        case GET_USER_WALLET:
            return {
                ...state,
                walletMoney: action.payload,
            };
        case GET_USER_REFERRAL_CODE_MONEY:
            return {
                ...state,
                referralCoinsUsed: action.payload,
            };
        case APPLY_WALLET_MONEY:
            const canApply = canApplyWallet(state);

            return {
                ...state,
                isWalletMoneyUsed: canApply,
            };
        case REMOVE_WALLET_MONEY_FROM_CART:
            return {
                ...state,
                isWalletMoneyUsed: action.payload,
            };
        case CHANGE_CART_ADDRESS:
            return {
                ...state,
                address: action.payload,
            };
        case CALCULATE_TOTAL:
            const billingData = {
                restaurants: state?.restaurants,
                config: state?.config,
                isWalletMoneyUsed: state?.isWalletMoneyUsed,
                discountAmount: state?.discountAmount,
                coupon: state?.coupon,
                count: state?.foodItemsCount,
                walletMoney: state?.walletMoney,
                isReferralCoinsUsed: state?.isReferralCoinsUsed,
                referralCoinsUsed: state?.referralCoinsUsed,
            };
            const billingDetails = calculateTotal(billingData);
            return {
                ...state,
                billingDetails: billingDetails,
                discountAmount: billingDetails?.discountAmount,
                coupon:
                    billingDetails?.discountAmount != 0 ? state?.coupon : null,
            };
        case RESET_CART_ACTIONS:
            return {
                ...initialState,
                config: state.config,
            };
        case ADD_TO_CART_FOR_REORDER:
            const reorderedData = reorder(action.payload, state);
            return {
                ...state,
                restaurants: reorderedData.restaurants,
                foodItemsCount: reorderedData.count,
                billingDetails: reorderedData.billingDetails,
                discountAmount: reorderedData.billingDetails.discountAmount,
                coupon:
                    reorderedData.billingDetails.discountAmount != 0
                        ? state.coupon
                        : null,
            };
        case REDEEM_COUPON:
            const redemmedData = applyCoupon(state, action.payload);
            return {
                ...state,
                discountAmount: redemmedData.discountAmount,
                billingDetails: redemmedData.billingDetails,
                coupon: action.payload,
            };
        case REMOVE_COUPON:
            const removeCouponData = removeCoupon(state, action.payload);
            return {
                ...state,
                discountAmount: removeCouponData.discountAmount,
                billingDetails: removeCouponData.billingDetails,
                coupon: null,
            };
        case CART_ACTIONS_ERROR:
            return {
                ...initialState,
                config: state.config,
                error: action.payload,
            };
        case RESET_CART_ERROR:
            return {
                ...state,
                error: null,
            };
        case GET_USER_REFERRAL_COIN_MONEY:
            return {
                ...state,
                referralCoinsUsed: action.payload,
            };
        //change the code here
        case APPLY_REFERRAL_CODE_MONEY:
            const canApplyReferral = canApplyReferralCodeMoney(state);
            return {
                ...state,
                isReferralCoinsUsed: canApplyReferral,
            };
        case REMOVE_REFERRAL_CODE_MONEY:
            return {
                ...state,
                isReferralCoinsUsed: false,
            };
        default:
            return state;
    }
};

export default cartActionsReducer;
