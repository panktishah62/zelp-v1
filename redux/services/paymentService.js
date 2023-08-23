import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getPaymentContext = data => {
    return axiosRequest.post(ApiPath.getPaymentContext, data);
};

export const initiatePayment = data => {
    return axiosRequest.get(data.url);
};

export const checkPaymentStatus = merchantTransactionId => {
    return axiosRequest.get(
        `${ApiPath.checkPaymentStatus}/${merchantTransactionId}`,
    );
};
