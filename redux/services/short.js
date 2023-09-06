import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
export const getShort = data => {
    if (data && data.page && data.limit && data.shotId) {
        return axiosRequest.get(
            `${ApiPath.shorts}?page=${data.page}&limit=${data.limit}&shotId=${data.shotId}&visitedShots=${data.visitedShots}`,
        );
    } else if (data && data.page && data.limit) {
        return axiosRequest.get(
            `${ApiPath.shorts}?page=${data.page}&limit=${data.limit}&visitedShots=${data.visitedShots}`,
        );
    } else if (data && data.shotId) {
        return axiosRequest.get(
            `${ApiPath.shorts}?shotId=${data.shotId}&visitedShots=${data.visitedShots}`,
        );
    }
    return axiosRequest.get(`${ApiPath.shorts}`);
};
export const follow = data => {
    return axiosRequest.post(ApiPath.followFroker, data);
};
export const likeShorts = data => {
    return axiosRequest.post(ApiPath.likeShots, data);
};

export const unlikeShots = data => {
    return axiosRequest.delete(`${ApiPath.unlikeShots}/${data.shotsId}`);
};
export const unfollowFroker = data => {
    return axiosRequest.delete(`${ApiPath.unfollowFroker}/${data.frokerId}`);
};

export const updateShotsView = data => {
    return axiosRequest.post(`${ApiPath.updateShotsView}`, data);
};
