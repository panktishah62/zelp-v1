import { DENIED, GRANTED, NEVER_ASK_AGAIN } from '../../utils';
import { CHECK_LOCATION_PERMISSION, IS_LOCATION_ON } from '../constants';
import { Linking, PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import * as Permissions from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export const checkPermission = () => {
    return async dispatch => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        async location => {
                            if (location.coords) {
                                dispatch({
                                    type: CHECK_LOCATION_PERMISSION,
                                    payload: GRANTED,
                                });
                            } else {
                                dispatch({
                                    type: CHECK_LOCATION_PERMISSION,
                                    payload: DENIED,
                                });
                            }
                            dispatch({
                                type: IS_LOCATION_ON,
                                payload: true,
                            });
                        },
                        error => {
                            dispatch({
                                type: IS_LOCATION_ON,
                                payload: false,
                            });
                        },
                    );
                } else if (
                    granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
                ) {
                    dispatch({
                        type: CHECK_LOCATION_PERMISSION,
                        payload: NEVER_ASK_AGAIN,
                    });
                    dispatch({
                        type: IS_LOCATION_ON,
                        payload: true,
                    });
                } else {
                    dispatch({
                        type: CHECK_LOCATION_PERMISSION,
                        payload: DENIED,
                    });
                    dispatch({
                        type: IS_LOCATION_ON,
                        payload: true,
                    });
                }
            } else if (Platform.OS === 'ios') {
                Geolocation.getCurrentPosition(
                    async location => {
                        if (location.coords) {
                            dispatch({
                                type: CHECK_LOCATION_PERMISSION,
                                payload: GRANTED,
                            });
                        } else {
                            dispatch({
                                type: CHECK_LOCATION_PERMISSION,
                                payload: DENIED,
                            });
                        }
                        dispatch({
                            type: IS_LOCATION_ON,
                            payload: true,
                        });
                    },
                    error => {
                        dispatch({
                            type: IS_LOCATION_ON,
                            payload: false,
                        });
                    },
                );
            }
        } catch (err) {
            dispatch({ type: CHECK_LOCATION_PERMISSION, payload: DENIED });
        }
    };
};
