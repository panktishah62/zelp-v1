import {
    SUBSCRIPTION_SELECT_MENU_ITEM,
    SUBSCRIPTION_RESET_SELECT_MENU_ITEM,
    SUBSCRIPTION_VEG_MENU_ONLY_FALSE,
    SUBSCRIPTION_VEG_MENU_ONLY_TRUE,
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
