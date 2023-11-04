import {
    APPLY_SUBSCRIPTION_COUPON,
    REMOVE_SUBSCRIPTION_COUPON,
} from '../constants';

export const applySubscriptionCoupon = coupon => {
    return async dispatch => {
        dispatch({
            type: APPLY_SUBSCRIPTION_COUPON,
            payload: coupon,
        });
    };
};
export const removeSubscriptionCoupon = () => {
    return async dispatch => {
        dispatch({
            type: REMOVE_SUBSCRIPTION_COUPON,
        });
    };
};
