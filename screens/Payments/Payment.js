global.Buffer = require('buffer').Buffer;
import uuid from 'react-native-uuid';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    AppState,
    Image,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import { colors } from '../../styles/colors';
import { checkPaymentStatus } from '../../redux/services/paymentService';
import {
    PAYMENT_CODES,
    PAYMENT_INITIALIZATION_CODES,
    paymentMethods,
} from '../../redux/constants/paymentConstants';
import { useIsFocused } from '@react-navigation/native';
import { Button_ } from '../../components/Buttons/Button';
import { dimensions, fonts } from '../../styles';
import PaymentCallBackScreen from './PaymentCallBack';
import RadioButton from '../../components/Buttons/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { resetCartActions } from '../../redux/actions/cartActions';
import {
    createOrderAndInitiateCOD,
    createOrderAndInitiatePayment,
} from '../../redux/services/orderService';
import {
    DialogTypes,
    applicablePaymentMethodsForRestaurants,
    generateUUID,
    getRandomInt,
} from '../../utils';
import { getUserProfile } from '../../redux/actions/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';
import { showDialog } from '../../redux/actions/dialog';
import RemoteConfigService from '../../redux/services/remoteConfigService';

const PaymentsScreen = props => {
    const { navigation, route } = props;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [merchantTransactionId, setMerchantTransactionId] = useState(
        route.params && route.params.merchantTransactionId
            ? route.params.merchantTransactionId
            : generateUUID(35),
    );
    const [transactionStatus, setTransactionStatus] = useState();
    const [paymentInitiationTime, setPaymentInitiationTime] = useState();
    const [paymentInitiated, setPaymentInitiated] = useState(false);

    const cart = useSelector(state => state.cartActions);
    const applicablePaymentMethods = JSON.parse(
        RemoteConfigService.getRemoteValue(
            'applicablePaymentMethods',
        ).asString(),
    );
    const availablePaymentMethod = Object.keys(
        applicablePaymentMethods,
    ).includes(cart?.address?.countryCode)
        ? applicablePaymentMethods[cart?.address?.countryCode]
        : ['OTHERS', 'COD'];

    const [paymentMethod, setPaymentMethod] = useState(
        availablePaymentMethod?.length > 0
            ? availablePaymentMethod[0]
            : paymentMethods.OTHERS,
    );
    const appState = useRef(AppState.currentState);
    const isFocused = useIsFocused();
    let intervalId;
    let timeoutId;

    const handleTransactionInitialization = transactionCode => {
        setTransactionStatus(transactionCode);

        switch (transactionCode) {
            case PAYMENT_INITIALIZATION_CODES.PAYMENT_INITIATED: {
                // dispatch(resetCartActions());
                setPaymentInitiationTime(new Date());
                // Start the timer
                // startTimer();
                startInterval();
                break;
            }
            case PAYMENT_INITIALIZATION_CODES.PAYMENT_ERROR: {
                break;
            }
            case PAYMENT_INITIALIZATION_CODES.INTERNAL_SERVER_ERROR: {
                break;
            }
            case PAYMENT_INITIALIZATION_CODES.BAD_REQUEST: {
                break;
            }
            case PAYMENT_INITIALIZATION_CODES.AUTHORIZATION_FAILED: {
                break;
            }
            default: {
                // console.log('default');
                return;
            }
        }
    };

    const handleTransactionCompletion = transactionCode => {
        setTransactionStatus(transactionCode);
        setIsLoading(false);
        switch (transactionCode) {
            case PAYMENT_CODES.BAD_REQUEST: {
                break;
            }
            case PAYMENT_CODES.AUTHORIZATION_FAILED: {
                break;
            }
            case PAYMENT_CODES.INTERNAL_SERVER_ERROR: {
                break;
            }
            case PAYMENT_CODES.PAYMENT_SUCCESS: {
                dispatch(getUserProfile());
                clearTimeout(timeoutId);
                clearInterval(intervalId);
                break;
            }
            case PAYMENT_CODES.PAYMENT_ERROR: {
                break;
            }
            case PAYMENT_CODES.INTERNAL_SERVER_ERROR: {
                break;
            }
            case PAYMENT_CODES.BAD_REQUEST: {
                break;
            }
            case PAYMENT_CODES.AUTHORIZATION_FAILED: {
                break;
            }
            default: {
                // console.log('default');

                return;
            }
        }
    };

    const getContext = async redirectUrl => {
        const data = {
            cart,
            paymentMethod,
            merchantTransactionId: merchantTransactionId,
            amount: cart?.billingDetails?.totalAmount * 100,
            redirectUrl: redirectUrl,
            mobileNumber: cart?.address?.mobNo,
        };
        const response = await createOrderAndInitiatePayment(data);
        const responseData = response?.data;
        const redirectLink =
            responseData?.data?.data?.instrumentResponse?.redirectInfo?.url;
        if (responseData && redirectLink) {
            setTransactionStatus(responseData?.data?.code);
            handleTransactionInitialization(responseData?.data?.code);
            setIsLoading(false);
            // setWebViewUrl(redirectLink);
            // setPaymentInitiated(true);

            // console.log('redirectLink', redirectLink);
            const response = Linking.openURL(redirectLink);
        } else {
            setMerchantTransactionId(generateUUID(35));
            setIsLoading(false);
        }
    };

    const openPaymentGateway = async () => {
        if (cart?.billingDetails?.totalAmount === 0) {
            placeOrderWithCOD();
        } else {
            setIsLoading(true);
            createLink(merchantTransactionId);
        }
    };

    const placeOrderWithCOD = async () => {
        setIsLoading(true);
        const data = {
            cart,
            paymentMethod,
            merchantTransactionId: merchantTransactionId,
            amount: 100,
            mobileNumber: '9558040400',
        };

        const response = await createOrderAndInitiateCOD(data);
        if (response && response.data) {
            dispatch(resetCartActions());
            dispatch(getUserProfile());
            setIsLoading(false);
            navigation.navigate('OrderPlaced', {
                timeToDeliver: `${getRandomInt(30, 60)} mins`,
            });
        } else {
            setMerchantTransactionId(generateUUID(35));
            setIsLoading(false);
        }
    };

    const createLink = async merchantTransactionId_ => {
        if (merchantTransactionId_) {
            const paymentRedirectLink = RemoteConfigService.getRemoteValue(
                'PaymentRedirectLink',
            ).asString();
            const redirectUrl = String(paymentRedirectLink);
            getContext(redirectUrl);
        }
    };

    const getPaymentStatus = async () => {
        if (merchantTransactionId) {
            setIsLoading(true);
            const response = await checkPaymentStatus(merchantTransactionId);
            handleTransactionCompletion(response?.data?.data?.code);
        }
    };

    const onChangePaymentMethod = method => {
        if (cart?.restaurants) {
            const isPaymentApplicable = applicablePaymentMethodsForRestaurants(
                cart.restaurants,
                method,
            );
            if (cart?.billingDetails?.totalAmount === 0) {
                setPaymentMethod(method);
                return;
            } else if (!isPaymentApplicable) {
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Try different payment method!',
                        subTitleText:
                            'This payment method is not applicable on selected Restaurant',
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                );
                return;
            }
        }
        if (
            cart?.coupon &&
            !cart?.coupon?.bagConstraints?.applicablePaymentMethods.includes(
                method,
            )
        ) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Try different payment method!',
                    subTitleText:
                        'Applied Coupon is not applicable on this payment method.',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (method === 'COD' && cart?.isWalletMoneyUsed) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Cash on delivery not applicable!',
                    subTitleText:
                        'Cash on delivery is not applicable on orders with Furos applied. Please try Pay using wallet/card.',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            setPaymentMethod(method);
        }
    };

    const startInterval = () => {
        // Initial delay of 20 seconds before the first API call
        timeoutId = setTimeout(() => {
            // console.log('Calling check status API 20 sec');
            getPaymentStatus();

            // API calls every 3 seconds for the next 30 seconds
            intervalId = setInterval(() => {
                // console.log('Calling check status API 3 sec for 30 sec');
                getPaymentStatus();
            }, 3000);

            // Stop the interval after 30 seconds and start a new interval
            setTimeout(() => {
                clearInterval(intervalId);

                // API calls every 6 seconds for the next 1 minute
                intervalId = setInterval(() => {
                    // console.log('Calling check status API 6 sec every 60 sec');
                    getPaymentStatus();
                }, 6000);

                setTimeout(() => {
                    clearInterval(intervalId);

                    // API calls every 10 seconds for the next 1 minute
                    intervalId = setInterval(() => {
                        // console.log(
                        //     'Calling check status API 10 sec every 60 sec',
                        // );
                        getPaymentStatus();
                    }, 10000);

                    // Stop the interval after 1 minute and start a new interval
                    setTimeout(() => {
                        clearInterval(intervalId);

                        // API calls every 30 seconds for the next 12 minutes
                        intervalId = setInterval(() => {
                            // console.log(
                            //     'Calling check status API 30 sec every 60 sec',
                            // );
                            getPaymentStatus();
                        }, 30000);

                        setTimeout(() => {
                            clearInterval(intervalId);

                            // API calls every 60 seconds for the next 12 minutes
                            intervalId = setInterval(() => {
                                // console.log(
                                //     'Calling check status API 60 sec every 12 min',
                                // );
                                getPaymentStatus();
                            }, 60000);

                            // Stop the interval after 12 minutes
                            setTimeout(() => {
                                clearInterval(intervalId);
                            }, 120000);
                        }, 60000);
                    }, 60000);
                }, 60000);
            }, 30000);
        }, 20000);
    };

    useEffect(() => {
        return () => {
            // Clean up timers when component unmounts
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            nextAppState => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active' &&
                    isFocused
                ) {
                    getPaymentStatus();
                }

                appState.current = nextAppState;
            },
        );

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        if (transactionStatus === PAYMENT_CODES.PAYMENT_SUCCESS) {
            const timer = setTimeout(() => {
                dispatch(resetCartActions());
                navigation.navigate('OrderPlaced', {
                    timeToDeliver: `${getRandomInt(30, 60)} mins`,
                });
            }, 2000);
            return () => clearTimeout(timer);
        } else if (
            transactionStatus &&
            PAYMENT_CODES[transactionStatus] &&
            transactionStatus != PAYMENT_CODES.PAYMENT_PENDING
        ) {
            const timer = setTimeout(() => {
                // dispatch(resetCartActions());
                navigation.navigate('Cart');
            }, 5);
            return () => clearTimeout(timer);
        }
    }, [transactionStatus]);

    useEffect(() => {
        if (route?.params?.merchantTransactionId) {
            getPaymentStatus();
        }
    }, [navigation]);

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            {!isLoading && !paymentInitiated && (
                <View style={styles.paymentMethodsContainer}>
                    {!transactionStatus ? (
                        <View style={styles.paymentContainer}>
                            <View style={{ margin: 10 }}>
                                <Text style={styles.titleText}>
                                    Preferred Payment Method
                                </Text>
                                <View style={styles.innerContainer}>
                                    {availablePaymentMethod?.includes(
                                        'OTHERS',
                                    ) && (
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                onChangePaymentMethod(
                                                    paymentMethods.OTHERS,
                                                );
                                            }}>
                                            <View
                                                style={[
                                                    styles.paymentMode,
                                                    {
                                                        borderBottomWidth:
                                                            availablePaymentMethod?.includes(
                                                                'COD',
                                                            )
                                                                ? 1
                                                                : 0,
                                                    },
                                                ]}>
                                                <View
                                                    style={
                                                        styles.leftContainer
                                                    }>
                                                    <Image
                                                        source={require('../../assets/icons/onlinePay.png')}
                                                        style={styles.iconImage}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.subtitleText
                                                        }>
                                                        Pay using wallet / card
                                                    </Text>
                                                </View>
                                                <View
                                                    style={
                                                        styles.rightContainer
                                                    }>
                                                    {paymentMethod && (
                                                        <RadioButton
                                                            isActive={
                                                                paymentMethod ==
                                                                paymentMethods.OTHERS
                                                            }
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                    {availablePaymentMethod?.includes(
                                        'COD',
                                    ) && (
                                        <TouchableWithoutFeedback
                                            onPress={() => {
                                                onChangePaymentMethod(
                                                    paymentMethods.COD,
                                                );
                                            }}>
                                            <View style={styles.paymentMode}>
                                                <View
                                                    style={
                                                        styles.leftContainer
                                                    }>
                                                    <Image
                                                        source={require('../../assets/icons/COD.png')}
                                                        style={styles.iconImage}
                                                    />
                                                    <Text
                                                        style={
                                                            styles.subtitleText
                                                        }>
                                                        Cash On Delivery
                                                    </Text>
                                                </View>
                                                <View
                                                    style={
                                                        styles.rightContainer
                                                    }>
                                                    {paymentMethod && (
                                                        <RadioButton
                                                            isActive={
                                                                paymentMethod ==
                                                                paymentMethods.COD
                                                            }
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.buttonContainer,
                                    {
                                        ...Platform.select({
                                            ios: {
                                                height: 120,
                                                bottom:
                                                    insets.bottom + insets.top,
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
                                {paymentMethod == paymentMethods.COD ? (
                                    <Button_
                                        text={'Place Order'}
                                        onClick={placeOrderWithCOD}
                                    />
                                ) : (
                                    <Button_
                                        text={'Proceed To Payment'}
                                        onClick={openPaymentGateway}
                                    />
                                )}
                            </View>
                        </View>
                    ) : (
                        <View>
                            <PaymentCallBackScreen
                                transactionCode={transactionStatus}
                                navigation={navigation}
                            />
                        </View>
                    )}
                </View>
            )}
            {isLoading && !paymentInitiated && (
                <ActivityIndicator color={colors.ORANGE} size={32} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: dimensions.fullHeight,
    },
    paymentMethodsContainer: {
        width: dimensions.fullWidth,
        flex: 1,
    },
    paymentContainer: {
        padding: 10,
        marginVertical: 10,
        flex: 1,
    },
    paymentButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ORANGE,
        padding: 10,
        margin: 20,
    },
    innerContainer: {
        // margin: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 20,
    },
    paymentMode: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingVertical: 20,
        borderBottomColor: colors.GREY_BORDER,
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightContainer: {},
    titleText: {
        color: colors.BLACK,
        ...fonts.NUNITO_600_16,
    },
    subtitleText: {
        marginHorizontal: 10,
        color: colors.GREY_MEDIUM,
        ...fonts.NUNITO_600_16,
    },
    iconImage: {
        height: 40,
        width: 40,
    },
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
});

export default PaymentsScreen;
