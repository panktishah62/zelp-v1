import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiPath from '../constants/ApiPath';
import axiosRequest from '../../utils/axiosRequest';

export const getAllFoodItems = restaurantId => {
    return axiosRequest.get(`${ApiPath.getAllFoodItems}/${restaurantId}`);
};
