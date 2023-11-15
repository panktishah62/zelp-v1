/* eslint-disable no-unused-vars */
import React from 'react';
import BackArrowButton from '../../assets/icons/back-arrow.svg';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThreeDotsMenuIcon from '../../assets/icons/infoIcon.svg';
import { dynamicSize } from '../../utils/responsive';
import { colors } from '../../styles/colors';

const TransparentHeader = props => {
    const { navigation, onBack, onClick, dontShowThreeDots } = props;
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
            {(!dontShowThreeDots || dontShowThreeDots === false) && (
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            onClick ? onClick() : navigation.goBack();
                        }}>
                        <ThreeDotsMenuIcon height={30} width={30} />
                    </TouchableOpacity>
                </View>
            )}
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
        position: 'absolute',
    },
    button: {
        padding: 10,
    },
    iconContainer: {
        marginTop: dynamicSize(8),
        right: dynamicSize(16),
        backgroundColor: colors.GREY_LIGHT,
        width: dynamicSize(32),
        height: dynamicSize(32),
        elevation: 2,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});

export default TransparentHeader;
