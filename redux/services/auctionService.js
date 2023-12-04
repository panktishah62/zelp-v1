import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiPath from '../constants/ApiPath';
import axiosRequest from '../../utils/axiosRequest';

export const addAuction = data => {
    return axiosRequest.post(`${ApiPath.addAuction}`, data);
};

export const editAuction = (data, auctionId) => {
    return axiosRequest.put(`${ApiPath.editAuction}/${auctionId}`, data);
};

export const getAllAuctions = () => {
    return axiosRequest.get(`${ApiPath.getAllAuctions}`);
};

export const deleteAuction = auctionId => {
    return axiosRequest.delete(`${ApiPath.deleteAuction}/${auctionId}`);
};

export const getAllCategorisedAuctions = category => {
    return axiosRequest.get(`${ApiPath.getAllCategorisedAuctions}/${category}`);
};

export const searchAuctions = text => {
    return axiosRequest.get(`${ApiPath.searchAuctions}/${text}`);
};

export const searchProductByAuction = text => {
    return axiosRequest.get(`${ApiPath.searchProductByAuction}/${text}`);
};
