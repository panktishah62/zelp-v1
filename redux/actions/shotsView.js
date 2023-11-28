import { IS_SWIPED } from '../constants';

export const isSwiped = swiped => {
    return dispatch => {
        dispatch({
            type: IS_SWIPED,
            payload: {
                swiped,
            },
        });
    };
};
