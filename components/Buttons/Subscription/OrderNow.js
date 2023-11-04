import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import ORDER_NOW from '../../../assets/icons/order_now.svg';
const OrderNow = props => {
    const { navigation, subscriptionDetails } = props;

    const handleNavigation = () => {
        navigation.navigate('SubscriptionRestaurantMenu', {
            subscriptionDetails,
        });
    };
    return (
        <TouchableOpacity onPress={handleNavigation}>
            <View style={styles.container}>
                <ORDER_NOW />
                <Text style={styles.buttonText}>Order Now</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth - 60,
        display: 'flex',
        flexDirection: 'row',
        width: 330,
        marginVertical: 20,
        height: 45,
        padding: 10.094,
        borderWidth: 1,
        borderColor: colors.ORANGE_WHITE,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        flexShrink: 0,
    },
    buttonText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
});

export default OrderNow;
