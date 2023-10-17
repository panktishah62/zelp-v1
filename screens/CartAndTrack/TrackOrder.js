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
import { dimensions } from '../../styles';
import EstimatedDeliveryCard from './EstimatedDeliveryCard';
import { dynamicSize } from '../../utils/responsive';
import TimerCircle from './Timer';

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

    return (
        <View>
            {!isLoading && (
                <View style={styles.mapContainer}>
                    <LiveTrackingMap isLoading={isLoading} />
                </View>
            )}
            <View style={styles.container}>
                {!isLoading && (
                    <ScrollView>
                        <EstimatedDeliveryCard
                            timeToDeliver={20}
                            orderStatus={currentOrder.currentOrder.orderStatus}
                        />

                        <AddressCard
                            address={
                                currentOrder.currentOrder.cart.user.address[0]
                            }
                        />
                    </ScrollView>
                )}
                {!isLoading && (
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
                )}
                {isLoading && (
                    <ActivityIndicator size={32} color={colors.ORANGE} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: dimensions.fullHeight, zIndex: 1, marginTop: 170 },
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
        height: '50%',
    },
});

export default TrackOrderScreen;
