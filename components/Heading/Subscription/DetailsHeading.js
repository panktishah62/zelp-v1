import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import { SvgUri } from 'react-native-svg';
import { dynamicSize } from '../../../utils/responsive';
import DISCOUNT_SVG from '../../../assets/icons/discount.svg';
import { getTimeDifferenceAsString } from '../../../utils';

const Timer = props => {
    const endDate = props?.discountEndDate;
    const discountEndDate = endDate ? new Date(endDate) : new Date();
    const timeDiff = discountEndDate
        ? getTimeDifferenceAsString(discountEndDate, new Date())
        : null;

    const date = props?.discountEndDate;
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const diffSeconds = Math.round(
                (new Date() - new Date(date)) / 1000,
            );
            if (diffSeconds > 60) {
                setSecondsLeft(0);
            } else {
                setSecondsLeft(60 - diffSeconds);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsLeft]);

    const formatTime = time => {
        const hours = Math.floor(time / (60 * 60));
        const minutes = Math.floor((time % (60 * 60)) / 60);

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}`;

        return formattedTime;
    };

    return (
        secondsLeft > 0 && (
            <Text style={textStyels.fourthText}>
                {formatTime(secondsLeft)} Hrs
            </Text>
        )
    );
};

const DetailsHeading = props => {
    const item = props?.item;
    const appliedDiscount = item?.appliedDiscount
        ? Number(item?.appliedDiscount)
        : 0;

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.firstLeft}>
                        {item?.icon && (
                            <SvgUri
                                height={dynamicSize(25)}
                                width={dynamicSize(25)}
                                uri={item?.icon}
                            />
                        )}
                        <Text style={textStyels.firstText}>{item?.name}</Text>
                    </View>
                    <Text style={textStyels.thirdText}>
                        Froker Subscription Plan
                    </Text>
                </View>
                {appliedDiscount > 0 && item?.discountEndDate && (
                    <View style={styles.rightContainer}>
                        {/* <Image
                            source={require('../../../assets/images/Subscription/discount.png')}
                        /> */}
                        <DISCOUNT_SVG />
                        <View style={styles.secondRight}>
                            <Text style={textStyels.secondText}>
                                Limited Offer
                            </Text>
                            <Timer discountEndDate={item?.discountEndDate} />
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth - 40,
        flexDirection: 'row',
        marginVertical: 10,
    },
    leftContainer: {
        marginLeft: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 6,
    },
    firstLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    rightContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginRight: 10,
    },
});

const textStyels = StyleSheet.create({
    firstText: {
        color: colors.DARKER_GRAY,
        textAlign: 'justify',
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '800',
        letterSpacing: 0.6,
        textTransform: 'capitalize',
    },
    secondText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    thirdText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        textTransform: 'capitalize',
        marginLeft: 5,
    },
    fourthText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '800',
        textTransform: 'capitalize',
    },
});

export default DetailsHeading;
