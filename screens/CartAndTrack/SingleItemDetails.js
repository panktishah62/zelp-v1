/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VegIcon from '../../assets/icons/VegIcon.svg';
import NonVegIcon from '../../assets/icons/nonveg.svg';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';

const SingleItemDetails = ({ name, isVeg, price, quantity }) => {
    return (
        <View style={styles.container}>
            {isVeg ? (
                <VegIcon style={{ marginTop: dynamicSize(6) }} />
            ) : (
                <NonVegIcon style={{ marginTop: dynamicSize(6) }} />
            )}
            <View style={styles.nameContainer}>
                <Text style={styles.text}>{name}</Text>
            </View>
            <Text style={[styles.text, { position: 'absolute', left: '70%' }]}>
                x{quantity}
            </Text>
            <Text style={[styles.price, { position: 'absolute', left: '85%' }]}>
                ₹{price}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    text: {
        color: colors.BLACK,
        fontFamily: fonts.NUNITO_600_16.fontFamily,
        fontSize: normalizeFont(18),
    },
    price: {
        color: colors.ORANGE,
        fontFamily: fonts.NUNITO_600_16.fontFamily,
        fontWeight: 'bold',
        fontSize: normalizeFont(18),
    },
    nameContainer: {
        display: 'flex',
        justifyContent: 'center',
        left: '8%',
        width: '56%',
    },
});

export default SingleItemDetails;
