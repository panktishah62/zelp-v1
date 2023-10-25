import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { PrimarySmallButton } from '../Buttons/PrimarySmallButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { REFUND_CODES } from '../../redux/constants/refundConstants';
import { paisaToRupees } from '../../utils';

const RefundCard = props => {
    const { refundData, navigation } = props;
    const statusColor =
        refundData?.code === REFUND_CODES.REFUND_SUCCESS
            ? colors.SUCCESS_GREEN
            : colors.YELLOW_MEDIUM;

    const amount = refundData?.data?.amount
        ? paisaToRupees(refundData?.data?.amount)
        : '';

    const orderId = refundData?.paymentId?.order?._id;
    const date = refundData?.paymentId?.order?.createdAt
        ? new Date(refundData?.paymentId?.order?.createdAt).toString()
        : '';
    return (
        <View style={[styles.mainContainer, styles.elevation]}>
            <View style={styles.cardContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.refundText}>Refund Of {amount}/- </Text>
                    <Text style={[styles.statusText, { color: statusColor }]}>
                        {refundData?.code}
                    </Text>
                </View>
                <View style={styles.orderHeader}>
                    <Text style={styles.orderIdText}>Order ID : {orderId}</Text>
                    <Text style={styles.orderDateText}>
                        Order Placed : {date}
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.buttonContainer}>
                        <SecondaryButton
                            text={'View Order Info'}
                            onClick={() => {
                                navigation.navigate('RefundOrder', {
                                    orderId: orderId,
                                });
                            }}
                            color={colors.ORANGE_GRADIENT_DARK}
                            style={styles.buttonStyle}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        width: dimensions.fullWidth * 0.9,
        alignSelf: 'center',
        padding: 5,
    },
    elevation: {
        borderRadius: 8,
        marginVertical: 10,
        ...Platform.select({
            android: {
                elevation: 4,
            },
        }),
        shadowColor: colors.BLACK,
        shadowOffset: { width: -1, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    refundText: {
        ...fonts.NUNITO_700_14,
        color: colors.ORANGE_GRADIENT_DARK,
    },
    statusText: {
        ...fonts.NUNITO_700_14,
        ...Styles.default_text_color,
    },
    orderIdText: {
        ...fonts.NUNITO_700_14,
        color: colors.GREY_MEDIUM,
    },
    orderDateText: {
        ...fonts.NUNITO_700_12,
        color: colors.GREY_MEDIUM,
        lineHeight: 25,
    },
    orderDetails: {
        ...fonts.NUNITO_700_14,
        color: colors.BLACK,
    },
    orderDetailsText: {
        ...fonts.NUNITO_500_14,
        ...Styles.default_text_color,
    },
    orderHeader: {
        marginTop: 10,
    },
    receiptButtton: {
        height: dimensions.fullHeight * 0.05,
        width: dimensions.fullWidth * 0.25,
        borderWidth: 1,
        borderColor: colors.ORANGE_GRADIENT_DARK,
        borderRadius: 6,
        marginRight: 10,
        justifyContent: 'center',
    },
    buttonText: {
        ...fonts.INTER_600_12,
        color: colors.ORANGE_GRADIENT_DARK,
        alignSelf: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',
    },
    orderDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContainer: {
        marginHorizontal: 10,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    buttonContainer: {
        width: 130,
    },
    buttonStyle: {
        height: 40,
    },
});

export default RefundCard;
