import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getAllRefunds = () => {
    return axiosRequest.get(ApiPath.getAllRefunds);
};
