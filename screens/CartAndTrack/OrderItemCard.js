import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import FoodIcon from '../../assets/icons/food-icon.svg';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';

const OrderItemCard = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.restaurant}>
                <FoodIcon />
                <Text style={styles.restName}>{item.restaurantName}</Text>
            </View>

            <View style={styles.food}>
                <Image source={{ uri: item.itemImage }} />
            </View>
        </View>
    );
};

export default OrderItemCard;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        width: '100%',
        borderRadius: dynamicSize(20),
        marginBottom: dynamicSize(20),
        padding: dynamicSize(10),
    },
    restaurant: {
        display: 'flex',
        gap: dynamicSize(10),
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    restName: {
        color: colors.BLACK,
        fontSize: normalizeFont(20),
        fontFamily: fonts.NUNITO_600_20.fontFamily,
    },
});
