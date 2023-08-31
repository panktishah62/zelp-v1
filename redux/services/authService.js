import AsyncStorage from '@react-native-async-storage/async-storage';
import { DialogTypes } from '../../utils';
import ApiPath from '../constants/ApiPath';
import axiosRequest from '../../utils/axiosRequest';
import { hideDialog, showDialog } from '../actions/dialog';

export const IsUserLoggedIn = async onPressLogin => {
    const token = await AsyncStorage.getItem('token');
    if (token === null) {
        dispatch(
            showDialog({
                isVisible: true,
                titleText: 'Please LogIn',
                subTitleText: 'You are not Logged In!',
                buttonText1: 'LOGIN',
                buttonFunction1: () => {
                    onPressLogin();
                    dispatch(hideDialog());
                },
                type: DialogTypes.WARNING,
            }),
        );
        return false;
    }
    return true;
};

export const IsLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token === null) {
        return false;
    }
    return true;
};

export const deleteUserAccount = () => {
    return axiosRequest.patch(ApiPath.deleteUserAccount);
};

export const signUpUser = data => {
    return axiosRequest.post(ApiPath.signUpUser, data);
};

export const signInUser = data => {
    return axiosRequest.post(ApiPath.signInUser, data);
};

export const verifyOtp = data => {
    return axiosRequest.get(`${ApiPath.verifyOTP}/${data.mobNo}/${data.otp}`);
};

export const resendOTP = data => {
    return axiosRequest.post(`${ApiPath.resendOTP}`, data);
};
