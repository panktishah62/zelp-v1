import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getValidCouponsForUser = data => {
    return axiosRequest.post(ApiPath.getValidCouponsForUser, data);
};

export const getValidSubscriptionCouponsForUser = data => {
    return axiosRequest.post(ApiPath.getSubscriptionCouponsForUser, data);
};

export const getSearchedCoupon = data => {
    return axiosRequest.post(
        `${ApiPath.getSearchedCouponForUser}/${data.couponCode}`,
        data,
    );
};

export const getSearchedSubscriptionCoupon = data => {
    return axiosRequest.post(
        `${ApiPath.getSearchedSubscriptionCouponForUser}/${data.couponCode}`,
        data?.subscriptionData,
    );
};
