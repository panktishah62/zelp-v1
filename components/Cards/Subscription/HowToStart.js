import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../../styles/colors';
import PlayButtonWhite from '../../../assets/images/Subscription/PlayButtonWhite.svg';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';

const HowToStart = props => {
    const { setIsVideoModalVisible } = props;
    return (
        <TouchableOpacity
            style={styles.wrapperHowToStart}
            onPress={setIsVideoModalVisible}>
            <View style={styles.howToStartContainer}>
                <Text style={styles.howToStartText}>
                    How to subscribe & Order
                </Text>
                <PlayButtonWhite />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapperHowToStart: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    howToStartContainer: {
        display: 'flex',
        width: dimensions.fullWidth - dynamicSize(20),
        height: 41,
        padding: 8,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // For horizontal alignment of children
        flexWrap: 'wrap', // To allow multiple lines (if needed)
        gap: 5,
        flexShrink: 0,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: colors.ORANGE_WHITE,
        borderColor: colors.ORANGE_WHITE,
    },
    howToStartText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',

        textTransform: 'capitalize',
    },
});

export default HowToStart;
