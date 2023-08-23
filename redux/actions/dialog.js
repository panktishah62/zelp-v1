import { HIDE_DIALOG, SHOW_DIALOG } from '../constants';

export const showDialog = data => {
    return dispatch => {
        dispatch({ type: SHOW_DIALOG, payload: data });
    };
};
export const hideDialog = () => {
    return dispatch => {
        dispatch({ type: HIDE_DIALOG });
    };
};
