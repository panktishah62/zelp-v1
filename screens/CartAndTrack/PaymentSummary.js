import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';

const SinglePaymentDetails = ({ amountType, amount }) => {
    return (
        <View style={styles.singlePaymentContainer}>
            <Text style={styles.amountType}>{amountType}</Text>
            <Text style={styles.amount}>{`₹${amount}`}</Text>
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
    referenceId,
    moneyFromFuro,
    moneyFromReferralCoins,
    couponDiscount,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Order Summary</Text>
            <View
                style={[
                    styles.singlePaymentContainer,
                    { marginBottom: dynamicSize(12) },
                ]}>
                <Text
                    style={[
                        styles.amountType,
                        { fontFamily: fonts.NUNITO_700_24.fontFamily },
                    ]}>
                    Order Reference Id
                </Text>
                <Text
                    style={[
                        styles.amount,
                        { fontFamily: fonts.NUNITO_700_24.fontFamily },
                    ]}>
                    {referenceId}
                </Text>
            </View>
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
                <SinglePaymentDetails
                    amountType={'Money From Furos'}
                    amount={moneyFromFuro}
                />
                <SinglePaymentDetails
                    amountType={'Money From Referral Coins'}
                    amount={moneyFromReferralCoins}
                />
                <SinglePaymentDetails
                    amountType={'Coupon Discount'}
                    amount={couponDiscount}
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
        borderTopColor: colors.BLACK,
        borderTopWidth: dynamicSize(1),
        ...Platform.select({
            android: {
                borderStyle: 'dashed',
            },
        }),
        paddingVertical: dynamicSize(12),
        marginBottom: dynamicSize(12),
    },
});

export default PaymentSummary;
