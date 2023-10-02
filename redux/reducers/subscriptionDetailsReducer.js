import { RESET_SUBSCRIPTION_DETAILS, SET_SUBSCRIPTION_DETAILS } from "../constants";

const initialState = {
id:''
};

const subscriptionDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIPTION_DETAILS:
            return {
                ...state,
             id:action.payload.id
            };
        case RESET_SUBSCRIPTION_DETAILS:
            return {
                ...initialState
            }
        default:
            return state;
    }
};

export default subscriptionDetailsReducer;
