import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import OrderCardComponent from '../../components/Cards/Orders/OrderCardComponent';
import OrderDetailsCard from '../../components/Cards/Orders/OrderDetailsCard';
import { BASE_URL } from '../../redux/constants';
import { dimensions } from '../../styles';
import { colors } from '../../styles/colors';
import { showDialogBox } from '../../utils';
import BillDetails from '../../components/Cards/Orders/BillDetails';
import { useSelector } from 'react-redux';

const OrderDetailsScreen = ({ route, navigation }) => {
    const [payment, setPayment] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const cart = useSelector(state => state.cartActions);

    const { order, config } = route.params;
    const getPaymentDetails = () => {
        fetch(`${BASE_URL}/payments/getPaymentDetails/${order._id}`)
            .then(response => response.json())
            .then(data => {
                setPayment(data.payment);
                setIsLoading(false);
            })
            .catch(error =>
                showDialogBox('', error.message, 'warning', 'OK', true),
            );
    };

    useEffect(() => {
        setIsLoading(true);
        getPaymentDetails();
    }, []);
    return (
        <ScrollView style={styles.container}>
            <OrderCardComponent
                order={order}
                navigation={navigation}
                isOrderDetail={true}
            />
            <BillDetails cart={order.cart} config={cart.config} />
            {!isLoading && (
                <OrderDetailsCard
                    order={order}
                    payment={payment}
                    navigation={navigation}
                />
            )}
            {isLoading && (
                <View>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
});

export default OrderDetailsScreen;
