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
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentOrder } from '../redux/actions/currentOrder';
import { DialogTypes } from '../utils';
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
import { showDialog } from '../redux/actions/dialog';
import Home from '../screens/SubscriptionModel/Home';
import { Linking, View } from 'react-native';
import branch from 'react-native-branch';
import HeaderWithLocationAndSearch from '../components/Header/HeaderWithLocationAndSearch';
import SubscriptionPageOld from '../screens/SubscriptionModel/SubscriptionPageOld';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [initialRouteName, setInitialRouteName] = useState('Home');
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.userId);
    const dispatch = useDispatch();

    // Listener
    branch.subscribe({
        onOpenStart: ({ uri, cachedInitialEvent }) => {},

        onOpenComplete: ({ error, params, uri }) => {
            if (error) {
                return;
            } else if (params) {
                if (params?.custom) {
                    navigation.navigate('Shots', { shotsId: params.custom });
                }
            }
        },
    });

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
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Something went wrong!',
                    subTitleText: error?.message,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.ERROR,
                }),
            );
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

    useEffect(() => {
        const getUrlAsync = async () => {
            // Get the deep link used to open the app
            const initialUrl = await Linking.getInitialURL();
            const len = initialUrl?.split('/').length;
            const type = len > 3 ? initialUrl?.split('/')[len - 2] : '';
            if (type === 'shots') {
                const shotsId = initialUrl?.split('/')[len - 1];
                navigation.navigate('Shots', { shotsId: shotsId });
            }
        };

        getUrlAsync();
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
                                <HeaderWithLocationAndSearch
                                    navigation={navigation}
                                />
                            ),
                            // unmountOnBlur: true,
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
                                // <View />
                                <HeaderWithLocationAndSearch
                                    navigation={navigation}
                                />
                            ),
                        }}
                        name="Subscription"
                        component={SubscriptionPageOld}
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
                                <HeaderWithLocationAndSearch
                                    navigation={navigation}
                                />
                            ),
                        }}
                        name="Restaurants"
                        component={RestaurantsScreen}
                    />
                    {/* <Tab.Screen
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
                    /> */}
                </Tab.Navigator>
            )}
        </ErrorHandler>
    );
};

export default BottomTabNavigation;
