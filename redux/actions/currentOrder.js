import AsyncStorage from '@react-native-async-storage/async-storage';
import { showDialogBox } from '../../utils';
import {
    GET_CURRENT_ORDER,
    PLACE_ORDER_BY_USER,
    PLACE_ORDER,
    CANCEL_ORDER,
    BASE_URL,
    RESET_CURRENT_ORDER,
    FETCH_DATA_FAILURE_CURRENT_ORDER,
} from '../constants';
import { getConfig } from '../actions/server';
import { getUserProfile } from './user';

export const getCurrentOrder = () => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/orders/currentOrder`;

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                showDialogBox(
                    'Not logged in',
                    'You are not logged in, please log in',
                    'danger',
                    'OK',
                    true,
                );
                return dispatch({
                    type: GET_CURRENT_ORDER,
                    payload: { order: {} },
                });
            } else {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.status == '200') {
                    throw new Error(
                        'Network response was not ok in getCurrentOrder',
                    );
                }
                const data = await response.json();
                if (data.order) {
                    dispatch({
                        type: GET_CURRENT_ORDER,
                        payload: {
                            currentOrder: data.order,
                            isOrderPaid: data?.isOrderPaid
                                ? data?.isOrderPaid
                                : false,
                        },
                    });
                } else {
                    dispatch({ type: GET_CURRENT_ORDER, payload: {} });
                }
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: FETCH_DATA_FAILURE_CURRENT_ORDER,
                payload: error,
            });
        }
    };
};

export const placeOrderByUser = () => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/orders/placeOrderByUser`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            })
            .then(response => {
                if (!response.status == '200') {
                    throw new Error(
                        'Network response was not ok in placeOrderByUser',
                    );
                }
                return response.json();
            })
            .then(data => {
                dispatch(getCurrentOrder());
                dispatch({ type: PLACE_ORDER_BY_USER, payload: data.order });
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: FETCH_DATA_FAILURE_CURRENT_ORDER,
                    payload: error,
                });
            });
    };
};

export const placeOrder = (currentPaymentId, addressId) => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/orders/placeOrderWithRestaurantCount`;

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
                        paymentId: currentPaymentId,
                        addressId: addressId,
                    }),
                });
            })
            .then(response => {
                if (!response.status == '200') {
                    throw new Error(
                        'Network response was not ok in placeOrder',
                    );
                }
                return response.json();
            })
            .then(data => {
                dispatch({ type: PLACE_ORDER, payload: data.order });
                dispatch(getUserProfile());
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: FETCH_DATA_FAILURE_CURRENT_ORDER,
                    payload: error,
                });
            });
    };
};

export const cancelOrder = orderId => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/orders/cancelOrderByUser`;

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
                        orderId: orderId,
                    }),
                });
            })
            .then(response => {
                if (!response.status == '200') {
                    throw new Error(
                        'Network response was not ok in cancelOrder',
                    );
                }
                return response.json();
            })
            .then(data => {
                showDialogBox(
                    'Order Canceled',
                    'Your Order has been canceled',
                    'success',
                    'OK',
                    true,
                );
                dispatch(getUserProfile());
                dispatch(getCurrentOrder());
                dispatch({ type: CANCEL_ORDER, payload: data.order });
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: FETCH_DATA_FAILURE_CURRENT_ORDER,
                    payload: error,
                });
            });
    };
};

export const resetCurrentOrder = () => ({
    type: RESET_CURRENT_ORDER,
});
