/* eslint-disable no-unused-vars */
import React from 'react';
import BackArrowButton from '../../assets/icons/back-arrow-white.svg';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dynamicSize, normalizeFont } from '../../utils/responsive';

const OrangeTitleWithHeader = props => {
    const { navigation, title } = props;
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('TrackOrder');
                }}>
                <BackArrowButton />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: dimensions.fullWidth,
        backgroundColor: colors.ORANGE,
        // padding: dynamicSize(10),
        height: dynamicSize(50),
    },
    button: {
        padding: 10,
        position: 'absolute',
        left: dynamicSize(16),
        zIndex: 1,
    },
    title: {
        color: colors.WHITE,
        fontFamily: fonts.NUNITO_700_24.fontFamily,
        fontSize: normalizeFont(20),
        width: '100%',
        textAlign: 'center',
    },
});

export default OrangeTitleWithHeader;
