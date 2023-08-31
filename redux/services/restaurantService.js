import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';

export const getAllRestaurants = (lat, long, page, limit) => {
    if (page && limit) {
        return axiosRequest.get(
            `${ApiPath.getAllRestaurants}/${lat}/${long}/${page}/${limit}`,
        );
    } else {
        return axiosRequest.get(`${ApiPath.getAllRestaurants}/${lat}/${long}`);
    }
};

export const getTopRated = (lat, long) => {
    return axiosRequest.get(`${ApiPath.getTopRatedRestaurants}/${lat}/${long}`);
};

export const getOffersRestaurants = (lat, long) => {
    return axiosRequest.get(`${ApiPath.getOffersRestaurants}/${lat}/${long}`);
};

export const getAllCategorisedRestaurants = (category, lat, long) => {
    return axiosRequest.get(
        `${ApiPath.getAllCategorisedRestaurants}/${category}/${lat}/${long}`,
    );
};

export const searchRestaurants_ = (text, lat, long) => {
    return axiosRequest.get(
        `${ApiPath.searchRestaurants}/${text}/${lat}/${long}`,
    );
};

export const searchFoodItemByRestaurants = (text, lat, long) => {
    return axiosRequest.get(
        `${ApiPath.searchFoodItemByRestaurants}/${text}/${lat}/${long}`,
    );
};
