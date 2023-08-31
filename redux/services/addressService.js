import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiPath from '../constants/ApiPath';
import axiosRequest from '../../utils/axiosRequest';

export const addUserAddress = data => {
    return axiosRequest.post(`${ApiPath.addUserAddress}`, data);
};

export const editUserAddress = (data, addressId) => {
    return axiosRequest.put(`${ApiPath.editUserAddress}/${addressId}`, data);
};

export const getAllUserAddress = () => {
    return axiosRequest.get(`${ApiPath.getAllUserAddress}`);
};

export const setDefaultAddress = addressId => {
    return axiosRequest.put(`${ApiPath.setDefaultAddress}/${addressId}`);
};

export const getDefaultUserAddress = () => {
    return axiosRequest.get(`${ApiPath.getDefaultAddress}`);
};

export const deleteUserAddress = addressId => {
    return axiosRequest.delete(`${ApiPath.deleteUserAddress}/${addressId}`);
};
