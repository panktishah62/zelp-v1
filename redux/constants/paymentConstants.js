export const PAYMENT_INITIALIZATION_CODES = {
    PAYMENT_INITIATED: 'PAYMENT_INITIATED',
    PAYMENT_ERROR: 'PAYMENT_ERROR',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    BAD_REQUEST: 'BAD_REQUEST',
    AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED',
};

export const PAYMENT_CODES = {
    BAD_REQUEST: 'BAD_REQUEST',
    AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    PAYMENT_ERROR: 'PAYMENT_ERROR',
    TRANSACTION_NOT_FOUND: 'TRANSACTION_NOT_FOUND',
    PAYMENT_PENDING: 'PAYMENT_PENDING',
    PAYMENT_DECLINED: 'PAYMENT_DECLINED',
    TIMED_OUT: 'TIMED_OUT',
};

export const STATUS_TO_TEXT = {
    PAYMENT_INITIATED: {
        text: 'Your payment hase been initialized. Please do not go back or close the app until the transaction is completed.',
        type: 'success',
    },
    PAYMENT_ERROR: {
        text: 'Some error occured. Please try again after sometime',
        type: 'error',
    },
    INTERNAL_SERVER_ERROR: {
        text: 'Some error occured. Please try again after sometime',
        type: 'error',
    },
    BAD_REQUEST: {
        text: 'Bad payment request. Please try again',
        type: 'error',
    },
    AUTHORIZATION_FAILED: {
        text: 'Authorization error. Please try again.',
        type: 'error',
    },
    PAYMENT_SUCCESS: {
        text: 'Your payment is successfully Completed. Thanks for ordering on Froker',
        type: 'success',
    },
    TRANSACTION_NOT_FOUND: {
        text: 'Your transaction is not found. Please try again',
        type: 'error',
    },
    PAYMENT_PENDING: {
        text: 'Your payment is pending. Complete the payment to place the order. Please do not go back or close the app until the transaction is completed.',
        type: 'pending',
    },
    PAYMENT_DECLINED: {
        text: 'Your payment is declined. Please try again with different method',
        type: 'error',
    },
    TIMED_OUT: {
        text: 'Your payment timed out. Please try again.',
        type: 'error',
    },
};

export const paymentMethods = {
    COD: 'COD',
    OTHERS: 'OTHERS',
};
