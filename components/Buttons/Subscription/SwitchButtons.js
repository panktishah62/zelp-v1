import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import QUICK_CHECKOUT from '../../../assets/icons/quick_checkout.svg';
import ORDER_HISTORY from '../../../assets/icons/order_history.svg';

const SwitchButtons = props => {
    const { firstActive, secondActive, toggleFirst, toggleSecond } = props;

    return (
        <View style={buttonStyles.container}>
            <TouchableOpacity onPress={toggleFirst}>
                <View
                    style={[
                        buttonStyles.firstContainer,
                        firstActive && buttonStyles.belowBorder,
                    ]}>
                    <QUICK_CHECKOUT />
                    <Text style={buttonStyles.text}>Quick Checkout</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSecond}>
                <View
                    style={[
                        buttonStyles.firstContainer,
                        secondActive && buttonStyles.belowBorder,
                    ]}>
                    <ORDER_HISTORY />
                    <Text style={buttonStyles.text}>Order History</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const buttonStyles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.fullWidth - 60,
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    belowBorder: {
        borderBottomColor: colors.ORANGE_WHITE,
        borderBottomWidth: 2,
    },
    text: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
});

export default SwitchButtons;
