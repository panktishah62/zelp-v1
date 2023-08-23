import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideDialogBox, showDialogBox } from '../../utils';
import * as types from '../constants/index';
import { persistor } from '../store/index';
import { getDefaultAddress, resetAddress } from './address';
import { resetCurrentOrder } from './currentOrder';
import { resetOrders } from './orders';
import { resetPayments } from './payments';
import { resetSearch } from './search';
import { resetUser } from './user';
import { getUserWallet, resetCartActions } from './cartActions';
import { resetFollowedFroker } from './froker';
import {
    generateNewToken,
    requestUserPermission,
} from '../../utils/pushnotification_helper';
import { deleteUserAccount, signUpUser } from '../services/authService';
import { showDialog } from './dialog';

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
        dispatch(resetOrders());
        dispatch(resetPayments());
        dispatch(resetSearch());
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
                    dispatch(resetOrders());
                    dispatch(resetPayments());
                    dispatch(resetSearch());
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
            showDialogBox(
                'Something Went Wrong!',
                'Your Account is not deleted, please login and try to delete the account again!',
                'warning',
                'OK',
                true,
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
    return dispatch => {
        fetch(`${types.BASE_URL}/users/verify/${mobNo}/${otp}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status == '401') {
                    showDialogBox(
                        'Phone Number Error',
                        'Server Error, please try again',
                        'warning',
                        'OK',
                        true,
                    );
                    dispatch(loginFailure('Server Error, please try again'));
                }
                return response.json();
            })
            .then(async data => {
                if (data.status === 'success' && data.token) {
                    await AsyncStorage.setItem('token', data.token);
                    dispatch(loginSuccess(data));
                    requestUserPermission();
                    dispatch(getDefaultAddress());
                    dispatch({
                        type: types.GET_USER_PROFILE,
                        payload: data.userProfile,
                    });
                    dispatch(getUserWallet(data?.userProfile?.wallet));
                    if (
                        data?.referralCode &&
                        data?.addToSenderWallet &&
                        data?.shareTemplate?.text
                    ) {
                        dispatch(
                            showDialog({
                                isVisible: true,
                                titleText: `Referral Code: ${data.referralCode}`,
                                subTitleText: `Earn ${data.addToSenderWallet}Rs in your wallet on every use. Share the above Referral Code with your friends and family to earn money in your wallet.`,
                                buttonText1: 'CLOSE',
                                buttonText2: 'SHARE',
                                buttonFunction2: () =>
                                    onPressShare(data?.shareTemplate?.text),
                            }),
                        );
                    }
                    navigation.popToTop();
                    setIsLoading(false);
                    // navigation.navigate('BottomTabNavigation');
                } else {
                    showDialogBox(
                        'OTP Error',
                        data.message,
                        'warning',
                        'Resend OTP',
                        true,
                        () => {
                            dispatch(reSendOTP(mobNo));
                            hideDialogBox();
                        },
                    );
                    // dispatch(loginFailure(data.message));
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setIsLoading(false);
                // If the request fails, dispatch loginFailure with the error message
                dispatch(loginFailure(error.message));
            });
    };
};

// Action creator to log in the user
export const reSendOTP = number => {
    return dispatch => {
        fetch(`${types.BASE_URL}/users/verify`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobNo: number,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'fail') {
                    return data.message;
                } else {
                    // dispatch(loginSuccess(data.user));
                }
            })
            .catch(error => {
                // If the request fails, dispatch loginFailure with the error message
                dispatch(loginFailure(error.message));
            });
    };
};

// Action creator to log in the user
export const login = (number, setIsOTPSent, setIsLoading) => {
    return dispatch => {
        fetch(`${types.BASE_URL}/users/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobNo: number,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Server error!');
                }
                return response.json();
            })
            .then(data => {
                if (data.status == 'fail') {
                    showDialogBox(
                        'Signin Error',
                        data.message,
                        'warning',
                        'OK',
                        true,
                    );
                    setIsLoading(false);
                } else {
                    dispatch({ type: types.LOGIN_REQUEST });
                    if (setIsOTPSent) {
                        setIsOTPSent(true);
                    }
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setIsLoading(false);
                // If the request fails, dispatch loginFailure with the error message
                dispatch(loginFailure(error.message));
            });
    };
};

// Action creator to sign up the user
export const signup = (
    name,
    number,
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
        })
            .then(response => response.data)
            .then(data => {
                dispatch({ type: types.LOGIN_REQUEST });
                if (setIsOTPSent) {
                    setIsOTPSent(true);
                }
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                // If the request fails, dispatch loginFailure with the error message
                dispatch(loginFailure(error.message));
            });
    };
};
