import * as types from '../constants/index';

const initialState = {
    finalPrice: 0,
    planID:''
};

const finalSubscriptionPriceReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FINAL_SUBSCRIPTION_MODEL_PRICE:
            return {
                finalPrice: action.payload.finalPrice,
                planID:action.payload.planID
            }
        default:
            return state;
    }
};

export default finalSubscriptionPriceReducer;
