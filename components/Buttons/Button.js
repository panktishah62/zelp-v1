import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';
import { he } from 'date-fns/locale';

export const Button_ = props => {
    const {
        text,
        onClick,
        height = dynamicSize(48),
        width = dimensions.fullWidth * 0.9,
    } = props;
    return (
        <TouchableOpacity
            style={[
                styles.button,
                (styles.height = { height }),
                (styles.width = { width }),
            ]}
            onPress={() => onClick()}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: dynamicSize(48),
        width: dimensions.fullWidth * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.RED_PRIMARY,
        borderRadius: 8,
    },
    text: {
        ...fonts.NUNITO_500_16,
        color: colors.WHITE,
    },
});
