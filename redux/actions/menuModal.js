import { MENU_MODAL } from '../constants';

export const menuModal = data => {
    return dispatch => {
        dispatch({ type: MENU_MODAL, payload: data });
    };
};
