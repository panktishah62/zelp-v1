import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    CALCULATE_TOTAL,
    EDIT_USER_PROFILE,
    FETCH_DATA_FAILURE_USER,
    GET_USER_PROFILE,
    REFERRAL_COIN_MULTIPLE,
    RESET_USER,
    UPDATE_MAX_REFERRAL_COIN_MONEY_TO_USE,
    UPDATE_MAX_WALLET_MONEY_TO_USE,
    WALLET_MULTIPLE,
} from '../constants';
import {
    getUserReferralCoinMoney,
    getUserWallet,
    updateReferraMaxMoney,
} from './cartActions';
import { editUserProfile_, getUserProfile_ } from '../services/userService';
import remoteConfig from '@react-native-firebase/remote-config';

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

                        const maxReferralCoinMoneyToUse = remoteConfig()
                            .getValue('maxReferralCoinMoneyToUse')
                            .asNumber();

                        dispatch(
                            getUserReferralCoinMoney(data.user.referralCoins),
                        );
                        const canFullReferralCoinsBeUsed = remoteConfig()
                            .getValue('canFullReferralCoinsBeUsed')
                            .asBoolean();

                        if (canFullReferralCoinsBeUsed) {
                            dispatch(
                                updateReferraMaxMoney(data.user.referralCoins),
                            );
                        } else {
                            dispatch(
                                updateReferraMaxMoney(
                                    maxReferralCoinMoneyToUse,
                                ),
                            );
                        }

                        const canFullWalletBeUsed = remoteConfig()
                            .getValue('canFullWalletBeUsed')
                            .asBoolean();

                        const maxWalletMoneyToUse = remoteConfig()
                            .getValue('maxWalletMoneyToUse')
                            .asNumber();
                        if (canFullWalletBeUsed) {
                            dispatch({
                                type: UPDATE_MAX_WALLET_MONEY_TO_USE,
                                payload: data.user.wallet,
                            });
                        } else {
                            dispatch({
                                type: UPDATE_MAX_WALLET_MONEY_TO_USE,
                                payload: maxWalletMoneyToUse,
                            });
                        }
                        dispatch({
                            type: WALLET_MULTIPLE,
                            payload: data?.user?.walletMultiple,
                        });
                        dispatch({
                            type: REFERRAL_COIN_MULTIPLE,
                            payload: data?.user?.referralCoinsMultiple,
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
