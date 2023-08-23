import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';

export const SecondaryButton = props => {
    const { text, onClick, color, style = {} } = props;
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    borderColor: color,
                    borderWidth: 1,
                },
                style,
            ]}
            onPress={() => onClick()}>
            <Text
                style={[
                    styles.text,
                    {
                        color: color,
                    },
                ]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 24,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        margin: 5,
    },
    text: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
