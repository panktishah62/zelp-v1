import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';

const LineCircleSurroundedHeading = props => {
    const validity = props.validity || 0;
    const price = props.price || 100;
    const discount = props.discount;
    const total = price * (1 - discount / 100) * 5;

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <Image
                        source={require('../../../assets/images/Subscription/line.png')}
                    />
                    <Image
                        source={require('../../../assets/images/Subscription/circle.png')}
                    />
                </View>
                <View style={styles.secondContainer}>
                    <Text style={textStyles.firstText}>
                        Just pay{' '}
                        <Text style={textStyles.secondText}>₹{total}</Text> for
                        Min. 5 meals - {validity} days validity
                    </Text>
                </View>
                <View style={styles.thirdContainer}>
                    <Image
                        source={require('../../../assets/images/Subscription/circle.png')}
                    />
                    <Image
                        style={styles.image}
                        source={require('../../../assets/images/Subscription/line.png')}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth,
        flexDirection: 'row',
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    secondContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 246.73,
        marginHorizontal: 13.96,
    },
    thirdContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        transform: [{ rotate: '180deg' }],
    },
});

const textStyles = StyleSheet.create({
    firstText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 16 * 1.458, // Calculate line-height based on font size
        letterSpacing: 0.48,
        textAlign: 'center',
    },
    secondText: {
        color: '#E1740F',
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 18 * 1.458, // Calculate line-height based on font size
        letterSpacing: 0.54,
    },
});

export default LineCircleSurroundedHeading;
