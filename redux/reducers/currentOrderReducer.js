import { getRandomInt } from '../../utils';
import {
    FETCH_DATA_FAILURE_CURRENT_ORDER,
    GET_CURRENT_ORDER,
    PLACE_ORDER,
    PLACE_ORDER_BY_USER,
    RESET_CURRENT_ORDER,
} from '../constants';

const initialState = {
    currentOrder: {},
    error: '',
    timeToDeliver: '',
    isOrderPaid: false,
};

const currentOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.payload.currentOrder,
                error: '',
                isOrderPaid: action.payload.isOrderPaid,
                tracking_url: action.payload.tracking_url,
            };
        case PLACE_ORDER_BY_USER:
            return {
                currentOrder: action.payload,
                error: '',
                timeToDeliver: getRandomInt(30, 60),
            };
        case PLACE_ORDER:
            return {
                currentOrder: action.payload,
                error: '',
                timeToDeliver: getRandomInt(30, 60),
            };
        case RESET_CURRENT_ORDER:
            return {
                ...initialState,
            };
        case FETCH_DATA_FAILURE_CURRENT_ORDER:
            return {
                ...initialState,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default currentOrderReducer;
