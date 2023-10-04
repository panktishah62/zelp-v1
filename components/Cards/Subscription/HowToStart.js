import React from 'react';

import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { colors } from '../../../styles/colors';
import PlayButtonWhite from '../../../assets/images/Subscription/PlayButtonWhite.svg';
import { fonts } from '../../../styles';

const HowToStart = props => {
    return (
        <View style={styles.wrapperHowToStart}>
            <View style={styles.howToStartContainer}>
                <Text style={styles.howToStartText}>
                    How to subscribe & Order
                </Text>
                <PlayButtonWhite />
            </View>
        </View>
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
        width: 254,
        height: 41,
        padding: 8,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // For horizontal alignment of children
        flexWrap: 'wrap', // To allow multiple lines (if needed)
        gap: 5,
        flexShrink: 0,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: colors.ORANGE,
        borderColor:colors.ORANGE_WHITE,
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
