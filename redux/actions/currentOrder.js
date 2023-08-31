import AsyncStorage from '@react-native-async-storage/async-storage';
import { DialogTypes } from '../../utils';
import {
    GET_CURRENT_ORDER,
    PLACE_ORDER_BY_USER,
    PLACE_ORDER,
    CANCEL_ORDER,
    RESET_CURRENT_ORDER,
    FETCH_DATA_FAILURE_CURRENT_ORDER,
} from '../constants';
import { getConfig } from '../actions/server';
import { getUserProfile } from './user';
import { showDialog } from './dialog';
import {
    cancelOrderByUser,
    getCurrentUserOrder,
} from '../services/orderService';

export const getCurrentOrder = () => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Not logged in',
                        subTitleText: 'You are not logged in, please log in',
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
                return dispatch({
                    type: GET_CURRENT_ORDER,
                    payload: { order: {} },
                });
            } else {
                await getCurrentUserOrder()
                    .then(response => response?.data)
                    .then(data => {
                        if (data && data.order) {
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
                    });
            }
        } catch (error) {
            dispatch({
                type: FETCH_DATA_FAILURE_CURRENT_ORDER,
                payload: error,
            });
        }
    };
};

export const cancelOrder = orderId => {
    return async dispatch => {
        await cancelOrderByUser({ orderId: orderId })
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Order Canceled',
                            subTitleText: 'Your Order has been canceled',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.SUCCESS,
                        }),
                    );
                    dispatch(getUserProfile());
                    dispatch(getCurrentOrder());
                    dispatch({ type: CANCEL_ORDER, payload: data.order });
                }
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
