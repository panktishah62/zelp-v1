import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getSubscriptionPlanDetails = () => {

    return axiosRequest.get(ApiPath.getSubscriptionPlanDetails);
}

export const getBannerImages = () => {
    return axiosRequest.get(ApiPath.getBannerImages);
}

export const getPartnerRestaurants = () => {
    return axiosRequest.get(ApiPath.getPartnerRestaurants);
}

export const getOneSubscriptionPlanDetails = (subscriptionPlanId) => {
    return axiosRequest.get(`${ApiPath.showOneSubscriptionPlan}/${subscriptionPlanId}`)
}

export const getCombos = (subscriptionPlanId, type) => {
    return axiosRequest.post(`${ApiPath.showComboForSubscription}/${subscriptionPlanId}`,{type})
}

export const getBestSellerFoodItems = (subscriptionPlanId,type) => {
    return axiosRequest.post(`${ApiPath.getBestSellerFoodItems}/${subscriptionPlanId}`,{type})
}

export const subscribeToAPlan = (subscriptionPlanId, data) => {
    return axiosRequest.post(`${ApiPath.subscribeToAPlan}/${subscriptionPlanId}`,data)
}

export const getCategorizedFoodItems = (subscriptionPlanId,type) => {
    return axiosRequest.post(`${ApiPath.getCategorizedFoodItems}/${subscriptionPlanId}`,{type})
}