import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    CALCULATE_TOTAL,
    EDIT_USER_PROFILE,
    FETCH_DATA_FAILURE_USER,
    GET_USER_PROFILE,
    RESET_USER,
    UPDATE_MAX_REFERRAL_COIN_MONEY_TO_USE,
    UPDATE_MAX_WALLET_MONEY_TO_USE,
} from '../constants';
import {
    getUserReferralCoinMoney,
    getUserWallet,
    updateReferraMaxMoney,
} from './cartActions';
import { editUserProfile_, getUserProfile_ } from '../services/userService';

export const editUserProfile = (userProfile, navigation) => {
    return async dispatch => {
        await editUserProfile_(userProfile)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    dispatch({
                        type: EDIT_USER_PROFILE,
                        payload: data.updatedUser,
                    });
                    navigation.goBack();
                }
            })
            .catch(error => {
                dispatch({ type: FETCH_DATA_FAILURE_USER, payload: error });
            });
    };
};

export const getUserProfile = setIsLoading => {
    return async dispatch => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            await getUserProfile_()
                .then(response => response?.data)
                .then(data => {
                    if (data) {
                        dispatch({
                            type: GET_USER_PROFILE,
                            payload: data.user,
                        });
                        dispatch(getUserWallet(data.user.wallet));

                        dispatch(
                            getUserReferralCoinMoney(data.user.referralCoins),
                        );
                        dispatch(
                            updateReferraMaxMoney(data.user.referralCoins),
                        );
                        dispatch({
                            type: UPDATE_MAX_WALLET_MONEY_TO_USE,
                            payload: data.user.wallet,
                        });

                        dispatch({
                            type: CALCULATE_TOTAL,
                        });
                        if (setIsLoading) {
                            setIsLoading(false);
                        }
                    }
                })
                .catch(error => {
                    if (setIsLoading) {
                        setIsLoading(false);
                    }
                    dispatch({ type: FETCH_DATA_FAILURE_USER, payload: error });
                });
        } else {
            if (setIsLoading) {
                setIsLoading(false);
            }
        }
    };
};

export const resetUser = () => ({
    type: RESET_USER,
});
