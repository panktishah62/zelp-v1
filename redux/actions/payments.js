import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    PAYMENT_INITIATED,
    PAYMENT_SUCCESS,
    PAYMENT_PENDING,
    PAYMENT_FAILURE,
    PAYMENT_ERROR,
    PAYMENT_CANCEL,
    BASE_URL,
    RESET_PAYMENTS,
    FETCH_DATA_FAILURE_PAYMENT,
} from '../constants';
import { placeOrder } from './currentOrder';

export const paymentInitiated = (cartId, defaultAddressId, navigation) => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/payments/initiatePayment`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        cartId: cartId,
                    }),
                });
            })
            .then(response => {
                if (!(response.status == '200')) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.payment && data.payment.mode === 'COD') {
                    dispatch(
                        paymentPending(data.payment._id, defaultAddressId),
                    );
                }
                dispatch({ type: PAYMENT_INITIATED, payload: data.payment });
                navigation.navigate('OrderPlaced');
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: FETCH_DATA_FAILURE_PAYMENT, payload: error });
            });
    };
};

export const paymentPending = (paymentId, defaultAddressId) => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/payments/paymentPending`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        paymentId: paymentId,
                    }),
                });
            })
            .then(response => {
                if (!(response.status == '200')) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.payment && data.payment.status === 'PENDING') {
                    dispatch(placeOrder(data.payment._id, defaultAddressId));
                }
                dispatch({ type: PAYMENT_PENDING, payload: data.payment });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: FETCH_DATA_FAILURE_PAYMENT, payload: error });
            });
    };
};

export const paymentSucceded = paymentId => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/payments/paymentSuccessfull`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        paymentId: paymentId,
                    }),
                });
            })
            .then(response => {
                if (!(response.status == '200')) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch({ type: PAYMENT_SUCCESS, payload: data.payment });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: FETCH_DATA_FAILURE_PAYMENT, payload: error });
            });
    };
};

export const paymentfailed = (paymentId, cartId) => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/payments/paymentFailed`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        paymentId: paymentId,
                        cartId: cartId,
                    }),
                });
            })
            .then(response => {
                if (!(response.status == '200')) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch({ type: PAYMENT_FAILURE, payload: data.payment });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: FETCH_DATA_FAILURE_PAYMENT, payload: error });
            });
    };
};

export const paymentError = (paymentId, cartId) => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/payments/paymentError`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        paymentId: paymentId,
                        cartId: cartId,
                    }),
                });
            })
            .then(response => {
                if (!(response.status == '200')) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch({ type: PAYMENT_ERROR, payload: data.payment });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: FETCH_DATA_FAILURE_PAYMENT, payload: error });
            });
    };
};

export const paymentCanceled = (paymentId, cartId) => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/payments/cancelPayment`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        paymentId: paymentId,
                        cartId: cartId,
                    }),
                });
            })
            .then(response => {
                if (!(response.status == '200')) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch({ type: PAYMENT_CANCEL, payload: data.payment });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: FETCH_DATA_FAILURE_PAYMENT, payload: error });
            });
    };
};

export const resetPayments = () => ({
    type: RESET_PAYMENTS,
});
