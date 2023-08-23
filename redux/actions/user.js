import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    BASE_URL,
    EDIT_USER_PROFILE,
    FETCH_DATA_FAILURE_USER,
    GET_USER_PROFILE,
    RESET_USER,
} from '../constants';
import { getUserWallet } from './cartActions';

export const editUserProfile = (userProfile, navigation) => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/users/updateProfile`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(userProfile),
                });
            })
            .then(response => {
                if (!response.status == '200') {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch({
                    type: EDIT_USER_PROFILE,
                    payload: data.updatedUser,
                });
                navigation.goBack();
            })
            .catch(error => {
                console.error(error);
                dispatch({ type: FETCH_DATA_FAILURE_USER, payload: error });
            });
    };
};

export const getUserProfile = setIsLoading => {
    return async dispatch => {
        const API_URL = `${BASE_URL}/users/userProfile`;

        AsyncStorage.getItem('token')
            .then(authToken => {
                return fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            })
            .then(response => {
                if (!response.status == '200') {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch({ type: GET_USER_PROFILE, payload: data.user });
                dispatch(getUserWallet(data.user.wallet));
                if (setIsLoading) {
                    setIsLoading(false);
                }
            })
            .catch(error => {
                if (setIsLoading) {
                    setIsLoading(false);
                }
                dispatch({ type: FETCH_DATA_FAILURE_USER, payload: error });
            });
    };
};

export const resetUser = () => ({
    type: RESET_USER,
});
