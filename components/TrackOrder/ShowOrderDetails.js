import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_URL, NETWORK_ERROR } from '../../redux/constants';
import { colors } from '../../styles/colors';
import OrderCardComponent from '../Cards/Orders/OrderCardComponent';
import OrderDetailsCard from '../Cards/Orders/OrderDetailsCard';
import BillDetails from '../Cards/Orders/BillDetails';
// import { ErrorHandler } from '../ErrorHandler/ErrorHandler';

const ShowOrderDetails = props => {
    const { orderId, navigation } = props;
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const isOrderPaid = useSelector(state => state.currentOrder.isOrderPaid);
    const currentOrderError = useSelector(state => state.currentOrder.error);
    const cart = useSelector(state => state.cartActions);
    const [order, setOrder] = useState('');
    const [payment, setPayment] = useState({});
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);

    const getPaymentDetails = orderId => {
        fetch(`${BASE_URL}/payments/getPaymentDetails/${orderId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(NETWORK_ERROR);
                }
                return response.json();
            })
            .then(data => {
                setPayment(data.payment);
                setIsLoadingPayment(false);
            })
            .catch(error => {
                throw new Error(error);
            });
    };

    const getOrderDetails = orderId => {
        const API_URL = `${BASE_URL}/orders/getOrderDetails/${orderId}`;

        AsyncStorage.getItem('token').then(authToken => {
            if (authToken) {
                return fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(NETWORK_ERROR);
                        }
                        return response.json();
                    })
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
        // if (currentOrder && currentOrder._id) {
        //     setIsLoadingOrder(true);
        //     setIsLoadingPayment(true);
        //     getOrderDetails(currentOrder._id);
        //     getPaymentDetails(currentOrder._id);
        // }
        if (orderId) {
            setIsLoadingOrder(true);
            setIsLoadingPayment(true);
            getOrderDetails(orderId);
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
                <OrderCardComponent
                    order={order}
                    canReOrder={false}
                    navigation={navigation}
                />
            )}
            {!isLoadingOrder && (
                <BillDetails
                    cart={order.cart}
                    config={cart.config}
                    isOrderPaid={isOrderPaid}
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

export default ShowOrderDetails;
