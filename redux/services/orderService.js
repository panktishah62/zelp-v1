import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const createOrderAndInitiatePayment = data => {
    return axiosRequest.post(ApiPath.createOrderAndInitiatePayment, data);
};

export const createOrderAndInitiateCOD = data => {
    return axiosRequest.post(ApiPath.createOrderAndInitiateCOD, data);
};

export const getAllOrders = (page, limit) => {
    return axiosRequest.get(`${ApiPath.getAllOrder}/${page}/${limit}`);
};

export const getOrderDetails = data => {
    return axiosRequest.get(`${ApiPath.getOrderDetails}/${data.orderId}`);
};

export const getCurrentUserOrder = () => {
    return axiosRequest.get(`${ApiPath.getCurrentUserOrder}`);
};

export const cancelOrderByUser = data => {
    return axiosRequest.put(`${ApiPath.cancelOrderByUser}`, data);
};
