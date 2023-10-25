import {
    GET_SUBSCRIPTION_CONFIG,
    RESET_SUBSCRIPTION_DETAILS,
    RESET_SUBSCRIPTION_PLAN,
    SELECT_SUBSCRIPTION_PLAN,
    SET_SUBSCRIPTION_DETAILS,
} from '../constants';

const initialState = {
    id: '',
    selectedSubscription: {},
    config: {},
};

const subscriptionDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIPTION_DETAILS:
            return {
                ...state,
                id: action.payload.id,
            };
        case RESET_SUBSCRIPTION_DETAILS:
            return {
                ...initialState,
            };
        case GET_SUBSCRIPTION_CONFIG:
            return {
                ...state,
                config: action.payload.config,
            };
        case SELECT_SUBSCRIPTION_PLAN:
            return {
                ...state,
                selectedSubscription: action.payload,
            };
        case RESET_SUBSCRIPTION_PLAN:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default subscriptionDetailsReducer;
