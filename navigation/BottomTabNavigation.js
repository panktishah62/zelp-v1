import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Styles } from '../styles';
import { colors } from '../styles/colors';
import HomeIcon from '../assets/icons/home.svg';
import FrokerIcon from '../assets/icons/Froker.svg';
import UserIcon from '../assets/icons/UserIcon.svg';
import Explore from '../assets/icons/Explore.svg';
import FoodAffairIcon from '../assets/icons/FoodAffair.svg';
import FoodAffairFocusedIcon from '../assets/icons/FoodAffairFocused.svg';
import ShotsIcon from '../assets/icons/Explore.svg';
import RestaurantsIcon from '../assets/icons/RestaurantsIcon.svg';
import RestaurantsIconFocused from '../assets/icons/RestaurantsIconFocused.svg';
import PlusOrange from '../assets/icons/PlusOrange.svg';
import PlusCircle from '../assets/icons/plus-circle.svg';
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
import ExploreIconNav from '../assets/icons/ExploreIconNav.svg';
import IconTry from '../assets/icons/IconTry.svg';
import UpdatesIcon from '../assets/ZelpIcons/Updates.svg';

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
import { Linking, TouchableOpacity, View } from 'react-native';
import branch from 'react-native-branch';
import HeaderWithLocationAndSearch from '../components/Header/HeaderWithLocationAndSearch';
import HeaderWithTitle from '../components/Header/HeaderWithTitle';
import SubscriptionPageOld from '../screens/SubscriptionModel/SubscriptionPageOld';

import LiveTrackingMap from '../screens/CartAndTrack/LiveTrackingMap';
import TrackOrderScreen from '../screens/CartAndTrack/TrackOrder';
import ProfileScreen from '../screens/User/Profile';
import MarketplaceScreen from '../screens/Marketplace/Marketplace';
import GuidelinesScreen from '../screens/SellerOnBoarding/Guidelines';
import SellerCategoryScreen from '../screens/SellerOnBoarding/SellerCategory';
import ProductImageScreen from '../screens/SellerOnBoarding/ProductImageScreen';
import AuctionDetailsScreen from '../screens/SellerOnBoarding/AuctionDetailsScreen';
import SellerDetailsScreen from '../screens/SellerOnBoarding/SellerPaymentsScreen';
import SellerPaymentsScreen from '../screens/SellerOnBoarding/SellerPaymentsScreen';
import SellerAddressScreen from '../screens/SellerOnBoarding/SellerAddressScreen';
import StartAuctionScreen from '../screens/SellerOnBoarding/StartAuction';
import { BottomDrawer } from '../components/Drawer/BottomDrawer';
import UpdatesScreen from '../screens/Updates/Updates';
import { showDrawer } from '../redux/actions/drawer';

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

    const handleTouch = () => {
        dispatch(
            showDrawer({
                isVisible: true,
                navigateTo: 'StartAuction',
            }),
        );
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
                        options={({ route }) => ({
                            tabBarIcon: ({ focused, color }) => (
                                <ShotsIcon
                                    height={45}
                                    focused={focused}
                                    style={{ color: color }}
                                />
                            ),
                            // header: () => (
                            //     <HeaderWithLocationAndSearch
                            //         navigation={navigation}
                            //     />
                            // ),
                            tabBarStyle: {
                                display: 'none',
                                height: 0,
                                paddingTop: 0,
                                borderTopWidth: 0,
                            },
                        })}
                        name="Marketplace"
                        component={ShotClassScreen}
                    />
                    <Tab.Screen
                        options={({ navigation, route }) => ({
                            tabBarIcon: ({ focused, color }) => (
                                <PlusCircle
                                    height={35}
                                    focused={focused}
                                    style={{ color: color }}
                                />
                            ),
                            header: () => (
                                <HeaderWithTitle
                                    navigation={navigation}
                                    title="Guidelines"
                                />
                            ),
                            tabBarStyle: {
                                display: 'none',
                                height: 0,
                                paddingTop: 0,
                                borderTopWidth: 0,
                            },
                        })}
                        name="Create"
                        listeners={{
                            tabPress: e => {
                                e.preventDefault();
                                handleTouch();
                            },
                        }}
                        component={GuidelinesScreen}
                    />
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ focused, color }) => (
                                <UpdatesIcon
                                    height={35}
                                    focused={focused}
                                    style={{ color: color }}
                                />
                            ),
                            header: () => (
                                <HeaderWithTitle
                                    navigation={navigation}
                                    title="Updates"
                                />
                            ),
                        }}
                        name="Updates"
                        component={UpdatesScreen}
                    />
                    {/* <Tab.Screen
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
                    /> */}

                    <Tab.Screen
                        options={({ route }) => ({
                            tabBarIcon: ({ focused, color }) => (
                                <UserIcon
                                    height={45}
                                    focused={focused}
                                    style={{ color: color }}
                                />
                            ),
                            header: () => (
                                <HeaderWithCart navigation={navigation} />
                            ),
                            // tabBarStyle: {
                            //     display: 'none',
                            //     height: 0,
                            //     paddingTop: 0,
                            //     borderTopWidth: 0,
                            // },
                        })}
                        name="Profile"
                        component={ProfileScreen}
                    />

                    {/* <TouchableOpacity
                    style={styles.userButton}
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>
                    <UserIcon height="35" width="35" />
                </TouchableOpacity> */}

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
