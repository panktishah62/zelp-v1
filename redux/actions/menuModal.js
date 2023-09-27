import { MENU_MODAL } from '../constants';

export const menuModal = data => {
    console.log(data);
    return dispatch => {
        dispatch({ type: MENU_MODAL, payload: data });
    };
};
