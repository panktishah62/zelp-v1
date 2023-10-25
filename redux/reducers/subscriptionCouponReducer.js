import {
    APPLY_SUBSCRIPTION_COUPON,
    REMOVE_SUBSCRIPTION_COUPON,
} from '../constants';

const initialState = {
    coupon: {},
};

const subscriptionCouponReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLY_SUBSCRIPTION_COUPON:
            return {
                ...state,
                coupon: action.payload,
            };
        case REMOVE_SUBSCRIPTION_COUPON:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default subscriptionCouponReducer;
