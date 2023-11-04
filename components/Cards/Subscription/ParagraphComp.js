import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import FastImage from 'react-native-fast-image';

const ParagraphComp = props => {
    const minValidity = props.minValidity;
    const specialOfferBanner = props?.specialOfferBanner;

    return (
        <View>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.firstContainer}>
                        <FastImage
                            source={require('../../../assets/images/Subscription/line.png')}
                        />
                        <FastImage
                            source={require('../../../assets/images/Subscription/circle.png')}
                        />
                    </View>
                    <View style={styles.secondContainer}>
                        <Text style={textStyles.firstText}>
                            Minimum
                            <Text style={textStyles.secondText}>
                                {' '}
                                {minValidity?.meal} Meals
                            </Text>{' '}
                            Per Plan
                        </Text>
                    </View>
                    <View style={styles.thirdContainer}>
                        <FastImage
                            source={require('../../../assets/images/Subscription/circle.png')}
                        />
                        <FastImage
                            style={styles.image}
                            source={require('../../../assets/images/Subscription/line.png')}
                        />
                    </View>
                </View>
            </View>
            {specialOfferBanner && (
                <View style={styles.imageContainer}>
                    <FastImage
                        style={styles.imageStyle}
                        source={{ uri: specialOfferBanner }}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: dimensions.fullWidth,
        marginTop: dynamicSize(8),
    },
    imageStyle: {
        width: dimensions.fullWidth,
        minHeight: dynamicSize(100),
        height: 'auto',
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
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: dynamicSize(8),
    },
    container: {
        flex: 1,
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
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 18 * 1.458, // Calculate line-height based on font size
        letterSpacing: 0.54,
    },
});

export default ParagraphComp;
