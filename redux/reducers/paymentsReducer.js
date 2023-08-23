import {
    PAYMENT_INITIATED,
    PAYMENT_SUCCESS,
    PAYMENT_FAILURE,
    PAYMENT_ERROR,
    PAYMENT_CANCEL,
    PAYMENT_PENDING,
    RESET_PAYMENTS,
    FETCH_DATA_FAILURE_PAYMENT,
} from '../constants';

const initialState = {
    currentPayment: {},
    error: '',
};

const paymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_INITIATED:
            return {
                currentPayment: action.payload,
                error: '',
            };
        case PAYMENT_PENDING:
            return {
                currentPayment: action.payload,
                error: '',
            };
        case PAYMENT_SUCCESS:
            return {
                currentPayment: action.payload,
                error: '',
            };
        case PAYMENT_FAILURE:
            return {
                currentPayment: action.payload,
                error: '',
            };
        case PAYMENT_ERROR:
            return {
                currentPayment: action.payload,
                error: '',
            };
        case PAYMENT_CANCEL:
            return {
                currentPayment: action.payload,
                error: '',
            };
        case RESET_PAYMENTS:
            return {
                ...initialState,
            };
        case FETCH_DATA_FAILURE_PAYMENT:
            return {
                ...initialState,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default paymentsReducer;
