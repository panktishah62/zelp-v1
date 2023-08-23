import {
    FETCH_DATA_FAILURE_ORDERS,
    GET_ALL_ORDERS,
    RESET_ORDERS,
} from '../constants';

const initialState = {
    orders: [],
    error: '',
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS:
            return {
                orders: action.payload.orders,
                error: '',
            };
        case RESET_ORDERS:
            return {
                ...initialState,
            };
        case FETCH_DATA_FAILURE_ORDERS:
            return {
                ...initialState,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ordersReducer;
