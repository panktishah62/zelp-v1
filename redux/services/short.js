import axiosRequest from '../../utils/axiosRequest';
import ApiPath from '../constants/ApiPath';
export const getShort = data => {
    if (data && data.page && data.limit && data.shotId) {
        return axiosRequest.post(
            `${ApiPath.shorts}?page=${data.page}&limit=${data.limit}&shotId=${data.shotId}&latitude=${data.latitude}&longitude=${data.longitude}`,
            {
                shotsViewRestSortingConfig: data?.shotsViewRestSortingConfig,
            },
        );
    } else if (data && data.page && data.limit) {
        return axiosRequest.post(
            `${ApiPath.shorts}?page=${data.page}&limit=${data.limit}&latitude=${data.latitude}&longitude=${data.longitude}`,
            {
                shotsViewRestSortingConfig: data?.shotsViewRestSortingConfig,
            },
        );
    } else if (data && data.shotId) {
        return axiosRequest.post(
            `${ApiPath.shorts}?shotId=${data.shotId}&latitude=${data.latitude}&longitude=${data.longitude}`,
            {
                shotsViewRestSortingConfig: data?.shotsViewRestSortingConfig,
            },
        );
    }
    return axiosRequest.post(
        `${ApiPath.shorts}?latitude=${data.latitude}&longitude=${data.longitude}`,
        {
            shotsViewRestSortingConfig: data?.shotsViewRestSortingConfig,
        },
    );
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

export const getShotsViewRestSortingConfig_ = data => {
    return axiosRequest.get(
        `${ApiPath.getShotsViewRestSortingConfig}?latitude=${data.latitude}&longitude=${data.longitude}`,
    );
};
