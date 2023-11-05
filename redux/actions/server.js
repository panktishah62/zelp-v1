import {
    GET_CART_CONFIG,
    GET_CONFIG,
    GET_CONFIG_ERROR,
    GET_SHOTS_CONFIG_ERROR,
    GET_SHOTS_VIEW_REST_SORTING_CONFIG,
    NETWORK_ERROR,
} from '../constants';
import RemoteConfigService from '../services/remoteConfigService';
import { getShotsViewRestSortingConfig_ } from '../services/short';
import { resetAddressError } from './address';
import { resetCartError } from './cartActions';
import { resetFollowedFroker } from './froker';
import remoteConfig from '@react-native-firebase/remote-config';

export const getConfig = () => {
    return async dispatch => {
        try {
            const config = {
                orderStatus: RemoteConfigService.getRemoteValue('orderStatus')
                    .asString()
                    .split(','),
                contactNo:
                    RemoteConfigService.getRemoteValue('contactNo').asString(),
                emailId:
                    RemoteConfigService.getRemoteValue('emailId').asString(),
                maxWalletMoneyToUse: RemoteConfigService.getRemoteValue(
                    'maxWalletMoneyToUse',
                ).asNumber(),
                GSTtaxes:
                    RemoteConfigService.getRemoteValue('GSTtaxes').asNumber(),
                minOrderValue:
                    RemoteConfigService.getRemoteValue(
                        'minOrderValue',
                    ).asNumber(),
                minOrderValueForWallet: RemoteConfigService.getRemoteValue(
                    'minOrderValueForWallet',
                ).asNumber(),
                deliveryPartnerFees: RemoteConfigService.getRemoteValue(
                    'deliveryPartnerFees',
                ).asNumber(),
                packagingCharges:
                    RemoteConfigService.getRemoteValue(
                        'packagingCharges',
                    ).asNumber(),
                deliveryTip:
                    RemoteConfigService.getRemoteValue(
                        'deliveryTip',
                    ).asNumber(),
                isDeliveryFree:
                    RemoteConfigService.getRemoteValue(
                        'isDeliveryFree',
                    ).asBoolean(),
                // maxReferralCoinsToUse: parameters.maxReferralCoinsToUse.asNumber(),
                maxReferralCoinMoneyToUse: RemoteConfigService.getRemoteValue(
                    'maxReferralCoinMoneyToUse',
                ).asNumber(),
                minOrderValueForReferralCoins:
                    RemoteConfigService.getRemoteValue(
                        'minOrderValueForReferralCoins',
                    ).asNumber(),
            };
            dispatch({
                type: GET_CONFIG,
                payload: config,
            });
            dispatch({
                type: GET_CART_CONFIG,
                payload: config,
            });
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
