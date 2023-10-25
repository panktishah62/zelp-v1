/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import TransparentHeader from '../../components/Header/TransparentHeader';
import AddressCard from '../../components/TrackOrder/AddressCard';
import OrderStatusComponent from '../../components/TrackOrder/Track';
import TrackOrderContactComponent from '../../components/TrackOrder/TrackOrderContactComponent';
import TrackOrderRatingComponent from '../../components/TrackOrder/TrackOrderRatingComponent';
import ShowOrderDetails from '../../components/TrackOrder/ShowOrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrder } from '../../redux/actions/currentOrder';
import { colors } from '../../styles/colors';
import LiveTrackingMap from './LiveTrackingMap';
import { dimensions, fonts } from '../../styles';
import EstimatedDeliveryCard from './EstimatedDeliveryCard';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import LocationCard from './LocationCard';
import OrderItemCard from './OrderItemCard';
import DeliveryBoyCard from './DeliveryBoyCard';
import CancelOrderCard from './CancelOrderCard';
import CustomerCareCard from './CustomerCareCard';
import frokerDeliveryPartnerImg from '../../assets/images/froker-delivery-partner.png';
import DeliveryStages from './DeliveryStages';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TRACKING_URL =
    'https://porter.in/track_live_order?booking_id=CRN1807306740&customer_uuid=d65fe75e-64f5-4ccb-b6f9-b6f59a96227b';
// const TRACKING_URL = undefined;

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

    console.log(JSON.stringify(currentOrder, null, 4));

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
                />
            ),
        });
        // navigation.addListener('beforeRemove', e => {
        //     e.preventDefault();
        //     navigation.navigate('Home');
        // });
    }, [navigation]);

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
        // Handle the refresh here
        setRefreshing(true);
        dispatch(getCurrentOrder());
        setRefreshing(false);
    };

    useEffect(() => {
        onRefresh();
    }, []);

    useEffect(() => {
        const initialTimeToDeliver =
            parseInt(
                currentOrder?.currentOrder?.timeToDeliver?.match(/\d+/)[0],
                10,
            ) * 60;
        const orderTime = new Date(currentOrder.currentOrder.createdAt);
        const currentTime = new Date();
        const timeDiff = currentTime - orderTime;
        const diff = Math.floor(timeDiff / 1000);
        setTimeToDeliver(initialTimeToDeliver - diff);
    }, [currentOrder]);

    const deliveryStagesMap = {
        Placed: 1,
        'In Progress': 2,
        'Out For Delivery': 3,
        'Driver Reached': 4,
    };

    return (
        <View>
            {!isLoading &&
                !refreshing &&
                (TRACKING_URL ? (
                    <View style={styles.mapContainer}>
                        <LiveTrackingMap trackingUrl={TRACKING_URL} />
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
                                    currentOrder?.currentOrder?.orderStatus
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
            {!isLoading && !refreshing && (
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
                    />
                    <View style={styles.detailsContainer}>
                        <LocationCard
                            address={currentOrder?.currentOrder?.cart?.address}
                        />
                        {/* <DeliveryBoyCard /> */}
                        <CustomerCareCard number={'8260169650'} />
                        {/* <Text style={styles.yourOrdersText}>Your Orders</Text>
                        {orderedItems.map(item => (
                            <OrderItemCard key={item.itemName} item={item} />
                        ))} */}
                        {/* <CancelOrderCard
                            duration={3000}
                            orderId={currentOrder._id}
                        /> */}
                    </View>

                    <View style={styles.refreshButton}>
                        <TouchableOpacity onPress={onRefresh}>
                            <Text>Refresh</Text>
                        </TouchableOpacity>
                    </View>

                    {/* {!isLoading && (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {
                                    onRefresh();
                                }}
                            />
                        }>
                        <View style={styles.trackingContainer}>
                            <OrderStatusComponent
                                timeToDeliver={
                                    timeToDeliver
                                        ? timeToDeliver
                                        : currentOrder?.timeToDeliver
                                }
                            />
                        </View>
                        <View style={styles.customerCareContainer}>
                            <TrackOrderContactComponent />
                        </View>
                        <View style={styles.bottomButtonContainer}>
                            <TrackOrderRatingComponent />
                        </View>
                        <View>
                            <ShowOrderDetails
                                navigation={navigation}
                                orderId={currentOrder?.currentOrder?._id}
                            />
                        </View>
                    </ScrollView>
                    )} */}
                    {(isLoading || refreshing) && (
                        <ActivityIndicator size={32} color={colors.ORANGE} />
                    )}
                </View>
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
        left: dynamicSize(20),
        top: dynamicSize(-40),
        backgroundColor: colors.ORANGE,
    },
});

export default TrackOrderScreen;
