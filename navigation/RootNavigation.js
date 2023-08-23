import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { AppState, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GRANTED, showDialogBox } from '../utils';
import { getUserProfile } from '../redux/actions/user';
import { getDefaultAddress } from '../redux/actions/address';
import { checkPermission } from '../redux/actions/permissions';
import NetInfo from '@react-native-community/netinfo';
import { isInternetAvailable } from '../redux/actions/network';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AppTourScreen from '../screens/AppTour/AppTourScreen';
import DefaultDialog from '../components/DialogBox/DefaultDialog';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [initialRouteName, setInitialRouteName] = useState('');
    const locationPermission = useSelector(
        state => state.permissions.locationPermission,
    );
    const isLocationOn = useSelector(state => state.permissions.isLocationOn);
    const isInternetOn = useSelector(state => state.network.isInternetOn);

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
            showDialogBox('', error.message, 'warning', 'OK', true);
        }
    };

    useEffect(() => {
        isFirstLaunch();
        dispatch(getUserProfile());
    }, []);

    useEffect(() => {
        if (locationPermission === GRANTED && isLocationOn) {
            dispatch(getDefaultAddress(null, navigation));
        }
        const appFocusSubscription = AppState.addEventListener(
            'change',
            state => {
                if (state === 'active') {
                    dispatch(checkPermission());
                    if (locationPermission === GRANTED && isLocationOn) {
                        dispatch(getDefaultAddress(null, navigation));
                    } else if (!isLocationOn) {
                        showDialogBox(
                            'Please Turn On Your Location!',
                            'Open the app again after turning on location',
                            'warning',
                            'OK',
                            true,
                        );
                    }
                }
            },
        );

        return () => {
            appFocusSubscription.remove();
        };
    }, [locationPermission, isLocationOn]);

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                showDialogBox(
                    'Network Issue!',
                    'Please turn on your internet and open the app again!',
                    'warning',
                    'OK',
                    true,
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
