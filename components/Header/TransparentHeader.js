/* eslint-disable no-unused-vars */
import React from 'react';
import BackArrowButton from '../../assets/icons/back-arrow.svg';
import HomeButton from '../../assets/icons/home.svg';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TransparentHeader = props => {
    const { navigation, title, onBack, onClick } = props;
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.goBack();
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
                <HomeButton />
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
