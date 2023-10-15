import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../styles/colors';
import OrderCardComponent from '../Cards/Orders/OrderCardComponent';
import OrderDetailsCard from '../Cards/Orders/OrderDetailsCard';
import BillDetails from '../Cards/Orders/BillDetails';
import { getPaymentDetailsForUser } from '../../redux/services/paymentService';
import { getOrderDetails } from '../../redux/services/orderService';
import SubscriptionOrderDetailsCard from '../Cards/Subscription/SubscriptionOrderDetailsCard';
// import { ErrorHandler } from '../ErrorHandler/ErrorHandler';

const ShowSubscriptionOrderDetails = props => {
    const { orderId, navigation } = props;
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const isOrderPaid = useSelector(state => state.currentOrder.isOrderPaid);
    const currentOrderError = useSelector(state => state.currentOrder.error);
    const [order, setOrder] = useState('');
    const [payment, setPayment] = useState({});
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);

    const getPaymentDetails = async orderId => {
        await getPaymentDetailsForUser(orderId)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    setPayment(data.payment);
                    setIsLoadingPayment(false);
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    };

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
        if (orderId) {
            setIsLoadingOrder(true);
            setIsLoadingPayment(true);
            getOrderDetails_(orderId);
            getPaymentDetails(orderId);
        }
    }, [orderId]);

    useEffect(() => {
        if (currentOrderError) {
            throw new Error(currentOrderError);
        }
    }, [currentOrderError]);

    return (
        // <ErrorHandler>
        <View style={styles.container}>
            {!isLoadingOrder && (
                <SubscriptionOrderDetailsCard
                    order={order}
                    navigation={navigation}
                />
            )}
            {!isLoadingOrder && !isLoadingPayment && (
                <OrderDetailsCard
                    order={order}
                    payment={payment}
                    navigation={navigation}
                />
            )}
            {(isLoadingOrder || isLoadingPayment) && (
                <View>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            )}
        </View>
        // </ErrorHandler>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default ShowSubscriptionOrderDetails;
