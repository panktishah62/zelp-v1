import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { fonts } from '../../../styles';
import { colors } from '../../../styles/colors';

const OrderDetailsCard = props => {
    const { order, payment, navigation } = props;
    return (
        <View>
            <Text style={styles.title}>Order Details</Text>
            <View style={styles.container}>
                {order?.referenceId && (
                    <View style={styles.innerContainer}>
                        <Text style={styles.titleText}>Order Reference Id</Text>
                        <Text style={styles.subtitleText}>
                            {order?.referenceId}
                        </Text>
                    </View>
                )}
                {order._id && (
                    <View style={styles.innerContainer}>
                        <Text style={styles.titleText}>Order Number</Text>
                        <Text style={styles.subtitleText}>{order._id}</Text>
                    </View>
                )}
                {payment && payment.status && (
                    <View style={styles.innerContainer}>
                        <Text style={styles.titleText}>Payment</Text>
                        <Text style={styles.subtitleText}>
                            {payment.status}
                        </Text>
                    </View>
                )}
                {order.user && order.user.mobNo && (
                    <View style={styles.innerContainer}>
                        <Text style={styles.titleText}>Phone</Text>
                        <Text style={styles.subtitleText}>
                            {order.user.mobNo}
                        </Text>
                    </View>
                )}
                {order.cart &&
                    order.cart.address &&
                    order.cart.address.address && (
                        <View style={styles.innerContainer}>
                            <Text style={styles.titleText}>Address</Text>
                            <Text style={styles.subtitleText}>
                                {order.cart.address.address}
                            </Text>
                        </View>
                    )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    innerContainer: {
        margin: 5,
        marginHorizontal: 10,
        alignItems: 'flex-start',
    },
    title: {
        ...fonts.NUNITO_700_14,
        color: colors.GREY_MEDIUM,
        margin: 10,
        marginBottom: 0,
    },
    titleText: {
        ...fonts.NUNITO_700_12,
        margin: 2,
        color: colors.GREY_MEDIUM,
    },
    subtitleText: {
        ...fonts.NUNITO_500_10,
        color: colors.GREY_MEDIUM,
    },
});

export default OrderDetailsCard;
