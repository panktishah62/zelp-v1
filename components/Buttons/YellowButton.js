import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { dynamicSize } from '../../utils/responsive';

export const YellowButton = props => {
    const navigation = useNavigation();
    const { text, onClick } = props;
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // navigation.push('Login');
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <TouchableOpacity style={styles.button} onPress={() => onClick()}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: dynamicSize(30),
        width: dimensions.fullWidth * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.RED_PRIMARY,
        borderRadius: 8,
        margin: 10,
    },
    text: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
    },
});
