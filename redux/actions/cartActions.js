import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ADD_ITEM_TO_CART,
    APPLY_WALLET_MONEY,
    BASE_URL,
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
import { paymentInitiated } from './payments';
import { ADD_TO_CART_FOR_REORDER } from '../constants';

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

export const createCart = (cart, navigation) => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/orders/placeOrderByCart`;

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
                        cart,
                    }),
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.error);
                }
                return response.json();
            })
            .then(data => {
                if (data.cart) {
                    dispatch(
                        paymentInitiated(
                            data.cart._id,
                            cart.address._id,
                            navigation,
                        ),
                    );
                    dispatch(resetCartActions());
                }
            })
            .catch(error => {
                dispatch({
                    type: CART_ACTIONS_ERROR,
                    payload: error,
                });
            });
    };
};

export const addToCartForReorder = orderId => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/orders/getOrderDetails/${orderId}`;

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                showDialogBox(
                    'Not logged in',
                    'You are not logged in, Please log in',
                    'danger',
                    'OK',
                    true,
                );
            } else {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw Error(NETWORK_ERROR);
                }
                const data = await response.json();
                if (data.order && data.order._id) {
                    dispatch({
                        type: ADD_TO_CART_FOR_REORDER,
                        payload: data.order,
                    });
                } else {
                    throw Error('Server Error!');
                }
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
