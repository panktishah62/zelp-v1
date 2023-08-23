import { GET_CONFIG, GET_CONFIG_ERROR } from '../constants';

const initialState = {
    config: null,
    error: null,
};

const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONFIG:
            return {
                ...state,
                config: action.payload,
            };
        case GET_CONFIG_ERROR:
            return {
                ...initialState,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default serverReducer;
