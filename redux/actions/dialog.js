import {
    HIDE_DIALOG,
    IS_DIALOG_DISMISSABLE,
    SHOW_DIALOG,
    VIBRATE_DIALOG,
} from '../constants';

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

export const isDialogDismissable = payload => {
    return dispatch => {
        dispatch({ type: IS_DIALOG_DISMISSABLE, payload: payload });
    };
};

export const vibrateDialog = payload => {
    return dispatch => {
        dispatch({ type: VIBRATE_DIALOG, payload: payload });
    };
};
