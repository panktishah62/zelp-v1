import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';

export const Button_ = props => {
    const { text, onClick } = props;
    return (
        <TouchableOpacity style={styles.button} onPress={() => onClick()}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 48,
        width: dimensions.fullWidth * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ORANGE,
        borderRadius: 8,
    },
    text: {
        ...fonts.NUNITO_500_16,
        color: colors.WHITE,
    },
});
