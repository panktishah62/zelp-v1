import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../../styles/colors';
import { fonts } from '../../../styles';
import FastImage from 'react-native-fast-image';

const BestMealHeadingWithStars = props => {
    return (
        <View style={styles.wrapperMealText}>
            <View style={styles.bestMealContainer}>
                <FastImage
                    source={require('../../../assets/images/Subscription/star.png')}
                />

                <Text style={[styles.text, styles.changeColor]}>Best Meal</Text>
                <View style={styles.horizontalLine} />
            </View>
            <View style={styles.bestMealContainer}>
                <View style={[styles.horizontalLine, styles.changeLineColor]} />
                <Text style={styles.text}>You can Choose</Text>

                <FastImage
                    source={require('../../../assets/images/Subscription/star.png')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bestMealContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 220,
    },
    wrapperMealText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        margin: 20,
    },
    horizontalLine: {
        flex: 1,
        height: 1,

        backgroundColor: colors.BLACK,
    },
    text: {
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        paddingHorizontal: 14,
        fontSize: fonts.NUNITO_500_16.fontSize,
        fontWeight: fonts.NUNITO_600_16.fontWeight,
        color: colors.BLACK,
    },
    changeColor: {
        color: colors.ORANGE_WHITE,
        fontSize: 22,
        fontWeight: 'bold',
    },
    changeLineColor: {
        backgroundColor: colors.ORANGE,
    },
});

export default BestMealHeadingWithStars;
