import React from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles/index';
import { colors } from '../../styles/colors';
const InfoCard = props => {
    const image = props.image;
    return (
        <View style={[styles.card, styles.boxShadow, styles.elevation]}>
            <View style={styles.icon}>{image}</View>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth * 0.95,
        borderRadius: 8,
        padding: 20,
        marginVertical: 10,
    },
    elevation: {
        backgroundColor: colors.WHITE,
        borderRadius: 10,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    boxShadow: {
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        marginVertical: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
    text: {
        ...fonts.NUNITO_600_14,
        color: colors.BLACK,
    },
});

export default InfoCard;
