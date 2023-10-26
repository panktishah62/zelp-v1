/* eslint-disable no-unused-vars */
import React from 'react';
import BackArrowButton from '../../assets/icons/back-arrow.svg';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThreeDotsMenuIcon from '../../assets/icons/three-dots-menu.svg';

const TransparentHeader = props => {
    const { navigation, onBack, onClick } = props;
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onBack ? onBack() : navigation.goBack();
                }}>
                <BackArrowButton />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    if (onBack) {
                        onBack();
                    }
                    onClick ? onClick() : navigation.goBack();
                }}>
                <ThreeDotsMenuIcon />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    button: {
        padding: 10,
    },
});

export default TransparentHeader;
