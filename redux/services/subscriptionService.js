import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getSubscriptionPlanDetails = () => {
    
    return axiosRequest.get(ApiPath.getSubscriptionPlanDetails);
}

export const getBannerImages=()=>{  
    return axiosRequest.get(ApiPath.getBannerImages);
}

export const getPartnerRestaurants = () => {
    return axiosRequest.get(ApiPath.getPartnerRestaurants);
}

export const getOneSubscriptionPlanDetails=(subscriptionPlanId)=>{
    return axiosRequest.get(`${ApiPath.showOneSubscriptionPlan}/${subscriptionPlanId}`)
}