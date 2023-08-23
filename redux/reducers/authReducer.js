import * as types from '../constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    userId: null,
    error: null,
    loading: false,
    isAuthenticated: AsyncStorage.getItem('token') ? true : false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                isAuthenticated: false,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                userId: action.payload._id,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,
                error: action.payload,
                isAuthenticated: false,
                loading: false,
            };
        case types.LOGOUT:
            return {
                ...initialState,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
