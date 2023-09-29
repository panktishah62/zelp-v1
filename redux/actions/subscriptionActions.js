import {
    SUBSCRIPTION_SELECT_MENU_ITEM,
    SUBSCRIPTION_RESET_SELECT_MENU_ITEM,
    SUBSCRIPTION_VEG_MENU_ONLY_FALSE,
    SUBSCRIPTION_VEG_MENU_ONLY_TRUE,
    SUBSCRIPTION_ADD_TO_CART,
    SUBSCRIPTION_REMOVE_FROM_CART,
    SET_SUBSCRIPTION_MEAL_TYPE,
    RESET_SUBSCRIPTION_MEAL_TYPE,
} from '../constants';

export const selectMenu = (index, componentName) => {
    console.log({ index, componentName });
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_SELECT_MENU_ITEM,
            payload: {
                index: index,
                componentName: componentName,
            },
        });
    };
};

export const resetSelectionButton = () => {
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_RESET_SELECT_MENU_ITEM,
        });
    };
};

export const selectVegMenu = () => {
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_VEG_MENU_ONLY_TRUE,
        });
    };
};

export const selectAllMenu = () => {
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_VEG_MENU_ONLY_FALSE,
        });
    };
};

export const addSubscribedItemToCart = data => {
  
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_ADD_TO_CART,
            payload:data
        });
    }
}

export const removeSubscribedItemFromCart = () => {
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_REMOVE_FROM_CART,
        });
    }
}

export const setSubscriptionMealType=(mealType)=>{
    return async dispatch=>{
        dispatch({
            type:SET_SUBSCRIPTION_MEAL_TYPE,
            payload:{
                mealType:mealType
            }
        })
    }
}

export const resetSubscriptionMealType=()=>{
    return async dispatch=>{
        dispatch({
            type:RESET_SUBSCRIPTION_MEAL_TYPE,
            payload:{
                mealType:'Breakfast'
            }
        })
    }
}