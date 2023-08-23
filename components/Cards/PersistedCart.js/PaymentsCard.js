import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';

const PaymentsCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Payment Methods</Text>
            <View style={styles.paymentMethods}>
                <View style={styles.paymentMethod}>
                    <Text style={styles.subtitleText}>Cash On Delivery</Text>
                    <Text style={styles.footerText}>
                        (Only Cash on Delivery is available)
                    </Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        padding: 20,

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
    titleText: {
        ...fonts.NUNITO_700_16,
        color: colors.ORANGE,
    },
    paymentMethods: {},
    paymentMethod: {
        height: 70,
        justifyContent: 'center',
    },
    subtitleText: {
        ...fonts.NUNITO_700_14,
        color: colors.BLACK,
    },
    footerText: {
        ...fonts.NUNITO_700_12,
        color: colors.GREY_MEDIUM,
    },
});

export default PaymentsCard;
