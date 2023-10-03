import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { dimensions } from '../../../styles';

const OrderNow = props => {
    const { navigation, name } = props;

    const handleNavigation = () => {
        navigation.navigate('SubscriptionRestaurantMenu',{name});
    };
    return (
        <TouchableOpacity onPress={handleNavigation}>
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/images/Subscription/ordernow.png')}
                />
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
        borderColor: '#E1740F',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        flexShrink: 0,
    },
    buttonText: {
        color: '#E1740F',
        fontFamily: 'Poppins',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
});

export default OrderNow;
