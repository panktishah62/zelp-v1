import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../styles/colors';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { fonts } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RectangularFullscreenBtn = ({ title, pressHandler }) => {
    return (
        <TouchableOpacity onPress={pressHandler} activeOpacity={0.6}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.ORANGE,
        height: dynamicSize(50),
        borderRadius: dynamicSize(12),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.WHITE,
        fontSize: normalizeFont(18),
        fontFamily: fonts.NUNITO_600_16.fontFamily,
    },
});

export default RectangularFullscreenBtn;
