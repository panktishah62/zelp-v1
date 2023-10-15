import {
    SUBSCRIPTION_SELECT_MENU_ITEM,
    SUBSCRIPTION_RESET_SELECT_MENU_ITEM,
    SUBSCRIPTION_VEG_MENU_ONLY_FALSE,
    FINAL_SUBSCRIPTION_MODEL_PRICE,
    SUBSCRIPTION_VEG_MENU_ONLY_TRUE,
    SUBSCRIPTION_ADD_TO_CART,
    SUBSCRIPTION_REMOVE_FROM_CART,
    SUBSCRIPTION_MEAL_NUMBER,
    SUBSCRIPTION_MEAL_NUMBER_INCREASED,
    SUBSCRIPTION_MEAL_NUMBER_DECREASED,
    SET_SUBSCRIPTION_MEAL_TYPE,
    RESET_SUBSCRIPTION_MEAL_TYPE,
    SET_SUBSCRIPTION_DETAILS,
    GET_SUBSCRIPTION_CONFIG,
    SELECT_SUBSCRIPTION_PLAN,
    RESET_SUBSCRIPTION_PLAN,
} from '../constants';
import { getConfigForSubscription } from '../services/subscriptionService';

export const selectMenu = (index, componentName) => {
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
            payload: data,
        });
    };
};

export const removeSubscribedItemFromCart = () => {
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_REMOVE_FROM_CART,
        });
    };
};

export const mealDetailsIncreased = data => {
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_MEAL_NUMBER_INCREASED,
            payload: data,
        });
    };
};

export const mealDetailsDecreased = data => {
    return async dispatch => {
        dispatch({
            type: SUBSCRIPTION_MEAL_NUMBER_DECREASED,
            payload: data,
        });
    };
};

export const finalPlanDetails = data => {
    return async dispatch => {
        dispatch({
            type: FINAL_SUBSCRIPTION_MODEL_PRICE,
            payload: data,
        });
    };
};
export const setSubscriptionMealType = (mealType, mealPlanId, mealPlanTime) => {
    return async dispatch => {
        dispatch({
            type: SET_SUBSCRIPTION_MEAL_TYPE,
            payload: {
                mealType: mealType,
                mealPlanId: mealPlanId,
                mealPlanTime: mealPlanTime,
            },
        });
    };
};

export const resetSubscriptionMealType = () => {
    return async dispatch => {
        dispatch({
            type: RESET_SUBSCRIPTION_MEAL_TYPE,
            payload: {
                mealType: 'Breakfast',
            },
        });
    };
};

export const setSubscriptionDetails = id => {
    return async dispatch => {
        dispatch({
            type: SET_SUBSCRIPTION_DETAILS,
            payload: {
                id,
            },
        });
    };
};

export const getSubscriptionConfig = config => {
    return async dispatch => {
        await getConfigForSubscription()
            .then(response => response?.data)
            .then(data => {
                dispatch({
                    type: GET_SUBSCRIPTION_CONFIG,
                    payload: {
                        config: data.config,
                    },
                });
            });
    };
};

export const selectSubscriptionPlan = data => {
    return dispatch => {
        dispatch({
            type: SELECT_SUBSCRIPTION_PLAN,
            payload: data,
        });
    };
};

export const resetSubscriptionPlan = () => {
    return dispatch => {
        dispatch({
            type: RESET_SUBSCRIPTION_PLAN,
        });
    };
};
