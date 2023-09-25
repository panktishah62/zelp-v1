import {
    GET_CART_CONFIG,
    GET_CONFIG,
    GET_CONFIG_ERROR,
    GET_SHOTS_CONFIG_ERROR,
    GET_SHOTS_VIEW_REST_SORTING_CONFIG,
    NETWORK_ERROR,
} from '../constants';
import { getShotsViewRestSortingConfig_ } from '../services/short';
import { resetAddressError } from './address';
import { resetCartError } from './cartActions';
import { resetFollowedFroker } from './froker';
import remoteConfig from '@react-native-firebase/remote-config';

export const getConfig = () => {
    return async dispatch => {
        try {
            const parameters = remoteConfig().getAll();
            const config = {
                orderStatus: parameters.orderStatus.asString().split(','),
                contactNo: parameters.contactNo.asString(),
                emailId: parameters.emailId.asString(),
                maxWalletMoneyToUse: parameters.maxWalletMoneyToUse.asNumber(),
                GSTtaxes: parameters.GSTtaxes.asNumber(),
                minOrderValue: parameters.minOrderValue.asNumber(),
                deliveryPartnerFees: parameters.deliveryPartnerFees.asNumber(),
                packagingCharges: parameters.packagingCharges.asNumber(),
                deliveryTip: parameters.deliveryTip.asNumber(),
                isDeliveryFree: parameters.isDeliveryFree.asBoolean(),
            };
            dispatch({
                type: GET_CONFIG,
                payload: config,
            });
            dispatch({
                type: GET_CART_CONFIG,
                payload: config,
            });
            // console.log('data.config', data.config);
            dispatch(resetFollowedFroker());
            dispatch(resetAddressError());
            dispatch(resetCartError());
        } catch (error) {
            dispatch({
                type: GET_CONFIG_ERROR,
                payload: error,
            });
        }
    };
};

export const getShotsViewRestSortingConfig = data => {
    return async dispatch => {
        try {
            await getShotsViewRestSortingConfig_(data)
                .then(response => response?.data)
                .then(data => {
                    dispatch({
                        type: GET_SHOTS_VIEW_REST_SORTING_CONFIG,
                        payload: data?.shotsViewRestSortingConfig,
                    });
                });
        } catch (error) {
            dispatch({
                type: GET_SHOTS_CONFIG_ERROR,
                payload: error,
            });
        }
    };
};
