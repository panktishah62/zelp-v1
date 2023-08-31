import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiPath from '../constants/ApiPath';
import axiosRequest from '../../utils/axiosRequest';

export const editUserProfile_ = data => {
    return axiosRequest.put(`${ApiPath.editUserProfile}`, data);
};

export const getUserProfile_ = () => {
    return axiosRequest.get(`${ApiPath.getUserProfile}`);
};

export const updateUserToken_ = data => {
    return axiosRequest.post(`${ApiPath.updateUserToken}`, data);
};
