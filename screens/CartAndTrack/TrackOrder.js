/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import TransparentHeader from '../../components/Header/TransparentHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrder } from '../../redux/actions/currentOrder';
import { colors } from '../../styles/colors';
// import ShowSubscriptionOrderDetails from '../../components/TrackOrder/ShowSubscriptionOrderDetails';
import LiveTrackingMap from './LiveTrackingMap';
import { dimensions, fonts } from '../../styles';
import EstimatedDeliveryCard from './EstimatedDeliveryCard';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import LocationCard from './LocationCard';
import CustomerCareCard from './CustomerCareCard';
import frokerDeliveryPartnerImg from '../../assets/images/froker-delivery-partner.png';
import DeliveryStages from './DeliveryStages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import CancelOrderButton from './CancelOrderButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ORDER_BUFFER_TIME } from '../../redux/constants';
import TrackingNote from './TrackingNote';

const TrackOrderScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const currentOrder = useSelector(state => state.currentOrder);
    const [timeToDeliver, setTimeToDeliver] = useState(
        parseInt(
            currentOrder?.currentOrder?.timeToDeliver?.match(/\d+/)[0],
            10,
        ) * 60,
    );
    const serverData = useSelector(state => state.serverReducer);

    const [tapped, setTapped] = useState(true);
    const animation = useRef(null);
    const isFirstTap = useRef(null);
    useEffect(() => {
        if (isFirstTap.current) {
            isFirstTap.current = false;
        } else {
            animation?.current?.play(0, 81);
        }
    }, [tapped]);

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <TransparentHeader
                    navigation={navigation}
                    onClick={() => {
                        navigation.navigate('NewOrderDetails', {
                            orderDetails: currentOrder,
                        });
                    }}
                    onBack={() => {
                        navigation.navigate('Home');
                    }}
                />
            ),
        });
    }, [navigation, currentOrder]);

    useEffect(() => {
        setIsLoading(true);
        if (
            currentOrder &&
            currentOrder?.currentOrder &&
            currentOrder?.currentOrder?.orderStatus
        ) {
            setIsLoading(false);
        }
    }, [currentOrder]);

    const onRefresh = () => {
        setRefreshing(true);
        // await here has no effect but lets refreshing state change hence causing a re-render, which is needed for timer reset
        dispatch(getCurrentOrder(setRefreshing));
        setTapped(t => !t);
    };

    useEffect(() => {
        onRefresh();
    }, []);

    const parseTimeInSec = () => {
        return (
            parseInt(
                currentOrder?.currentOrder?.timeToDeliver?.match(/\d+/)[0],
                10,
            ) * 60
        );
    };

    useEffect(() => {
        const currentTime = new Date();
        const orderTime = new Date(currentOrder?.currentOrder?.randomTime);
        const timeDiff = currentTime - orderTime;
        const diff = Math.floor(timeDiff / 1000);

        const initialTimeToDeliver =
            parseTimeInSec() - diff > ORDER_BUFFER_TIME * 60
                ? parseTimeInSec()
                : parseTimeInSec() + diff - 25 * 60;

        setTimeToDeliver(initialTimeToDeliver - diff);
    }, [currentOrder]);

    const deliveryStagesMap = {
        Placed: 1,
        'In Progress': 2,
        'Out For Delivery': 3,
        'Driver Reached': 4,
    };

    if (
        currentOrder?.currentOrder?.orderStatus === 'Canceled' ||
        currentOrder?.currentOrder?.orderStatus === 'Completed'
    ) {
        navigation.navigate('Home');
    }

    if (
        !isLoading &&
        !refreshing &&
        !Object.keys(deliveryStagesMap).includes(
            currentOrder?.currentOrder?.orderStatus,
        )
    ) {
        navigation.navigate('SomethingWentWrong');
    }

    const insets = useSafeAreaInsets();

    return (
        <View>
            {!isLoading &&
                (currentOrder?.tracking_url != null ? (
                    <View style={styles.mapContainer}>
                        <LiveTrackingMap
                            trackingUrl={currentOrder?.tracking_url}
                        />
                    </View>
                ) : (
                    <View style={styles.noTrackingContainer}>
                        <Image
                            style={styles.noTrackingImage}
                            source={frokerDeliveryPartnerImg}
                        />
                        <View>
                            <DeliveryStages
                                stage={
                                    currentOrder?.currentOrder?.orderStatus &&
                                    deliveryStagesMap[
                                        currentOrder.currentOrder.orderStatus
                                    ]
                                        ? deliveryStagesMap[
                                              currentOrder.currentOrder
                                                  .orderStatus
                                          ]
                                        : -1
                                }
                            />
                        </View>
                    </View>
                ))}
            {!isLoading && (
                <View style={styles.container}>
                    <EstimatedDeliveryCard
                        timeToDeliver={timeToDeliver}
                        orderStatus={currentOrder?.currentOrder?.orderStatus}
                        initialTimeToDeliver={
                            parseInt(
                                currentOrder?.currentOrder?.timeToDeliver?.match(
                                    /\d+/,
                                )[0],
                                10,
                            ) * 60
                        }
                        refreshing={refreshing}
                    />
                    <View style={styles.detailsContainer}>
                        <LocationCard
                            address={
                                currentOrder?.currentOrder?.cart?.addressObj
                            }
                        />
                        <CustomerCareCard
                            number={serverData?.config?.contactNo}
                            order={currentOrder?.currentOrder}
                        />
                        {currentOrder?.tracking_url != null && <TrackingNote />}
                    </View>
                </View>
            )}

            {isLoading && (
                <View style={styles.loadingSpinner}>
                    <ActivityIndicator size={32} color={colors.ORANGE} />
                </View>
            )}

            <View
                style={[
                    styles.refreshButton,
                    { marginTop: dynamicSize(50) + insets.top },
                ]}>
                <TouchableOpacity onPress={onRefresh} activeOpacity={1}>
                    <LottieView
                        source={require('../../assets/animations/spinning-refresh-button.json')}
                        style={{ width: 30, height: 30 }}
                        autoPlay={false}
                        loop={false}
                        ref={animation}
                    />
                </TouchableOpacity>
            </View>

            {currentOrder?.currentOrder?.orderStatus === 'Placed' && (
                <CancelOrderButton
                    orderTime={currentOrder?.currentOrder?.updatedAt}
                    orderId={currentOrder?.currentOrder?._id}
                    timeToCancel={60}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: dimensions.fullHeight,
        zIndex: 1,
        marginTop: dynamicSize(415),
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.ORANGE,
        borderTopRightRadius: dynamicSize(20),
        borderTopLeftRadius: dynamicSize(20),
        paddingTop: dynamicSize(10),
    },
    addressContainer: {},
    timerContainer: {},
    imageContainer: {},
    trackingContainer: {},
    customerCareContainer: {},
    bottomButtonContainer: {},
    mapContainer: {
        position: 'absolute',
        top: dynamicSize(-62),
        left: 0,
        width: '100%',
        height: '70%',
    },
    detailsContainer: {
        backgroundColor: '#EEEEEE',
        width: dimensions.fullWidth,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        borderTopRightRadius: dynamicSize(20),
        borderTopLeftRadius: dynamicSize(20),
        padding: dynamicSize(20),
        marginTop: dynamicSize(10),
    },
    yourOrdersText: {
        color: colors.BLACK,
        fontSize: normalizeFont(22),
        marginVertical: dynamicSize(10),
        width: '100%',
        fontWeight: 'bold',
        fontFamily: fonts.NUNITO_700_24.fontFamily,
    },
    noTrackingContainer: {
        position: 'absolute',
        top: dynamicSize(-64),
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
    },
    noTrackingImage: {
        width: dynamicSize(300),
        height: dynamicSize(300),
        objectFit: 'contain',
        marginTop: dynamicSize(60),
    },
    refreshButton: {
        position: 'absolute',
        right: dynamicSize(16),
        backgroundColor: colors.GREY_LIGHT,
        width: dynamicSize(32),
        height: dynamicSize(32),
        elevation: 2,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        marginTop: dynamicSize(50),
    },
    loadingSpinner: {
        zIndex: 2,
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        backgroundColor: '#EEEEEE',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TrackOrderScreen;
