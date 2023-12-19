import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';
import { fonts } from '../../styles';
import { Styles } from '../../styles';
import { ReverseTimer } from './AuctionUtils';

const shippingDetails = shippingStatus => {
    return shippingStatus ? (
        <Text style={styles.shippingStatus}>Shipping and Taxes Applicable</Text>
    ) : (
        <Text style={styles.shippingStatus}>Free Shipping</Text>
    );
};

const ProductItemDetailText = ({
    ProductName,
    shippingStatus,
    listingPrice,
    Timer,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.productName}>{ProductName}</Text>
                {shippingDetails(shippingStatus)}
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.listingPrice}>₹ {listingPrice}</Text>
                <ReverseTimer startTime={30} fontSize={fonts.NUNITO_800_14} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // height: 100,
        // backgroundColor: colors.BLUE_DARK,
    },
    leftContainer: {
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '70%',
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '30%',
    },
    productName: {
        ...fonts.NUNITO_700_14,
        color: colors.WHITE,
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    shippingStatus: {
        ...fonts.NUNITO_500_12,
        textDecorationLine: 'underline',
        color: colors.WHITE,
    },
    listingPrice: {
        ...fonts.NUNITO_700_18,
        color: colors.WHITE,
        // StextTransform: 'uppercase',
        // marginBottom: 5,
    },
    LiveCounter: {
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
        height: dynamicSize(29),
        width: dynamicSize(80),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 20,
        position: 'absolute',
        right: dynamicSize(60),
        top: dynamicSize(30),
    },
    LiveCountUsers: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
        paddingLeft: 5,
    },
});

export default ProductItemDetailText;
