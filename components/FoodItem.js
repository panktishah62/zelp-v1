import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Styles } from '../styles';
import FoodTypeIndicator from './FoodTypeIndicator';

const FoodItem = ({ name, count, isVeg, price }) => {
    return (
        <View
            style={[
                Styles.row_flex_start,
                {
                    marginBottom: 10,
                },
            ]}>
            <FoodTypeIndicator size={6} isVeg={isVeg} />
            <View style={[Styles.row_space_between, { marginLeft: 10 }]}>
                <Text style={styles.itemStyle}>{`${count} x `}</Text>
                <Text style={[styles.itemStyle, { width: 150 }]}>{name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemStyle: {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '700',
        ...Styles.default_text_color,
    },
});

export default FoodItem;
