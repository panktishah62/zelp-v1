import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    AppState,
    ActivityIndicator,
} from 'react-native';
import PlanDetailsHeading from '../../components/Heading/Subscription/PlanDetailsHeading';
import PromoCodesAndOffers from '../../components/Cards/Subscription/PromoCodesAndOffers';
import PreferedPayment from '../../components/Cards/Subscription/PreferedPayment';
import OrderSummary from '../../components/Cards/Subscription/OrderSummary';
import BlockImage from '../../components/Block/Subscription/BlockImage';
import { colors } from '../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
    PAYMENT_CODES,
    PAYMENT_INITIALIZATION_CODES,
} from '../../redux/constants/paymentConstants';
import { useIsFocused } from '@react-navigation/native';
import { subscribeToAPlan } from '../../redux/services/subscriptionService';
import { getUserProfile } from '../../redux/actions/user';
import { checkPaymentStatus } from '../../redux/services/paymentService';
import PaymentCallBackScreen from '../Payments/PaymentCallBack';
import { generateUUID } from '../../utils';
import remoteConfig from '@react-native-firebase/remote-config';
import { Linking } from 'react-native';
import { dimensions } from '../../styles';
import { removeSubscriptionCoupon } from '../../redux/actions/subscriptionCoupon';
import { calculateTotal } from '../../redux/services/subscriptionCartCalculations';
import {
    resetSubscriptionPlan,
    selectSubscriptionPlan,
} from '../../redux/actions/subscriptionActions';
import RemoteConfigService from '../../redux/services/remoteConfigService';

const SubscriptionPayment = props => {
    const { navigation, route } = props;
    const data = props?.data;
    const appliedSubscriptionCoupon = useSelector(
        state => state.subscriptionCouponReducer.coupon,
    );
    const { config, selectedSubscription } = useSelector(
        state => state.subscriptionDetails,
    );

    useEffect(() => {
        const resultData = calculateTotal(
            selectedSubscription?.subscriptionPlan,
            selectedSubscription?.numOfMealsSelected,
            config,
            appliedSubscriptionCoupon,
        );
        dispatch(selectSubscriptionPlan(resultData));
    }, [appliedSubscriptionCoupon]);

    const name = route.params.name;
    const handleNavigation = () => {
        navigation.navigate('PaymentSuccessfull', {
            data: selectedSubscription,
        });
        dispatch(resetSubscriptionPlan());
    };

    const [isLoading, setIsLoading] = useState(false);
    const [merchantTransactionId, setMerchantTransactionId] = useState(
        generateUUID(35),
    );
    const [transactionStatus, setTransactionStatus] = useState();
    const [paymentInitiated, setPaymentInitiated] = useState(false);
    const appState = useRef(AppState.currentState);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    let intervalId;
    let timeoutId;

    const handleTransactionInitialization = transactionCode => {
        setTransactionStatus(transactionCode);

        switch (transactionCode) {
            case PAYMENT_INITIALIZATION_CODES.PAYMENT_INITIATED: {
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
                return;
            }
        }
    };

    const getContext = async redirectUrl => {
        const data = {
            selectedSubscription,
            // amount: selectedSubscription?.totalAmount * 100,
            amount: 100,
            redirectUrl: redirectUrl,
            merchantTransactionId,
            // appliedCoupon: selectedSubscription?.appliedCoupon,
        };
        const response = await subscribeToAPlan(
            selectedSubscription?.subscriptionPlan?._id,
            data,
        );
        const responseData = response?.data;
        const redirectLink =
            responseData?.data?.data?.instrumentResponse?.redirectInfo?.url;
        if (responseData && redirectLink) {
            setTransactionStatus(responseData?.data?.code);
            handleTransactionInitialization(responseData?.data?.code);
            setIsLoading(false);
            const response = Linking.openURL(redirectLink);
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

    const openPaymentGateway = async () => {
        if (selectedSubscription?.totalAmount > 0) {
            setIsLoading(true);
            createLink(merchantTransactionId);
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
                handleNavigation();
            }, 2000);
            return () => clearTimeout(timer);
        } else if (
            transactionStatus &&
            PAYMENT_CODES[transactionStatus] &&
            transactionStatus != PAYMENT_CODES.PAYMENT_PENDING
        ) {
            const timer = setTimeout(() => {}, 5);
            return () => clearTimeout(timer);
        }
    }, [transactionStatus]);

    useEffect(() => {
        if (route?.params?.merchantTransactionId) {
            getPaymentStatus();
        }
    }, [navigation]);

    useEffect(() => {
        dispatch(removeSubscriptionCoupon());
    }, []);

    return (
        <View>
            {!isLoading && !paymentInitiated && (
                <View style={styles.container}>
                    {!transactionStatus &&
                    selectedSubscription?.numOfMealsSelected ? (
                        <ScrollView>
                            {selectedSubscription && (
                                <PlanDetailsHeading
                                    name={name}
                                    navigation={navigation}
                                    data={selectedSubscription}
                                />
                            )}
                            <BlockImage />
                            <PromoCodesAndOffers
                                promoCode={
                                    appliedSubscriptionCoupon?.code
                                        ? appliedSubscriptionCoupon.code
                                        : ''
                                }
                                offer={
                                    appliedSubscriptionCoupon?.discount
                                        ? `${
                                              appliedSubscriptionCoupon
                                                  ?.discount?.value
                                          }${
                                              appliedSubscriptionCoupon
                                                  ?.discount?.type ===
                                              'percentage'
                                                  ? '%'
                                                  : '/-'
                                          }`
                                        : ''
                                }
                                navigation={navigation}
                                data={selectedSubscription}
                            />
                            <PreferedPayment />
                            <OrderSummary
                                navigation={navigation}
                                data={selectedSubscription}
                                handleNavigation={handleNavigation}
                                openPaymentGateway={openPaymentGateway}
                            />
                        </ScrollView>
                    ) : (
                        <View style={styles.paymentCallBackScreen}>
                            <PaymentCallBackScreen
                                transactionCode={transactionStatus}
                                navigation={navigation}
                            />
                        </View>
                    )}
                    {isLoading && !paymentInitiated && (
                        <ActivityIndicator color={colors.ORANGE} size={32} />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
    paymentCallBackScreen: {
        height: dimensions.fullHeight,
    },
});

export default SubscriptionPayment;
