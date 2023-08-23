import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getSubscriptionModelData = () => {
    return axiosRequest.get(ApiPath.getSubscriptionModelData);
};
