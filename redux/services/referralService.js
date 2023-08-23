import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getUserReferralCodeDetails = () => {
    return axiosRequest.get(ApiPath.getUserReferralCodeDetails);
};
