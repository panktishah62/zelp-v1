// request
import axios from 'axios';
import { BASE_URL } from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showDialogBox } from '.';
const axiosRequest = axios.create({
    baseURL: BASE_URL,
});

axiosRequest.interceptors.request.use(
    async request => {
        const token = await AsyncStorage.getItem('token');
        if (token === null) {
            request.headers = {
                'content-type': 'application/json',
            };
        } else {
            request.headers = {
                'content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    },
);

axiosRequest.interceptors.response.use(
    response => {
        return response;
    },
    async function (error) {
        if (error.response.status === 401) {
            alert('please login to continue');
        } else if (error.response.status === 404) {
            showDialogBox(
                'Something went wrong!',
                error?.response?.data?.message,
                'danger',
                'OK',
                true,
            );
        } else if (error.response.status === 400) {
            showDialogBox(
                'Something went wrong!',
                error?.response?.data?.message,
                'danger',
                'OK',
                true,
            );
        } else if (error.response.status === 500) {
            showDialogBox(
                'Something went wrong!',
                error?.response?.data?.message,
                'danger',
                'OK',
                true,
            );
        } else {
            return Promise.reject(error);
        }
    },
);

export default axiosRequest;
