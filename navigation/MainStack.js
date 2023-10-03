import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import HeaderWithLocation from '../components/Header/HeaderWithLocation';
import AppTourScreen from '../screens/AppTour/AppTourScreen';
import LoginScreen from '../screens/OnBoarding/Login';
import SignUpScreen from '../screens/OnBoarding/Signup';
import OTPVerificationScreen from '../screens/OnBoarding/OTPVerification';
import HeaderWithButtons from '../components/Header/HeaderWithButtons';
import BottomTabNavigationFroker from './BottomTabNavigationFroker';
import FrokerSplashScreen from '../screens/Froker/FrokerSplash';
import FavouritesScreen from '../screens/User/Favourites';
import HeaderWithTitle from '../components/Header/HeaderWithTitle';
import ProfileScreen from '../screens/User/Profile';
import FrokerProfileScreen from '../screens/Froker/FrokerProfile';
import ProfileEditingScreen from '../screens/User/ProfileEditing';
import { View } from 'react-native';
import Addresses from '../screens/User/Address/Addresses';
import AddressEditing from '../screens/User/Address/AddressEditing';
import SelectLocation from '../screens/User/Address/SelectLocation';
import MapScreen from '../screens/User/Address/MapScreen';
import RefundsScreen from '../screens/User/Refunds';
import OrderDetailsScreen from '../screens/Orders/OrderDetails';
import OrdersList from '../screens/Orders/OrdersList';
import WalletScreen from '../screens/User/Wallet/Wallet';
import NotificationsScreen from '../screens/User/Notifications';
import HelpAndSupportScreen from '../screens/User/HelpAndSupport';
import PrivacyPolicyScreen from '../screens/User/PrivacyPolicy';
import VirtualCartScreen from '../screens/CartAndTrack/VirtualCart';
import { SearchStack } from './SearchStack';
import RestaurantWithMenu from '../screens/Restaurants/RestaurantWithMenu';
import HeaderWithSearch from '../components/Header/HeaderWithSearch';
import CategorisedRestaurant from '../screens/Restaurants/CategorisedRestaurants';
import FrokerProfileEditingScreen from '../screens/Froker/FrokerProfileEditing';
import CouponsScreen from '../screens/CartAndTrack/Coupons';
import OrderPlaced from '../screens/CartAndTrack/OrderPlaced';
import TrackOrderScreen from '../screens/CartAndTrack/TrackOrder';
import CartScreen from '../screens/CartAndTrack/PersistedCart';
import { useDispatch } from 'react-redux';
import { getConfig } from '../redux/actions/server';
import PaymentsScreen from '../screens/Payments/Payment';
import RefundOrder from '../screens/Orders/RefundOrders';
import ReferralScreen from '../screens/User/Referral';
import Home from '../screens/SubscriptionModel/Home';
import SubscriptionPage from '../screens/SubscriptionModel/SubscriptionPage';
import PageDetails from '../screens/SubscriptionModel/PageDetails';
import SubscriptionPayment from '../screens/SubscriptionModel/SubscriptionPayment';
import PaymentSuccessfull from '../screens/SubscriptionModel/PaymentSuccessfull';
import SubscriptionHomePage from '../screens/SubscriptionModel/SubscriptionHomePage';
import HeaderWithCart from '../components/Header/HeaderWithCart';
import RestaurantMenuPage from '../screens/SubscriptionModel/RestaurantMenuPage';
import Cart from '../screens/SubscriptionModel/Cart';
import HeaderWithImage from '../components/Header/HeaderWithImage';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getConfig());
    }, []);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="BottomTabNavigation"
                component={BottomTabNavigation}
                options={({ navigation, route }) => ({
                    header: () => <View />,
                })}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={({ navigation, route }) => ({
                    header: () => <View />,
                })}
            />
            <Stack.Screen
                name="LogIn"
                component={LoginScreen}
                options={({ navigation, route }) => ({
                    header: () => <View />,
                })}
            />
            <Stack.Screen
                name="OTPVerification"
                component={OTPVerificationScreen}
                options={({ navigation, route }) => ({
                    header: () => <HeaderWithButtons navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation, route }) => ({
                    header: () => <HeaderWithTitle navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="ProfileEditing"
                component={ProfileEditingScreen}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Profile'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="Address"
                component={Addresses}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Addresses'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="AddressEditing"
                component={AddressEditing}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Address'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="SelectLocation"
                component={SelectLocation}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Payments"
                component={PaymentsScreen}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Payment'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="Refunds"
                component={RefundsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RefundOrder"
                component={RefundOrder}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Refund Order Details'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="OrderDetailsScreen"
                component={OrderDetailsScreen}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'My Orders'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="OrdersList"
                component={OrdersList}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'My Orders'}
                        />
                    ),
                })}
            />
             
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
            />
            <Stack.Screen
                name="Referrals"
                component={ReferralScreen}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Referrals'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="HelpAndSupport"
                component={HelpAndSupportScreen}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithCart
                            navigation={navigation}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
            />
            <Stack.Screen name="VirtualCart" component={VirtualCartScreen} />
            <Stack.Screen
                name="SearchStack"
                component={SearchStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RestaurantWithMenu"
                component={RestaurantWithMenu}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithSearch
                            navigation={navigation}
                            placeholder={'Search Restaurant, FoodItems'}
                            keyboardType={'default'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="CategorisedRestaurant"
                component={CategorisedRestaurant}
            />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="OrderPlaced" component={OrderPlaced} />
            <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
            <Stack.Screen
                name="Coupons"
                component={CouponsScreen}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Coupons'}
                        />
                    ),
                })}
            />
            
            <Stack.Screen
                name="FrokerProfileEditing"
                component={FrokerProfileEditingScreen}
            />
            <Stack.Screen
                name="BottomTabNavigationFroker"
                component={BottomTabNavigationFroker}
            />
            <Stack.Screen
                name="FrokerProfile"
                component={FrokerProfileScreen}
            />
            <Stack.Screen name="FrokerSplash" component={FrokerSplashScreen} />
            <Stack.Screen name="Favourites" component={FavouritesScreen} />

            {/* subscription screen */}
            <Stack.Screen
                name="SubscriptionPage"
                component={SubscriptionPage}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Subscription Home'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="PlanDetails"
                component={PageDetails}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Plan Details'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="SubscriptionPayment"
                component={SubscriptionPayment}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Subscription Payment'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="PaymentSuccessfull"
                component={PaymentSuccessfull}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title={'Payment Successfull'}
                        />
                    ),
                })}
            />
            <Stack.Screen
                name="SubscribedUserHome"
                component={SubscriptionHomePage}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithLocation
                            navigation={navigation}
                            
                        />
                    ),
                })}
            />
             <Stack.Screen
                name="SubscriptionRestaurantMenu"
                component={RestaurantMenuPage}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithImage
                            navigation={navigation}
                            title="Restaurant Menu"
                        />
                    ),
                })}
            />
             <Stack.Screen
                name="SubscriptionCart"
                component={Cart}
                options={({ navigation, route }) => ({
                    header: () => (
                        <HeaderWithTitle
                            navigation={navigation}
                            title="Cart"
                        />
                    ),
                })}
            />
            
        </Stack.Navigator>
    );
};

export default MainStack;
