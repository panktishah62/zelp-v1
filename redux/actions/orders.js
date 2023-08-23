import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    BASE_URL,
    FETCH_DATA_FAILURE_ORDERS,
    GET_ALL_ORDERS,
    RESET_ORDERS,
} from '../constants';

export const getAllOrders = () => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/orders/getUserOrders`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'GET',
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
                        'Network response was not ok in getAllOrders',
                    );
                }
                return response.json();
            })
            .then(data => {
                dispatch({ type: GET_ALL_ORDERS, payload: data });
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: FETCH_DATA_FAILURE_ORDERS, payload: error });
            });
    };
};

export const resetOrders = () => ({
    type: RESET_ORDERS,
});
