import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Linking, PermissionsAndroid } from 'react-native';
import * as Permissions from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import remoteConfig from '@react-native-firebase/remote-config';
import {
    ADD_ADDRESS,
    EDIT_ADDRESS,
    GET_ALL_ADDRESS,
    SET_DEFAULT_ADDRESS,
    UNSET_DEFAULT_ADDRESS,
    GET_DEFAULT_ADDRESS,
    GET_LIVE_LOCATION,
    FETCH_DATA_FAILURE,
    GET_LOCATION_FAILURE,
    GET_LOCATION_REQUEST,
    GET_LOCATION_SUCCESS,
    DELETE_ADDRESS,
    GOOGLE_MAPS_APIKEY,
    RESET_ADDRESS,
    FETCH_DATA_FAILURE_ADDRESS,
    RESET_ADDRESS_ERROR,
    CHECK_LOCATION_PERMISSION,
    IS_LOCATION_ON,
    IS_GPS_ON,
} from '../constants';
import { Alert } from 'react-native';
import {
    DENIED,
    DialogTypes,
    GRANTED,
    NEVER_ASK_AGAIN,
    getCoordinatesFromGoogleMapUrl,
} from '../../utils';
import { changeCartAddress } from './cartActions';
import { hideDialog, showDialog } from './dialog';
import {
    addUserAddress,
    deleteUserAddress,
    editUserAddress,
    getAllUserAddress,
    getDefaultUserAddress,
    setDefaultAddress,
} from '../services/addressService';
import { selectAddressForCart } from './subscriptionCart';
import RemoteConfigService from '../services/remoteConfigService';

export const addAddress = (address, navigation, fun) => {
    return async dispatch => {
        await addUserAddress(address)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    dispatch({ type: ADD_ADDRESS, payload: data.addresses });
                    dispatch(getAllAddress(fun));
                    dispatch(getUserCurrentOrSavedLocation(null));
                    navigation.goBack();
                }
            })
            .catch(error => {
                dispatch({ type: FETCH_DATA_FAILURE_ADDRESS, payload: error });
            });
    };
};

export const editAddress = (address, addressId, navigation, fun) => {
    return async dispatch => {
        await editUserAddress(address, addressId)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    dispatch({ type: EDIT_ADDRESS, payload: data.addresses });
                    dispatch(getAllAddress(fun));
                    dispatch(getUserCurrentOrSavedLocation(null));
                    navigation.goBack();
                }
            })
            .catch(error => {
                dispatch({ type: FETCH_DATA_FAILURE_ADDRESS, payload: error });
            });
    };
};

export const getAllAddress = fun => {
    return async dispatch => {
        await getAllUserAddress()
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    dispatch({
                        type: GET_ALL_ADDRESS,
                        payload: data.addresses,
                    });
                    if (fun) {
                        fun();
                    }
                }
            })
            .catch(error => {
                dispatch({ type: FETCH_DATA_FAILURE_ADDRESS, payload: error });
            });
    };
};

export const setDefaultAddressTo = (addressId, fun) => {
    return async dispatch => {
        await setDefaultAddress(addressId)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    let location = getCoordinatesFromGoogleMapUrl(
                        data.defaultAddress.geoLocation,
                    );
                    dispatch({
                        type: SET_DEFAULT_ADDRESS,
                        payload: {
                            location: location,
                            addresses: data?.addresses,
                            defaultAddress: data?.defaultAddress,
                            googleMapsLink: data?.defaultAddress?.geoLocation,
                            area: data?.defaultAddress?.address,
                        },
                    });
                    dispatch(changeCartAddress(data?.defaultAddress));
                    dispatch(selectAddressForCart(data?.defaultAddress));
                    if (fun) {
                        fun();
                    }
                }
            })
            .catch(error => {
                dispatch({ type: FETCH_DATA_FAILURE_ADDRESS, payload: error });
            });
    };
};

export const getDefaultAddress = (setIsLoading, navigation) => {
    return async dispatch => {
        const checkLocationMismatch = savedAddress => {
            Geolocation.getCurrentPosition(
                async location => {
                    const { latitude, longitude } = location?.coords;
                    const distance = getDistance(
                        { latitude, longitude },
                        savedAddress,
                    );
                    if (
                        distance >
                        RemoteConfigService.getRemoteValue(
                            'UserLocationRadius',
                        )?.asNumber()
                    ) {
                        if (navigation) {
                            dispatch(
                                showDialog({
                                    isVisible: true,
                                    titleText: `Ordering for someone else?`,
                                    subTitleText: `Your Current Location is different from your saved address. Add this address to see all Restaurants available in this location!`,
                                    buttonText1: 'CLOSE',
                                    buttonText2: 'ADD ADDRESS',
                                    buttonFunction2: () => {
                                        dispatch(getAllAddress());
                                        dispatch(hideDialog());
                                        navigation.navigate('Address');
                                    },
                                    type: DialogTypes.DEFAULT,
                                }),
                            );
                        }
                    }
                },
                error => {
                    dispatch({
                        type: CHECK_LOCATION_PERMISSION,
                        payload: NEVER_ASK_AGAIN,
                    });
                    dispatch({
                        type: IS_LOCATION_ON,
                        payload: false,
                    });
                },
            );
        };

        try {
            await AsyncStorage.getItem('token').then(async authToken => {
                if (!authToken) {
                    dispatch({
                        type: GET_DEFAULT_ADDRESS,
                        payload: {
                            defaultAddress: '',
                            location: null,
                            googleMapsLink: null,
                            area: null,
                            loading: false,
                            error: '',
                        },
                    });
                    dispatch(getUserLocation(setIsLoading));
                } else {
                    return await getDefaultUserAddress()
                        .then(response => response?.data)
                        .then(data => {
                            if (
                                data &&
                                data?.defaultAddress &&
                                data?.defaultAddress?.geoLocation
                            ) {
                                const location = getCoordinatesFromGoogleMapUrl(
                                    data.defaultAddress.geoLocation,
                                );
                                dispatch({
                                    type: GET_DEFAULT_ADDRESS,
                                    payload: {
                                        defaultAddress: data.defaultAddress,
                                        location: location,
                                        googleMapsLink:
                                            data.defaultAddress.geoLocation,
                                        area: data.defaultAddress.address,
                                    },
                                });
                                dispatch(
                                    changeCartAddress(data.defaultAddress),
                                );
                                dispatch(
                                    selectAddressForCart(data.defaultAddress),
                                );
                                checkLocationMismatch(location);
                                if (setIsLoading) {
                                    setIsLoading(false);
                                }
                            } else {
                                dispatch({
                                    type: GET_DEFAULT_ADDRESS,
                                    payload: {
                                        defaultAddress: '',
                                        location: null,
                                        googleMapsLink: null,
                                        area: null,
                                        loading: false,
                                        error: '',
                                    },
                                });
                                dispatch(changeCartAddress(null));
                                dispatch(selectAddressForCart(null));
                                dispatch(getUserLocation(setIsLoading));
                            }
                        })
                        .catch(error => {
                            dispatch({
                                type: FETCH_DATA_FAILURE_ADDRESS,
                                payload: error,
                            });
                        });
                }
            });
        } catch (error) {
            dispatch({ type: FETCH_DATA_FAILURE_ADDRESS, payload: error });
        }
    };
};

export const deleteAddress = addressId => {
    return async dispatch => {
        await deleteUserAddress(addressId)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    dispatch({ type: EDIT_ADDRESS, payload: data.addresses });
                    dispatch(getUserCurrentOrSavedLocation(null));
                }
            })
            .catch(error => {
                dispatch({ type: FETCH_DATA_FAILURE_ADDRESS, payload: error });
            });
    };
};

export const getLocationRequest = () => ({ type: GET_LOCATION_REQUEST });
export const getLocationSuccess = location => ({
    type: GET_LOCATION_SUCCESS,
    location,
});
export const getLocationFailure = error => ({
    type: GET_LOCATION_FAILURE,
    error,
});

export const getUserLocation = setIsLoading => {
    return async dispatch => {
        dispatch({ type: GET_LOCATION_REQUEST });

        try {
            // Verify if location access is granted

            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                if (granted != PermissionsAndroid.RESULTS.GRANTED) {
                    throw new Error('Location access not granted');
                }
            }

            Geolocation.getCurrentPosition(
                async location => {
                    /*     using openstreetmap     */
                    // const response = await fetch(
                    //     `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords.latitude}&lon=${location.coords.longitude}&zoom=18&addressdetails=1`,
                    // );
                    // const data = await response.json();
                    // const area = data.display_name;
                    // dispatch({
                    //     type: GET_LOCATION_SUCCESS,
                    //     payload: {
                    //         location: {
                    //             latitude: data.lat,
                    //             longitude: data.lon,
                    //         },
                    //         googleMapsLink: googleMapsLink,
                    //         area: area,
                    //     },
                    // });

                    // Use Geocoding API to get location information
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.coords?.latitude},${location?.coords?.longitude}&key=${GOOGLE_MAPS_APIKEY}`,
                    );
                    const data = await response.json();

                    // Extract area from location information
                    const area = data.results[0].address_components.find(
                        component =>
                            component.types.includes('neighborhood') ||
                            component.types.includes('sublocality') ||
                            component.types.includes('locality'),
                    ).long_name;

                    const googleMapsLink = `https://www.google.com/maps?q=${data.lat},${data.lon}`;

                    dispatch({
                        type: GET_LOCATION_SUCCESS,
                        payload: {
                            location: {
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            },
                            googleMapsLink: googleMapsLink,
                            area: area,
                        },
                    });
                    if (setIsLoading) {
                        setIsLoading(false);
                    }
                },
                error => {
                    dispatch({
                        type: CHECK_LOCATION_PERMISSION,
                        payload: NEVER_ASK_AGAIN,
                    });
                    dispatch({
                        type: IS_LOCATION_ON,
                        payload: false,
                    });
                },
            );
        } catch (error) {
            Alert.alert(
                'Error',
                'Error while accessing location, please check your permissions or please try again',
            );
            dispatch({
                type: FETCH_DATA_FAILURE_ADDRESS,
                payload: error?.message,
            });
        }
    };
};

export const resetAddress = () => ({
    type: RESET_ADDRESS,
});

export const resetAddressError = () => ({
    type: RESET_ADDRESS_ERROR,
});

export const getUserCurrentOrSavedLocation = (setIsLoading, navigation) => {
    return async dispatch => {
        const getLocationCoords = async () => {
            return new Promise(async resolve => {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        async location => {
                            const { latitude, longitude } = location?.coords;
                            if (latitude && longitude) {
                                const response = await fetch(
                                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_APIKEY}`,
                                );
                                const data = await response.json();

                                const area =
                                    data.results[0].address_components.find(
                                        component =>
                                            component.types.includes(
                                                'neighborhood',
                                            ) ||
                                            component.types.includes(
                                                'sublocality',
                                            ) ||
                                            component.types.includes(
                                                'locality',
                                            ),
                                    ).long_name;

                                const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                                dispatch({
                                    type: CHECK_LOCATION_PERMISSION,
                                    payload: GRANTED,
                                });
                                dispatch({
                                    type: IS_LOCATION_ON,
                                    payload: true,
                                });
                                dispatch({
                                    type: IS_GPS_ON,
                                    payload: true,
                                });
                                resolve({
                                    latitude,
                                    longitude,
                                    area,
                                    googleMapsLink,
                                });
                            } else {
                                dispatch({
                                    type: FETCH_DATA_FAILURE_ADDRESS,
                                    payload: 'Location not accessable',
                                });
                                resolve(null);
                            }
                        },
                        error => {
                            dispatch(
                                showDialog({
                                    isVisible: true,
                                    titleText:
                                        'Please Turn On device GPS Location!',
                                    subTitleText:
                                        'We will be able to give better experience by accessing your location',
                                    buttonText1: 'CLOSE',
                                    type: DialogTypes.WARNING,
                                }),
                            );
                            dispatch({
                                type: IS_GPS_ON,
                                payload: false,
                            });
                            if (setIsLoading) setIsLoading(false);
                            resolve(null);
                        },
                    );
                } else if (
                    granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
                ) {
                    if (setIsLoading) setIsLoading(false);
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Please Turn On Your Location!',
                            subTitleText:
                                'Open the app again after turning on location',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.WARNING,
                        }),
                    );
                    dispatch({
                        type: IS_LOCATION_ON,
                        payload: false,
                    });
                    dispatch({
                        type: CHECK_LOCATION_PERMISSION,
                        payload: NEVER_ASK_AGAIN,
                    });
                    resolve(null);
                } else {
                    if (setIsLoading) setIsLoading(false);
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Please Turn On Your Location!',
                            subTitleText:
                                'Open the app again after turning on location',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.WARNING,
                        }),
                    );
                    dispatch({
                        type: CHECK_LOCATION_PERMISSION,
                        payload: DENIED,
                    });
                    dispatch({
                        type: IS_LOCATION_ON,
                        payload: false,
                    });

                    resolve(null);
                }
            });
        };

        const getSavedAddress = async () => {
            return new Promise(async resolve => {
                await getDefaultUserAddress()
                    .then(response => response?.data)
                    .then(data => {
                        if (
                            data &&
                            data?.defaultAddress &&
                            data?.defaultAddress?.geoLocation
                        ) {
                            resolve(data?.defaultAddress);
                        } else {
                            resolve(null);
                        }
                    })
                    .catch(err => resolve(null));
            });
        };

        try {
            await AsyncStorage.getItem('token').then(async authToken => {
                if (!authToken) {
                    dispatch({
                        type: GET_DEFAULT_ADDRESS,
                        payload: {
                            defaultAddress: '',
                            location: null,
                            googleMapsLink: null,
                            area: null,
                            loading: false,
                            error: '',
                        },
                    });

                    const geoObject = await getLocationCoords();
                    if (
                        geoObject &&
                        geoObject.latitude &&
                        geoObject.longitude &&
                        geoObject.googleMapsLink &&
                        geoObject.area
                    ) {
                        dispatch({
                            type: GET_LOCATION_SUCCESS,
                            payload: {
                                location: {
                                    latitude: geoObject.latitude,
                                    longitude: geoObject.longitude,
                                },
                                googleMapsLink: geoObject.googleMapsLink,
                                area: geoObject.area,
                            },
                        });
                        if (setIsLoading) setIsLoading(false);
                    } else {
                        dispatch({
                            type: GET_DEFAULT_ADDRESS,
                            payload: {
                                defaultAddress: '',
                                location: null,
                                googleMapsLink: null,
                                area: null,
                                loading: false,
                                error: '',
                            },
                        });
                        if (setIsLoading) setIsLoading(false);
                    }

                    if (setIsLoading) setIsLoading(false);
                } else {
                    const geoObject = await getLocationCoords();

                    if (geoObject) {
                        const savedAddress = await getSavedAddress();

                        if (savedAddress) {
                            const location = getCoordinatesFromGoogleMapUrl(
                                savedAddress.geoLocation,
                            );

                            dispatch({
                                type: GET_DEFAULT_ADDRESS,
                                payload: {
                                    defaultAddress: savedAddress,
                                    location: location,
                                    googleMapsLink: savedAddress.geoLocation,
                                    area: savedAddress.address,
                                },
                            });
                            dispatch(changeCartAddress(savedAddress));
                            dispatch(selectAddressForCart(savedAddress));
                        } else {
                            dispatch(changeCartAddress(null));
                            dispatch(selectAddressForCart(null));
                            dispatch({
                                type: GET_LOCATION_SUCCESS,
                                payload: {
                                    location: {
                                        latitude: geoObject.latitude,
                                        longitude: geoObject.longitude,
                                    },
                                    googleMapsLink: geoObject.googleMapsLink,
                                    area: geoObject.area,
                                },
                            });
                        }
                    } else {
                        dispatch(changeCartAddress(null));
                        dispatch(selectAddressForCart(null));
                        dispatch({
                            type: GET_DEFAULT_ADDRESS,
                            payload: {
                                defaultAddress: '',
                                location: null,
                                googleMapsLink: null,
                                area: null,
                                loading: false,
                                error: '',
                            },
                        });
                    }

                    if (setIsLoading) setIsLoading(false);
                }
            });
        } catch (error) {}
    };
};
