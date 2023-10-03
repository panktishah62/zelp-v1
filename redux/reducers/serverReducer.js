import {
    GET_CONFIG,
    GET_CONFIG_ERROR,
    GET_SHOTS_CONFIG_ERROR,
    GET_SHOTS_VIEW_REST_SORTING_CONFIG,
    UPDATE_MAX_WALLET_MONEY_TO_USE,
} from '../constants';

const initialState = {
    config: null,
    shotsViewRestSortingConfig: null,
    error: null,
};

const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONFIG:
            return {
                ...state,
                config: action.payload,
            };
        case GET_SHOTS_VIEW_REST_SORTING_CONFIG:
            return {
                ...state,
                shotsViewRestSortingConfig: action.payload,
            };
        case GET_CONFIG_ERROR:
            return {
                ...state,
                config: null,
                error: action.payload,
            };
        case GET_SHOTS_CONFIG_ERROR:
            return {
                ...state,
                shotsViewRestSortingConfig: null,
                error: action.payload,
            };
        case UPDATE_MAX_WALLET_MONEY_TO_USE:
            return {
                ...state,
                maxWalletMoneyToUse: action.payload,
            };
        default:
            return state;
    }
};

export default serverReducer;
