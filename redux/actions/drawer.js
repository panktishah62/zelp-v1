import { SHOW_DRAWER, HIDE_DRAWER } from '../constants';

export const showDrawer = data => {
    return dispatch => {
        dispatch({ type: SHOW_DRAWER, payload: data });
    };
};
export const hideDrawer = () => {
    return dispatch => {
        dispatch({ type: HIDE_DRAWER });
    };
};
