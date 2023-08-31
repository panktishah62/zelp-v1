// request
import axios from 'axios';
import { BASE_URL, SHOW_DIALOG } from '../redux/constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DialogTypes } from '.';
import { useDispatch } from 'react-redux';
import { store } from '../redux/store';
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
            store.dispatch({
                type: SHOW_DIALOG,
                payload: {
                    isVisible: true,
                    titleText: 'Something went wrong!',
                    subTitleText: error?.response?.data?.message,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.ERROR,
                },
            });
        } else if (error.response.status === 400) {
            store.dispatch({
                type: SHOW_DIALOG,
                payload: {
                    isVisible: true,
                    titleText: 'Something went wrong!',
                    subTitleText: error?.response?.data?.message,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.ERROR,
                },
            });
        } else if (error.response.status === 500) {
            store.dispatch({
                type: SHOW_DIALOG,
                payload: {
                    isVisible: true,
                    titleText: 'Something went wrong!',
                    subTitleText: error?.response?.data?.message,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.ERROR,
                },
            });
        } else {
            return Promise.reject(error);
        }
    },
);

export default axiosRequest;
