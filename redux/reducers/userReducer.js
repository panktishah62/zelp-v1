import {
    GET_USER_PROFILE,
    EDIT_USER_PROFILE,
    RESET_USER,
    FETCH_DATA_FAILURE_USER,
} from '../constants';

const initialState = {
    userProfile: null,
    error: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
                error: '',
            };
        case EDIT_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
                error: '',
            };
        case RESET_USER:
            return {
                ...initialState,
            };
        case FETCH_DATA_FAILURE_USER:
            return {
                ...initialState,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
