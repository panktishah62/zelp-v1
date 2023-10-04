import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import { dimensions } from '../../../styles';
import { colors } from '../../../styles/colors';

const OrangeButton = props => {
    const { text, orderHandler } = props;
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={orderHandler}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth - dynamicSize(60),
        marginTop: dynamicSize(20),
        height: dynamicSize(48),
        borderRadius: 12,
        backgroundColor: colors.ORANGE_WHITE,
    },
    text: {
        color: colors.WHITE,
        textAlign: 'center',
        fontFamily: 'Rubik',
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    },
});

export default OrangeButton;
