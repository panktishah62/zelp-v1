import AsyncStorage from '@react-native-async-storage/async-storage';
import { DialogTypes } from '../../utils';
import * as types from '../constants/index';
import { persistor } from '../store/index';
import { getDefaultAddress, resetAddress } from './address';
import { resetCurrentOrder } from './currentOrder';
import { resetUser } from './user';
import {
    getUserWallet,
    resetCartActions,
    getUserReferralCoinMoney,
    updateReferraMaxMoney,
} from './cartActions';
import { resetFollowedFroker } from './froker';
import {
    generateNewToken,
    requestUserPermission,
} from '../../utils/pushnotification_helper';
import {
    deleteUserAccount,
    resendOTP,
    signInUser,
    signUpUser,
    verifyOtp,
} from '../services/authService';
import { hideDialog, showDialog } from './dialog';
import remoteConfig from '@react-native-firebase/remote-config';
import RemoteConfigService from '../services/remoteConfigService';

// Action creator to log out the user
export const logoutUser = () => {
    return dispatch => {
        // Clear the token from AsyncStorage
        AsyncStorage.setItem('token', '');
        AsyncStorage.setItem('fcmtoken', '');
        persistor.purge(['auth']);
        // Dispatch the logout action
        generateNewToken();
        dispatch(logout());
        dispatch(resetAddress());
        dispatch(resetCurrentOrder());
        dispatch(resetUser());
        dispatch(resetCartActions());
        dispatch(logout());
        dispatch(resetFollowedFroker());
    };
};

// Action creator to delete the account
export const deleteAccount = () => {
    return async dispatch => {
        try {
            await deleteUserAccount().then(response => {
                if (response.status == 200) {
                    // Clear the token from AsyncStorage
                    AsyncStorage.setItem('token', '');
                    AsyncStorage.setItem('fcmtoken', '');
                    persistor.purge(['auth']);
                    // Dispatch the logout action
                    generateNewToken();
                    dispatch(logout());
                    dispatch(resetAddress());
                    dispatch(resetCurrentOrder());
                    dispatch(resetUser());
                    dispatch(resetCartActions());
                    dispatch(logout());
                    dispatch(resetFollowedFroker());
                    dispatch(getDefaultAddress());
                } else {
                    throw Error();
                }
            });
        } catch (error) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Something Went Wrong!',
                    subTitleText:
                        'Your Account is not deleted, please login and try to delete the account again!',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.ERROR,
                }),
            );
        }
    };
};

// Action creator for login request
export const loginRequest = () => {
    return {
        type: types.LOGIN_REQUEST,
    };
};

// Action creator for successful login
export const loginSuccess = data => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data,
    };
};

// Action creator for login failure
export const loginFailure = error => {
    return {
        type: types.LOGIN_FAILURE,
        payload: error,
    };
};

// Action creator for logout
export const logout = () => {
    return {
        type: types.LOGOUT,
    };
};

export const verifyOTP = (
    mobNo,
    otp,
    navigation,
    setIsLoading,
    onPressShare,
) => {
    return async dispatch => {
        await verifyOtp({ mobNo, otp })
            .then(response => response?.data)
            .then(async data => {
                if (data?.status === 'success' && data?.token) {
                    await AsyncStorage.setItem('token', data.token);
                    dispatch(loginSuccess(data));
                    requestUserPermission();
                    dispatch(getDefaultAddress());
                    dispatch({
                        type: types.GET_USER_PROFILE,
                        payload: data.userProfile,
                    });
                    dispatch(getUserWallet(data?.userProfile?.wallet));

                    const canFullWalletBeUsed =
                        RemoteConfigService.getRemoteValue(
                            'canFullWalletBeUsed',
                        ).asBoolean();

                    const maxWalletMoneyToUse =
                        RemoteConfigService.getRemoteValue(
                            'maxWalletMoneyToUse',
                        ).asNumber();

                    if (canFullWalletBeUsed) {
                        dispatch({
                            type: types.UPDATE_MAX_WALLET_MONEY_TO_USE,
                            payload: data?.userProfile?.wallet,
                        });
                    } else {
                        dispatch({
                            type: types.UPDATE_MAX_WALLET_MONEY_TO_USE,
                            payload: maxWalletMoneyToUse,
                        });
                    }
                    dispatch({
                        type: types.WALLET_MULTIPLE,
                        payload: data?.userProfile?.walletMultiple,
                    });
                    dispatch({
                        type: types.REFERRAL_COIN_MULTIPLE,
                        payload: data?.userProfile?.referralCoinsMultiple,
                    });
                    dispatch(
                        getUserReferralCoinMoney(
                            data?.userProfile?.referralCoins,
                        ),
                    );

                    const maxReferralCoinMoneyToUse =
                        RemoteConfigService.getRemoteValue(
                            'maxReferralCoinMoneyToUse',
                        ).asNumber();

                    const canFullReferralCoinsBeUsed =
                        RemoteConfigService.getRemoteValue(
                            'canFullReferralCoinsBeUsed',
                        ).asBoolean();
                    if (canFullReferralCoinsBeUsed) {
                        dispatch(
                            updateReferraMaxMoney(
                                data?.userProfile?.referralCoins,
                            ),
                        );
                    } else {
                        dispatch(
                            updateReferraMaxMoney(maxReferralCoinMoneyToUse),
                        );
                    }

                    if (
                        data?.referralCode &&
                        data?.addToSenderWallet &&
                        data?.shareTemplate?.text
                    ) {
                        dispatch(
                            showDialog({
                                isVisible: true,
                                titleText: `Referral Code: ${data.referralCode}`,
                                subTitleText: `Earn ${data.addToSenderWallet} Referral Coins when anyone joins using your referral code. Share the above Referral Code with your friends and family to earn referral coins.`,
                                buttonText1: 'CLOSE',
                                buttonText2: 'SHARE',
                                buttonFunction2: () =>
                                    onPressShare(data?.shareTemplate?.text),
                                type: DialogTypes.DEFAULT,
                            }),
                        );
                    }
                    navigation.popToTop();
                    setIsLoading(false);
                    // navigation.navigate('BottomTabNavigation');
                } else {
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'OTP Error',
                            subTitleText: data?.message,
                            buttonText1: 'Resend OTP',
                            buttonFunction1: async () => {
                                await resendOTP({ mobNo });
                                dispatch(hideDialog());
                            },
                            type: DialogTypes.WARNING,
                        }),
                    );
                    // dispatch(loginFailure(data.message));
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setIsLoading(false);
                // If the request fails, dispatch loginFailure with the error message
                dispatch(loginFailure(error?.message));
            });
    };
};

// Action creator to log in the user
export const login = (
    number,
    countryCode,
    callingCode,
    setIsOTPSent,
    setIsLoading,
) => {
    return async dispatch => {
        await signInUser({
            mobNo: number,
            countryCode: countryCode,
            callingCode: callingCode,
        })
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    dispatch({ type: types.LOGIN_REQUEST });
                    if (setIsOTPSent) {
                        setIsOTPSent(true);
                    }
                }
                if (setIsLoading) {
                    setIsLoading(false);
                }
            });
    };
};

// Action creator to sign up the user
export const signup = (
    name,
    number,
    countryCode,
    callingCode,
    email,
    referralCode,
    setIsOTPSent,
    setIsLoading,
) => {
    return async dispatch => {
        await signUpUser({
            name: name,
            mobNo: number,
            email: email,
            referralCode: referralCode,
            countryCode,
            callingCode,
        })
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    dispatch({ type: types.LOGIN_REQUEST });
                    if (setIsOTPSent) {
                        setIsOTPSent(true);
                    }
                }
                if (setIsLoading) {
                    setIsLoading(false);
                }
            });
    };
};
