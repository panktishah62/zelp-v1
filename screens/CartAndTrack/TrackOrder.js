/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
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
// import OrderItemCard from './OrderItemCard';
import DeliveryBoyCard from './DeliveryBoyCard';

const TRACKING_URL =
    'https://porter.in/track_live_order?booking_id=CRN1807306740&customer_uuid=d65fe75e-64f5-4ccb-b6f9-b6f59a96227b';

const TrackOrderScreen = ({ route, navigation }) => {
    const { timeToDeliver } = route.params ? route.params : {};
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const currentOrder = useSelector(state => state.currentOrder);

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                // <HeaderWithTitle
                //     navigation={navigation}
                //     title={'Track Order'}
                // onClick={() => {
                //     navigation.navigate('Home');
                // }}
                // />
                <TransparentHeader
                    navigation={navigation}
                    onClick={() => {
                        navigation.navigate('Home');
                    }}
                />
            ),
        });
        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
            navigation.navigate('Home');
        });
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

    useEffect(() => setIsLoading(true), []);
    const onLoadFinish = () => setIsLoading(false);

    return (
        <View>
            {!isLoading && (
                <View style={styles.mapContainer}>
                    <LiveTrackingMap trackingUrl={TRACKING_URL} />
                </View>
            )}
            {!isLoading && (
                <View style={styles.container}>
                    <EstimatedDeliveryCard
                        timeToDeliver={20}
                        orderStatus={currentOrder.currentOrder.orderStatus}
                    />
                    <View style={styles.detailsContainer}>
                        <LocationCard />
                        <DeliveryBoyCard />
                        {/* <Text style={styles.yourOrdersText}>Your Orders</Text>
                        {orderedItems.map(item => (
                            <OrderItemCard key={item.itemName} item={item} />
                        ))} */}
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
                    {isLoading && (
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
        marginTop: 300,
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
});

export default TrackOrderScreen;
