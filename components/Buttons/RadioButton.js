import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../../styles/colors';

const RadioButton = props => {
    return (
        <View
            style={[
                styles.container,
                props.isActive
                    ? styles.activeColorOuter
                    : styles.inactiveColorOuter,
            ]}>
            <View
                style={[
                    styles.innerContainer,
                    props.isActive
                        ? styles.activeColorInner
                        : styles.inactiveColorInner,
                ]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 16,
        width: 16,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        height: 12,
        width: 12,
        borderRadius: 6,
        position: 'absolute',
    },
    activeColorOuter: {
        borderColor: colors.ORANGE,
    },
    inactiveColorOuter: {
        borderColor: colors.GREY_MEDIUM,
    },
    activeColorInner: {
        backgroundColor: colors.ORANGE,
    },
    inactiveColorInner: {
        backgroundColor: colors.WHITE,
        borderColor: colors.GREY_MEDIUM,
        borderWidth: 1,
    },
});

export default RadioButton;
