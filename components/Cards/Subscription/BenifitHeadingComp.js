import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { colors } from '../../../styles/colors';
import { fonts } from '../../../styles';
const BenifitHeadingComp = props => {
    return (
        <View style={styles.wrapperMealText}>
            <View style={styles.bestMealContainer}>
                <Image
                    source={require('../../../assets/images/Subscription/star.png')}
                />

                <Text style={[styles.text]}>
                    <Text style={[styles.changeColor, styles.changeFont]}>
                        Benefits
                    </Text>{' '}
                    of
                </Text>
                <View style={styles.horizontalLine} />
            </View>
            <View style={styles.bestMealContainer}>
                <View style={[styles.horizontalLine, styles.changeLineColor]} />
                <Text style={styles.text}>
                    {' '}
                    <Text style={[styles.changeColor, styles.changeFont]}>
                        Froker
                    </Text>{' '}
                    Subscription
                </Text>

                <Image
                    source={require('../../../assets/images/Subscription/star.png')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    text: {
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        paddingHorizontal: 14,
        fontSize: fonts.NUNITO_500_16.fontSize,
        fontWeight: fonts.NUNITO_600_16.fontWeight,
        color: colors.DARKER_GRAY,
    },
    bestMealContainer: {
        display: 'flex',
        gap: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 260,
    },
    wrapperMealText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        margin: 18,
    },
    horizontalLine: {
        flex: 1,
        height: 1,

        backgroundColor: colors.BLACK,
    },
    changeColor: {
        color: colors.ORANGE_WHITE,
    },
    changeFont: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    changeLineColor: {
        backgroundColor: colors.ORANGE,
    },
});

export default BenifitHeadingComp;
