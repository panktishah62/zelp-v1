import {
    GET_CART_CONFIG,
    GET_CONFIG,
    GET_CONFIG_ERROR,
    NETWORK_ERROR,
} from '../constants';
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
