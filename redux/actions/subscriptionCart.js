import {
    ADD_ITEM_TO_SUBSCRIPTION_CART,
    REMOVE_ITEM_FROM_SUBSCRIPTION_CART,
    SELECT_ADDRESS_FOR_CART,
} from '../constants';

export const addItemToCart = item => {
    return async dispatch => {
        dispatch({
            type: ADD_ITEM_TO_SUBSCRIPTION_CART,
            payload: item,
        });
    };
};
export const removeItemFromCart = () => {
    return async dispatch => {
        dispatch({
            type: REMOVE_ITEM_FROM_SUBSCRIPTION_CART,
        });
    };
};

export const selectAddressForCart = address => {
    return async dispatch => {
        dispatch({
            type: SELECT_ADDRESS_FOR_CART,
            payload: address,
        });
    };
};
