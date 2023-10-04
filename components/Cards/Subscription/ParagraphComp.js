import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../../styles/colors';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';

const ParagraphComp = props => {
    const minValidity = props.minValidity;
    return (
        <View>
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
                            Minimum
                            <Text style={textStyles.secondText}> {minValidity?.meal} Meals</Text>  Per Plan
                           
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
            <View style={styles.imageContainer}>
                <Image
                    style={styles.imageStyle}
                    source={require('../../../assets/images/Subscription/offer.png')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: dimensions.fullWidth,
        marginTop: 8,
    },
    imageStyle: {
        width: dimensions.fullWidth,
    },
    thirdContainer: {
        height: 40,
        padding: 10,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        backgroundColor: colors.ORANGE,
    },

    firstText: {
        color: colors.BLACK,
        fontFamily: fonts.INTER_500_16.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        letterSpacing: 0.6,
    },
    secondText: {
        color: colors.WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '900',
        letterSpacing: 0.7,
    },
    changeColor: {
        color: colors.ORANGE,
        fontWeight: '800',
    },
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
        width:dimensions.fullWidth-dynamicSize(40)
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
        width: dynamicSize(246.73),
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
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 16 * 1.458, // Calculate line-height based on font size
        letterSpacing: 0.48,
        textAlign: 'center',
    },
    secondText: {
        color: '#E1740F',
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 18 * 1.458, // Calculate line-height based on font size
        letterSpacing: 0.54,
    },
});


export default ParagraphComp;
