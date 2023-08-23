import { SET_INTERNET_AVAILABILITY } from '../constants';

export const isInternetAvailable = value => {
    return async dispatch => {
        dispatch({
            type: SET_INTERNET_AVAILABILITY,
            payload: value,
        });
    };
};
