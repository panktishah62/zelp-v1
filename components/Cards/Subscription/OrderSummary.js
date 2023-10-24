import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { colors } from '../../../styles/colors';

const OrderSummary = props => {
    const openPaymentGateway = props?.openPaymentGateway;
    const total = props?.data?.totalPlanPrice;
    const GSTTaxes = props?.data?.config?.GSTTaxes;
    const deliveryFee = props?.data?.config?.deliveryFee;
    const taxableAmount = props?.data?.taxableAmount;
    const couponDiscount = props?.data?.couponDiscount;
    const final = props?.data?.totalAmount;

    return (
        <View style={styles.wrapperContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.headingText}>Order Summary</Text>
                </View>
                <View style={styles.firstContainer}>
                    <Text style={styles.leftText}>Selected Items</Text>
                    <Text style={styles.rightText}>Rs. {total}</Text>
                </View>
                <View style={styles.firstContainer}>
                    <Text style={styles.leftText}>Delivery Fee</Text>
                    <Text style={styles.rightText}>Rs.{deliveryFee}</Text>
                </View>
                <View style={styles.firstContainer}>
                    <Text style={styles.leftText}>Coupon Discount</Text>
                    <Text style={styles.rightText}>Rs.{couponDiscount}</Text>
                </View>
                <View style={styles.firstContainer}>
                    <Text style={styles.leftText}>
                        Govt Taxes & Other Charges ({GSTTaxes}%)
                    </Text>
                    <Text style={styles.rightText}>Rs.{taxableAmount}</Text>
                </View>
                <View style={lineStyles.container}></View>
                <View style={styles.firstContainer}>
                    <Text style={buttonStyles.changeText}>Total Charge</Text>
                    <Text style={styles.rightText}>Rs. {final}</Text>
                </View>
                <TouchableOpacity onPress={openPaymentGateway}>
                    <View style={buttonStyles.container}>
                        <Text style={buttonStyles.text}>Pay Online Now</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth - 40,
        backgroundColor: colors.WHITE,
        borderRadius: 12,
        padding: 10,
        elevation: 5,
    },
    firstContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: dimensions.fullWidth - 60,
    },
    leftText: {
        color: colors.BLACK,
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    rightText: {
        color: colors.ORANGE_WHITE,
        textAlign: 'right',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    headingText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
    headingContainer: {
        textAlign: 'center',
    },
});

const buttonStyles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 12,
        width: dimensions.fullWidth - 80,
        paddingVertical: 16,
        marginVertical: 10,
    },
    text: {
        color: colors.WHITE,
        fontFamily: 'Rubik',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',

        letterSpacing: 0.25,
        textTransform: 'uppercase',
    },
    changeText: {
        color: colors.BLACK,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',

        textTransform: 'capitalize',
    },
});

const lineStyles = StyleSheet.create({
    container: {
        height: 1,
        width: dimensions.fullWidth - 80,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
    },
});

export default OrderSummary;
