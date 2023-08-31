import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ADD_ITEM_TO_CART,
    APPLY_WALLET_MONEY,
    CALCULATE_TOTAL,
    CART_ACTIONS_ERROR,
    CHANGE_CART_ADDRESS,
    GET_USER_WALLET,
    NETWORK_ERROR,
    REDEEM_COUPON,
    REMOVE_COUPON,
    REMOVE_ITEM_FROM_CART,
    REMOVE_WALLET_MONEY_FROM_CART,
    RESET_CART_ACTIONS,
    RESET_CART_ERROR,
} from '../constants';
import { ADD_TO_CART_FOR_REORDER } from '../constants';
import { DialogTypes } from '../../utils';
import { showDialog } from './dialog';
import { getOrderDetails } from '../services/orderService';

export const addItemToCart = (foodItem, restaurant) => {
    return dispatch => {
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: {
                foodItem,
                restaurant,
            },
        });
    };
};

export const removeItemFromCart = (foodItem, restaurant) => {
    return dispatch => {
        dispatch({
            type: REMOVE_ITEM_FROM_CART,
            payload: {
                foodItem,
                restaurant,
            },
        });
    };
};

export const getUserWallet = wallet => {
    return dispatch => {
        dispatch({
            type: GET_USER_WALLET,
            payload: wallet,
        });
    };
};

export const applyWalletMoney = setIsLoading => {
    return dispatch => {
        dispatch({
            type: APPLY_WALLET_MONEY,
            payload: true,
        });
        dispatch({
            type: CALCULATE_TOTAL,
        });
        setIsLoading(false);
    };
};

export const removeWalletMoney = setIsLoading => {
    return dispatch => {
        dispatch({
            type: REMOVE_WALLET_MONEY_FROM_CART,
            payload: false,
        });
        dispatch({
            type: CALCULATE_TOTAL,
        });
        setIsLoading(false);
    };
};

export const changeCartAddress = address => {
    return dispatch => {
        dispatch({
            type: CHANGE_CART_ADDRESS,
            payload: address,
        });
    };
};

export const addToCartForReorder = (orderId, fun) => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Not logged in',
                        subTitleText: 'You are not logged in, Please log in',
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
            } else {
                await getOrderDetails({ orderId })
                    .then(response => response?.data)
                    .then(data => {
                        if (data && data.order && data.order._id) {
                            dispatch({
                                type: ADD_TO_CART_FOR_REORDER,
                                payload: data.order,
                            });
                            if (fun) {
                                fun();
                            }
                        } else {
                            throw Error('Server Error!');
                        }
                    });
            }
        } catch (error) {
            dispatch({
                type: CART_ACTIONS_ERROR,
                payload: error,
            });
        }
    };
};

export const redeemCoupon = coupon => {
    return async dispatch => {
        dispatch({
            type: REDEEM_COUPON,
            payload: coupon,
        });
    };
};

export const removeCoupon = () => {
    return async dispatch => {
        dispatch({
            type: REMOVE_COUPON,
        });
    };
};

export const resetCartActions = () => ({
    type: RESET_CART_ACTIONS,
});

export const resetCartError = () => ({
    type: RESET_CART_ERROR,
});
