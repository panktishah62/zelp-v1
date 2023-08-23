import { SET_HEADER_WITH_LOCATION_HEIGHT } from '../constants';

export const setHeaderWithLocationHeight = height => {
    return async dispatch => {
        dispatch({
            type: SET_HEADER_WITH_LOCATION_HEIGHT,
            payload: height,
        });
    };
};
