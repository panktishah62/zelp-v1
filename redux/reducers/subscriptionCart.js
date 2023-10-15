import {
    ADD_ITEM_TO_SUBSCRIPTION_CART,
    REMOVE_ITEM_FROM_SUBSCRIPTION_CART,
    SELECT_ADDRESS_FOR_CART,
} from '../constants';

const initialState = {
    selectedItem: null,
    address: null,
};

const subscriptionCart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_SUBSCRIPTION_CART:
            return {
                ...state,
                selectedItem: action.payload,
            };
        case SELECT_ADDRESS_FOR_CART:
            return {
                ...state,
                address: action.payload,
            };
        case REMOVE_ITEM_FROM_SUBSCRIPTION_CART:
            return {
                ...state,
                selectedItem: null,
            };
        default:
            return state;
    }
};

export default subscriptionCart;
