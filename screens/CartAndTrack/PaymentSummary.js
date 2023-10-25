import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';

const SinglePaymentDetails = ({ amountType, amount }) => {
    return (
        <View style={styles.singlePaymentContainer}>
            <Text style={styles.amountType}>{amountType}</Text>
            <Text style={styles.amount}>
                {amount > 0 ? `₹${amount}` : 'Free'}
            </Text>
        </View>
    );
};

const PaymentSummary = ({
    orderValue,
    deliveryCharges,
    taxes,
    packagingCharges,
    totalAmount,
    paymentMode,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Order Summary</Text>
            <View style={styles.paymentsContainer}>
                <SinglePaymentDetails
                    amountType={'Order Value'}
                    amount={orderValue}
                />
                <SinglePaymentDetails
                    amountType={'Packing Charges'}
                    amount={packagingCharges}
                />
                <SinglePaymentDetails
                    amountType={'Delivery Charges'}
                    amount={deliveryCharges}
                />
                <SinglePaymentDetails amountType={'Taxes'} amount={taxes} />
            </View>
            <SinglePaymentDetails
                amountType={
                    paymentMode === 'COD' ? 'Cash On Delivery' : 'Paid Online'
                }
                amount={totalAmount}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(20),
        padding: dynamicSize(20),
        marginBottom: dynamicSize(30),
    },
    header: {
        color: colors.GREY_DARK,
        fontSize: normalizeFont(20),
        fontFamily: fonts.NUNITO_700_24.fontFamily,
        width: '100%',
        textAlign: 'center',
        marginBottom: dynamicSize(20),
    },
    singlePaymentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountType: {
        color: colors.BLACK,
        fontFamily: fonts.NUNITO_600_16.fontFamily,
        fontSize: normalizeFont(18),
    },
    amount: {
        color: colors.ORANGE,
        fontSize: normalizeFont(18),
        fontFamily: fonts.NUNITO_700_24.fontFamily,
    },
    paymentsContainer: {
        display: 'flex',
        gap: dynamicSize(10),
        borderBottomColor: colors.BLACK,
        borderBottomWidth: dynamicSize(1),
        borderStyle: 'dashed',
        paddingBottom: dynamicSize(12),
        marginBottom: dynamicSize(12),
    },
});

export default PaymentSummary;
