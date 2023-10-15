import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getSubscriptionPlanDetails = () => {
    return axiosRequest.get(ApiPath.getSubscriptionPlanDetails);
};

export const getBannerImages = () => {
    return axiosRequest.get(ApiPath.getBannerImages);
};

export const getPartnerRestaurants = () => {
    return axiosRequest.get(ApiPath.getPartnerRestaurants);
};

export const getOneSubscriptionPlanDetails = subscriptionPlanId => {
    return axiosRequest.get(
        `${ApiPath.showOneSubscriptionPlan}/${subscriptionPlanId}`,
    );
};

export const getCombos = (mealPlanId, type) => {
    return axiosRequest.post(
        `${ApiPath.showComboForSubscription}/${mealPlanId}`,
        { type },
    );
};

export const getBestSellerFoodItems = (subscriptionPlanId, lat, long) => {
    return axiosRequest.post(
        `${ApiPath.getBestSellerFoodItems}/${subscriptionPlanId}/${lat}/${long}`,
    );
};

export const getQuickCheckoutItems = (subscriptionPlanId, lat, long) => {
    return axiosRequest.post(
        `${ApiPath.getQuickCheckoutItems}/${subscriptionPlanId}/${lat}/${long}`,
    );
};

export const subscribeToAPlan = (subscriptionPlanId, data) => {
    return axiosRequest.post(
        `${ApiPath.subscribeToAPlan}/${subscriptionPlanId}`,
        data,
    );
};

export const getCategorizedFoodItems = (
    subscriptionPlanId,
    mealPlanId,
    lat,
    long,
) => {
    return axiosRequest.post(
        `${ApiPath.getCategorizedFoodItems}/${subscriptionPlanId}/${mealPlanId}/${lat}/${long}`,
    );
};

export const showSubscriptionDetails = () => {
    return axiosRequest.get(`${ApiPath.showSubscriptionDetails}`);
};

export const getOneSubscriptionOrder = subscriptionOrderId => {
    return axiosRequest.get(
        `${ApiPath.getOneSubscriptionOrder}/${subscriptionOrderId}`,
    );
};

export const getMealPlansForSubscription = subscriptionPlanId => {
    return axiosRequest.get(
        `${ApiPath.getMealPlansForSubscription}/${subscriptionPlanId}`,
    );
};

export const orderUsingSubscription = data => {
    return axiosRequest.post(`${ApiPath.orderUsingSubscription}`, data);
};

export const getConfigForSubscription = () => {
    return axiosRequest.get(ApiPath.getSubscriptionConfig);
};

export const getOrderHistory = () => {
    return axiosRequest.get(ApiPath.getOrderHistory);
};
