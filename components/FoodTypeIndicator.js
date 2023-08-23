import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Circle from './Circle';
import { colors } from '../styles/colors';
import { Styles } from '../styles/index';

const FoodTypeIndicator = ({ isVeg, size }) => {
    return (
        <View
            style={[
                Styles.center,
                {
                    width: size * 2.4,
                    height: size * 2.4,
                    borderColor: isVeg ? colors.VEG_GREEN : colors.NONVEG_RED,
                    borderWidth: 1.4,
                    borderRadius: 3,
                    padding: 2,
                },
            ]}>
            <Circle
                size={1.2 * size}
                bgColor={isVeg ? colors.VEG_GREEN : colors.NONVEG_RED}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default FoodTypeIndicator;
