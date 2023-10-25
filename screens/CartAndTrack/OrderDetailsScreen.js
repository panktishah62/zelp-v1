/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OrangeHeaderWithTitle from '../../components/Header/OrangeHeaderWithTitle';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import LocationCard from './LocationCard';
import OrderItemDetailsCard from './OrderItemDetailsCard';
import PaymentSummary from './PaymentSummary';
import RectangularFullscreenBtn from '../../components/Buttons/RectangularFullscreenBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrderDetails } from '../../redux/services/orderService';
import { getPaymentDetailsForUser } from '../../redux/services/paymentService';
import { ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const NewOrderDetailsScreen = ({ route, navigation }) => {
    const [order, setOrder] = useState({});
    const [isLoadingOrder, setIsLoadingOrder] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <OrangeHeaderWithTitle
                    navigation={navigation}
                    onClick={() => {
                        navigation.goBack();
                    }}
                    title={'Order Details'}
                />
            ),
        });
    }, [navigation]);

    const orderDetails = route.params.orderDetails.currentOrder;
    // console.log('ORDER DETAILS', JSON.stringify(orderDetails, null, 4));

    const getOrderDetails_ = async orderId => {
        await AsyncStorage.getItem('token').then(async authToken => {
            if (authToken) {
                return await getOrderDetails({ orderId })
                    .then(response => response?.data)
                    .then(data => {
                        if (data && data.order) {
                            setOrder(data.order);
                            setIsLoadingOrder(false);
                        }
                    })
                    .catch(error => {
                        throw new Error(error);
                    });
            }
        });
    };

    useEffect(() => {
        getOrderDetails_(orderDetails._id);
    }, [orderDetails]);

    const pressHandler = () => {
        console.log('going to track order');
        navigation.navigate('TrackOrder');
    };

    return !isLoadingOrder ? (
        <View style={styles.wrapper}>
            <ScrollView>
                <View style={styles.container}>
                    {/* <View style={styles.orderId}>
                    <Text
                        style={{
                            color: '#3D3D3D',
                            fontSize: normalizeFont(20),
                            fontFamily: fonts.NUNITO_700_24.fontFamily,
                            fontWeight: 'bold',
                        }}>
                        Order Id:
                    </Text>
                    <Text
                        style={{
                            color: colors.ORANGE,
                            fontSize: normalizeFont(20),
                            fontFamily: fonts.NUNITO_700_24.fontFamily,
                        }}>
                        {orderDetails._id}
                    </Text>
                </View> */}
                    <LocationCard address={orderDetails.cart.address} />
                    <Text
                        style={{
                            color: '#3D3D3D',
                            fontSize: normalizeFont(20),
                            fontFamily: fonts.NUNITO_700_24.fontFamily,
                            fontWeight: 'bold',
                            marginBottom: dynamicSize(20),
                        }}>
                        Bill Details:
                    </Text>
                    <OrderItemDetailsCard itemsDetails={order.cart.foodItems} />
                    <PaymentSummary
                        orderValue={orderDetails?.cart?.totalItemsPrice}
                        deliveryCharges={
                            orderDetails?.cart?.deliveryPartnerFees
                        }
                        taxes={orderDetails?.cart?.taxes}
                        packagingCharges={orderDetails?.cart?.packagingCharges}
                        totalAmount={orderDetails?.cart?.totalAmount}
                        paymentMode={orderDetails?.paymentMode}
                    />
                    <RectangularFullscreenBtn
                        title="TRACK ORDER"
                        pressHandler={pressHandler}
                    />
                </View>
            </ScrollView>
        </View>
    ) : (
        <View style={styles.loadingSpinner}>
            <ActivityIndicator color={colors.ORANGE} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
        backgroundColor: colors.ORANGE,
    },
    container: {
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
        backgroundColor: '#EEE',
        borderTopLeftRadius: dynamicSize(25),
        borderTopRightRadius: dynamicSize(25),
        padding: dynamicSize(20),
    },
    orderId: {
        display: 'flex',
        flexDirection: 'row',
        gap: dynamicSize(4),
        marginBottom: dynamicSize(20),
    },
    loadingSpinner: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NewOrderDetailsScreen;
