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
