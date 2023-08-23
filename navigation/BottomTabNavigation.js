import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Styles } from '../styles';
import { colors } from '../styles/colors';
import HomeIcon from '../assets/icons/Home.svg';
import FrokerIcon from '../assets/icons/Froker.svg';
import FoodAffairIcon from '../assets/icons/FoodAffair.svg';
import FoodAffairFocusedIcon from '../assets/icons/FoodAffairFocused.svg';
import ShotsIcon from '../assets/icons/Explore.svg';
import RestaurantsIcon from '../assets/icons/RestaurantsIcon.svg';
import RestaurantsIconFocused from '../assets/icons/RestaurantsIconFocused.svg';
import HomeScreen from '../screens/Home/Home';
import RestaurantsScreen from '../screens/Restaurants/Restaurants';
import PostScreen from '../screens/Posts/Posts';
import FoodAffairScreen from '../screens/FoodAffair/FoodAffair';
import ShotsScreen from '../screens/Shots/Shots';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentOrder } from '../redux/actions/currentOrder';
import { showDialogBox } from '../utils';
import { ErrorHandler } from '../components/ErrorHandler/ErrorHandler';
import HeaderWithLocation from '../components/Header/HeaderWithLocation';
import HeaderWithCart from '../components/Header/HeaderWithCart';
import ShotClassScreen from '../screens/Shots/ShotsClass';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import {
    handlePaymentCallBack,
    handleShotsLinkInBottomTabNavigator,
} from '../redux/linking/HandleLinks';
import {
    NotificationListner,
    configureNotifications,
} from '../utils/pushnotification_helper';
import SubscriptionPage from '../screens/SubscriptionModel/SubscriptionPage';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initialRouteName, setInitialRouteName] = useState('Home');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();

    // Function to navigate to a different screen
    const navigateToScreen = (screenName, data) => {
        if (navigation && screenName) {
            navigation.navigate(screenName, data ? data : null);
        }
    };

    useEffect(() => {
        configureNotifications(navigateToScreen);
    }, []);

    useEffect(() => {
        NotificationListner(setInitialRouteName, setIsLoading, navigation);
    }, []);

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
        });
    }, [navigation]);

    const getUserData = async () => {
        try {
            await AsyncStorage.getItem('token').then(authToken => {
                if (authToken) {
                    dispatch(getCurrentOrder());
                }
            });
        } catch (error) {
            showDialogBox('', error.message, 'warning', 'OK', true);
        }
    };
    useEffect(() => {
        getUserData();
    }, [isAuthenticated, navigation]);

    const handleDynamicLink = link => {
        if (link && link.url) {
            if (link.url.includes('shotId')) {
                handleShotsLinkInBottomTabNavigator(link, navigation);
            } else if (link.url.includes('paymentId')) {
                handlePaymentCallBack(link, navigation);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        dynamicLinks()
            .getInitialLink()
            .then(link => {
                if (link && link.url) {
                    if (link.url.includes('shotId')) {
                        handleShotsLinkInBottomTabNavigator(link, navigation);
                    } else if (link.url.includes('paymentId')) {
                        handlePaymentCallBack(link, navigation);
                    }
                }
            });
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <ErrorHandler>
            {initialRouteName && (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarHideOnKeyboard: true,
                        tabBarStyle: Styles.tabBarStyle,
                        tabBarActiveTintColor: colors.ORANGE,
                        tabBarInactiveTintColor: colors.GREY_ICON,
                        tabBarLabelStyle: Styles.tabBarLabelStyle,
                    })}
                    safeAreaInsets={{ bottom: 0 }}
                    initialRouteName={initialRouteName}>
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <HomeIcon
                                    height={35}
                                    focused={focused}
                                    style={{ color: color }}
                                />
                            ),
                            header: () => (
                                <HeaderWithLocation navigation={navigation} />
                            ),
                            unmountOnBlur: true,
                        }}
                        name="Home"
                        component={HomeScreen}
                    />
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <FrokerIcon
                                    height={35}
                                    focused={focused}
                                    style={{ color: color }}
                                />
                            ),
                            header: () => (
                                <HeaderWithLocation navigation={navigation} />
                            ),
                        }}
                        name="Subscription"
                        component={SubscriptionPage}
                    />
                    <Tab.Screen
                        options={({ route }) => ({
                            tabBarIcon: ({ focused, color }) => (
                                <ShotsIcon
                                    height={45}
                                    focused={focused}
                                    style={{ color: color }}
                                />
                            ),
                            header: () => (
                                <HeaderWithCart navigation={navigation} />
                            ),
                            tabBarStyle: {
                                display: 'none',
                                height: 0,
                                paddingTop: 0,
                                borderTopWidth: 0,
                            },
                        })}
                        name="Shots"
                        component={ShotClassScreen}
                    />

                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused, color }) =>
                                focused ? (
                                    <RestaurantsIconFocused
                                        height={35}
                                        focused={focused}
                                        style={{ color: color }}
                                    />
                                ) : (
                                    <RestaurantsIcon
                                        height={35}
                                        focused={focused}
                                        style={{ color: color }}
                                    />
                                ),
                            header: () => (
                                <HeaderWithLocation navigation={navigation} />
                            ),
                        }}
                        name="Restaurants"
                        component={RestaurantsScreen}
                    />
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused, color }) =>
                                focused ? (
                                    <FoodAffairFocusedIcon
                                        height={35}
                                        focused={focused}
                                        style={{ color: color }}
                                    />
                                ) : (
                                    <FoodAffairIcon
                                        height={35}
                                        focused={focused}
                                        style={{ color: color }}
                                    />
                                ),
                            header: () => (
                                <HeaderWithLocation navigation={navigation} />
                            ),
                        }}
                        name="Food Affair"
                        component={FoodAffairScreen}
                    />
                </Tab.Navigator>
            )}
        </ErrorHandler>
    );
};

export default BottomTabNavigation;
