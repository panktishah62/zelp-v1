import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    AppState,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from '../../components/Cards/PersistedCart.js/AddressCard';
import { Button_ } from '../../components/Buttons/Button';
import WalletMoney from '../../components/Cards/PersistedCart.js/WalletMoney';
import FoodItemsCard from '../../components/Cards/PersistedCart.js/FoodItemsCard';
import PaymentsCard from '../../components/Cards/PersistedCart.js/PaymentsCard';
import BillDetails from '../../components/Cards/PersistedCart.js/BillDetails';
import {
    DialogTypes,
    getCoordinatesFromGoogleMapUrl,
    isTimeInIntervals,
} from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CouponCardForCart from '../../components/Cards/Coupons.js/CouponCardForCart';
import { useIsFocused } from '@react-navigation/native';
import { showDialog } from '../../redux/actions/dialog';
import RefferalCoins from '../../components/Cards/PersistedCart.js/RefferalCoins';
import { getUserProfile } from '../../redux/actions/user';
import RedeemFuro from '../../components/Cards/PersistedCart.js/RedeemFuro';

const CartScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const cart = useSelector(state => state.cartActions);
    const [myCart, setMyCart] = useState(cart);
    const [cartLoading, setCartLoading] = useState(false);
    const [closedRestaurants, setClosedRestaurants] = useState([]);
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderWithTitle
                    navigation={navigation}
                    title={'Place Order'}
                />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if ((!cart || !cart.restaurants) && isFocused) {
            navigation.goBack();
        }
        setMyCart(cart);
        setClosedRestaurants([]);
        for (restaurantId in cart.restaurants) {
            const isRestaurantOpen = isTimeInIntervals(
                cart.restaurants[restaurantId].restaurant.timings,
            );
            if (!isRestaurantOpen) {
                setClosedRestaurants(item => [
                    ...item,
                    cart.restaurants[restaurantId].restaurant.name,
                ]);
            }
        }
    }, [cart]);

    useEffect(() => {
        setCartLoading(true);
        const timeoutId = setTimeout(() => {
            if (cart) {
                setMyCart(cart);
                setCartLoading(false);
            }
        }, 200);
        return () => clearTimeout(timeoutId);
    }, [cart.foodItemsCount]);

    const handlePlaceOrderClick = () => {
        if (cartLoading || !myCart.restaurants) {
            return;
        }
        if (!myCart.address) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Address not found',
                    subTitleText: 'Please Enter Your Address To Place Order',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
            return;
        }
        if (myCart.address) {
            const location = getCoordinatesFromGoogleMapUrl(
                myCart.address.geoLocation,
            );
            if (!location.latitude || !location.longitude) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Location not found!',
                        subTitleText:
                            'Can not track location for selected address, please select other address',
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
                return;
            }
        }
        if (closedRestaurants.length) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please select from other Restaurants',
                    subTitleText: `${closedRestaurants.toString()} are closed!`,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
            return;
        }
        if (currentOrder && currentOrder.cart) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Order in Progress',
                    subTitleText:
                        'Your Order is already in progress, please place a new order after this order delivers',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
            return;
        }
        navigation.navigate('Payments');
    };

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            nextAppState => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    dispatch(getUserProfile(setCartLoading));
                }

                appState.current = nextAppState;
            },
        );

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View>
            {cartLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            ) : (
                <View>
                    <View style={{ height: dimensions.fullHeight }}>
                        <View style={styles.addressContainer}>
                            <AddressCard
                                address={myCart.address}
                                navigation={navigation}
                            />
                        </View>
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.container}>
                                <View style={styles.foodItemsContainer}>
                                    {myCart && myCart.restaurants && (
                                        <FoodItemsCard
                                            restaurants={myCart.restaurants}
                                            navigation={navigation}
                                            currency={myCart?.address?.currency}
                                        />
                                    )}
                                </View>
                                <View>
                                    {cart && (
                                        <View>
                                            <RedeemFuro
                                                isActive={
                                                    myCart.isWalletMoneyUsed
                                                }
                                                setIsLoading={setCartLoading}
                                                moneyInWallet={
                                                    myCart.walletMoney
                                                }
                                                currency={
                                                    myCart?.address?.currency
                                                }
                                                config={myCart.config}
                                                navigation={navigation}
                                            />
                                            {cart?.billingDetails
                                                ?.discountAmount > 0 &&
                                                cart?.coupon && (
                                                    <View>
                                                        <CouponCardForCart
                                                            navigation={
                                                                navigation
                                                            }
                                                            coupon={
                                                                myCart.coupon
                                                            }
                                                        />
                                                    </View>
                                                )}
                                            <RefferalCoins
                                                isActive={
                                                    myCart.isReferralCoinsUsed
                                                }
                                                setIsLoading={setCartLoading}
                                                moneyInReferral={
                                                    myCart.referralCoinsUsed
                                                }
                                                config={myCart.config}
                                                currency={
                                                    myCart?.address?.currency
                                                }
                                            />
                                        </View>
                                    )}
                                </View>
                                {/* <View>
                                    <PaymentsCard />
                                </View> */}
                                {myCart && myCart.billingDetails && (
                                    <View
                                        style={styles.billingDetailsContainer}>
                                        <BillDetails
                                            billingDetails={
                                                myCart.billingDetails
                                            }
                                            config={myCart.config}
                                            currency={myCart?.address?.currency}
                                        />
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                    <View
                        style={[
                            styles.buttonContainer,
                            {
                                ...Platform.select({
                                    ios: {
                                        height: 120,
                                        bottom: insets.bottom + insets.top,
                                        paddingBottom:
                                            insets.bottom + insets.top,
                                        paddingTop: 20,
                                    },
                                    android: {
                                        bottom: 0,
                                        height: 130,
                                        paddingBottom: 50,
                                    },
                                }),
                            },
                        ]}>
                        <Button_
                            text={'Proceed To Payment'}
                            onClick={handlePlaceOrderClick}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
    addressContainer: {
        backgroundColor: colors.WHITE,
    },
    scrollContainer: {
        backgroundColor: colors.WHITE,
        paddingBottom: 200,
        // minHeight: dimensions.fullHeight,
    },
    foodItemsContainer: {},
    billingDetailsContainer: {},
    buttonContainer: {
        // height: dimensions.fullHeight * 0.12,
        position: 'absolute',
        width: dimensions.fullWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    loadingContainer: {
        height: dimensions.fullHeight,
        backgroundColor: colors.WHITE,
    },
});

export default CartScreen;
