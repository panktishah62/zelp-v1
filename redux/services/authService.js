import AsyncStorage from '@react-native-async-storage/async-storage';
import { showDialogBox } from '../../utils';
import ApiPath from '../constants/ApiPath';
import axiosRequest from '../../utils/axiosRequest';

export const IsUserLoggedIn = async onPressLogin => {
    const token = await AsyncStorage.getItem('token');
    if (token === null) {
        showDialogBox(
            'Please LogIn',
            'You are not Logged In!',
            'warning',
            'Login',
            true,
            onPressLogin,
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
