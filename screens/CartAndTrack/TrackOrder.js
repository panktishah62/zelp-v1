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
import AddressCard from '../../components/TrackOrder/AddressCard';
import OrderStatusComponent from '../../components/TrackOrder/Track';
import TrackOrderContactComponent from '../../components/TrackOrder/TrackOrderContactComponent';
import TrackOrderRatingComponent from '../../components/TrackOrder/TrackOrderRatingComponent';
import ShowOrderDetails from '../../components/TrackOrder/ShowOrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentOrder } from '../../redux/actions/currentOrder';
import { colors } from '../../styles/colors';
import ShowSubscriptionOrderDetails from '../../components/TrackOrder/ShowSubscriptionOrderDetails';

const TrackOrderScreen = ({ route, navigation }) => {
    const { timeToDeliver } = route.params ? route.params : {};
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const currentOrder = useSelector(state => state.currentOrder);
    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderWithTitle
                    navigation={navigation}
                    title={'Track Order'}
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
        <View style={styles.container}>
            {!isLoading && (
                <View style={styles.addressContainer}>
                    <AddressCard navigation={navigation} />
                </View>
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
                    {/* <View style={styles.bottomButtonContainer}>
          <TrackOrderRatingComponent />
        </View> */}
                    <View>
                        {!currentOrder?.currentOrder?.subscriptionOrder && (
                            <ShowOrderDetails
                                navigation={navigation}
                                orderId={currentOrder?.currentOrder?._id}
                            />
                        )}
                        {currentOrder?.currentOrder?.subscriptionOrder && (
                            <ShowSubscriptionOrderDetails
                                navigation={navigation}
                                orderId={currentOrder?.currentOrder?._id}
                            />
                        )}
                    </View>
                </ScrollView>
            )}
            {isLoading && <ActivityIndicator size={32} color={colors.ORANGE} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    addressContainer: {},
    timerContainer: {},
    imageContainer: {},
    trackingContainer: {},
    customerCareContainer: {},
    bottomButtonContainer: {},
});

export default TrackOrderScreen;
