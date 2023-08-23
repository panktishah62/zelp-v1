import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getValidCouponsForUser = data => {
    return axiosRequest.post(ApiPath.getValidCouponsForUser, data);
};

export const getSearchedCoupon = data => {
    return axiosRequest.post(
        `${ApiPath.getSearchedCouponForUser}/${data.couponCode}`,
        data,
    );
};
