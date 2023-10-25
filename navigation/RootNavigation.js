import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { AppState, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DialogTypes, GRANTED } from '../utils';
import { getUserProfile } from '../redux/actions/user';
import { getDefaultAddress } from '../redux/actions/address';
import { checkPermission } from '../redux/actions/permissions';
import NetInfo from '@react-native-community/netinfo';
import { isInternetAvailable } from '../redux/actions/network';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AppTourScreen from '../screens/AppTour/AppTourScreen';
import DefaultDialog from '../components/DialogBox/DefaultDialog';
import { showDialog } from '../redux/actions/dialog';
import { getShotsViewRestSortingConfig } from '../redux/actions/server';
import remoteConfig from '@react-native-firebase/remote-config';
import { getSubscriptionConfig } from '../redux/actions/subscriptionActions';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [initialRouteName, setInitialRouteName] = useState('');
    const location = useSelector(state => state.address.location);
    const locationPermission = useSelector(
        state => state.permissions.locationPermission,
    );
    const isLocationOn = useSelector(state => state.permissions.isLocationOn);
    const isInternetOn = useSelector(state => state.network.isInternetOn);
    const initialPopup = remoteConfig().getValue('InitialPopup').asString();

    const isFirstLaunch = async () => {
        try {
            const launch = await AsyncStorage.getItem('isFirstLaunch');
            await AsyncStorage.setItem('isFirstLaunch', 'false');
            if (launch === 'false') {
                setInitialRouteName('MainStack');
            } else {
                setInitialRouteName('AppTour');
            }
        } catch (error) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Something Went Wrong!',
                    subTitleText: error?.message,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.ERROR,
                }),
            );
        }
    };

    useEffect(() => {
        isFirstLaunch();
        dispatch(getUserProfile());
        dispatch(getSubscriptionConfig());
    }, []);

    useEffect(() => {
        if (locationPermission === GRANTED && isLocationOn) {
            dispatch(getDefaultAddress(null, navigation));
        } else {
            if (!isLocationOn) {
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
            }
        }
    }, [locationPermission, isLocationOn]);

    useEffect(() => {
        if (initialRouteName === 'AppTour') {
            if (initialPopup) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        ...JSON.parse(initialPopup),
                        type: DialogTypes.DEFAULT,
                    }),
                );
            }
        }
    }, [initialRouteName, initialPopup]);

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            dispatch(
                getShotsViewRestSortingConfig({
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                }),
            );
        }
    }, [location]);

    useEffect(() => {
        const appFocusSubscription = AppState.addEventListener(
            'change',
            state => {
                if (state === 'active') {
                    if (locationPermission === GRANTED && isLocationOn) {
                        dispatch(getDefaultAddress(null, navigation));
                    } else if (!isLocationOn) {
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
                    }
                }
            },
        );

        return () => {
            appFocusSubscription.remove();
        };
    }, [locationPermission]);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Network Issue!',
                        subTitleText:
                            'Please turn on your internet and open the app again!',
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
            }
            dispatch(isInternetAvailable(state.isConnected));
        });

        return () => removeNetInfoSubscription();
    }, []);

    const addressFetchError = useSelector(state => state.address.error);
    const cartActionsError = useSelector(state => state.cartActions.error);
    const dialog = useSelector(state => state.dialog);

    useEffect(() => {
        if (addressFetchError && isInternetOn) {
            throw Error(addressFetchError);
        } else if (cartActionsError && isInternetOn) {
            throw Error(cartActionsError);
        }
    }, [addressFetchError]);

    return (
        initialRouteName && (
            <>
                <Stack.Navigator initialRouteName={initialRouteName}>
                    <Stack.Screen
                        name="MainStack"
                        component={MainStack}
                        options={({ navigation, route }) => ({
                            header: () => <View />,
                        })}
                    />
                    <Stack.Screen
                        name="AppTour"
                        component={AppTourScreen}
                        options={({ navigation, route }) => ({
                            header: () => <View />,
                        })}
                    />
                </Stack.Navigator>
                {dialog && <DefaultDialog dialog={dialog} />}
            </>
        )
    );
};
export default RootStack;
