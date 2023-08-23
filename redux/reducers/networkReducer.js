import { SET_INTERNET_AVAILABILITY } from '../constants';

const initialState = {
    isInternetOn: false,
};

const networkReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INTERNET_AVAILABILITY:
            return {
                ...state,
                config: action.payload,
            };
        default:
            return state;
    }
};

export default networkReducer;
