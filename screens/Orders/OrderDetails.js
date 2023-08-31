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
import { colors } from '../../styles/colors';
import { DialogTypes } from '../../utils';
import BillDetails from '../../components/Cards/Orders/BillDetails';
import { useDispatch, useSelector } from 'react-redux';
import { showDialog } from '../../redux/actions/dialog';
import { getPaymentDetailsForUser } from '../../redux/services/paymentService';

const OrderDetailsScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [payment, setPayment] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const cart = useSelector(state => state.cartActions);

    const { order, config } = route.params;
    const getPaymentDetails = async () => {
        await getPaymentDetailsForUser(order?._id)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    setPayment(data.payment);
                    setIsLoading(false);
                }
            })
            .catch(error =>
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Something Went Wrong!',
                        subTitleText: error?.message,
                        buttonText1: 'CLOSE',
                        type: DialogTypes.WARNING,
                    }),
                ),
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
