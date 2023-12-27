import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Platform,
    Image,
    StyleSheet,
} from 'react-native';
import BackgroundDoodle from '../../assets/icons/backgroundDoodle.svg';
import BubbleBackground from '../../assets/icons/BubbleBackground.svg';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { getUserReferralCodeDetails } from '../../redux/services/referralService';
import { dynamicSize } from '../../utils/responsive';
import Share from 'react-native-share';

const ReferralCard = props => {
    const { referralDetails } = props;
    const [showReferralCode, setShowReferralCode] = useState(false);
    const onPressShare = async () => {
        const message = referralDetails?.shareTemplate?.text;
        if (message) {
            const shareOptions = {
                message: message,
            };
            Share.open(shareOptions).catch(err => {
                // throw new Error(err);
            });
        }
    };

    return (
        <TouchableOpacity
            onPress={() => setShowReferralCode(true)}
            disabled={showReferralCode}>
            {!showReferralCode && referralDetails?.referralCode && (
                <View>
                    <View style={styles.container1}>
                        <BackgroundDoodle
                            height={dimensions.fullWidth - 100}
                            width={dimensions.fullWidth - 100}
                        />
                    </View>
                    <Text style={styles.lightText}>
                        Tap To Reveal Referral Code
                    </Text>
                </View>
            )}
            {showReferralCode && referralDetails?.referralCode && (
                <View style={styles.constainer2}>
                    <BubbleBackground />
                    <BubbleBackground />
                    <View style={styles.referralCodeContainer}>
                        <Text style={styles.referralCodeText}>
                            {referralDetails?.referralCode}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>Share it now!</Text>

                        <Text style={styles.subTitleText}>
                            Yay! You can earn{' '}
                            {referralDetails?.addToSenderWallet} Coins on every
                            use. Share it now!
                        </Text>
                    </View>
                </View>
            )}
            {showReferralCode && (
                <TouchableOpacity
                    onPress={() => onPressShare()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Share </Text>
                    <Image
                        source={require('../../assets/icons/share.png')}
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container1: {
        height: dimensions.fullWidth - 100,
        width: dimensions.fullWidth - 100,
        backgroundColor: colors.RED_PRIMARY,
        borderRadius: dynamicSize(20),
        opacity: 0.9,
    },
    lightText: {
        textAlign: 'center',
        color: colors.GREY_DARK,
        backgroundColor: colors.WHITE,
        padding: dynamicSize(5),
        ...fonts.NUNITO_700_12,
    },
    constainer2: {
        height: dimensions.fullWidth - 100,
        width: dimensions.fullWidth - 100,
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(20),
        borderColor: colors.RED_PRIMARY,
        borderWidth: dynamicSize(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    referralCodeContainer: {
        position: 'absolute',
        // width: dimensions.fullWidth - 200,
        borderColor: colors.RED_PRIMARY,
        backgroundColor: colors.WHITE,
        borderWidth: dynamicSize(1),
        padding: dynamicSize(10),
        paddingHorizontal: dynamicSize(40),
        borderStyle: 'dotted',
        borderRadius: dynamicSize(10),
        top: dimensions.fullWidth * 0.2,
        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: dynamicSize(6) },
                shadowOpacity: 0.09,
                shadowRadius: dynamicSize(10),
                top: dimensions.fullWidth * 0.1,
            },
            android: {
                elevation: dynamicSize(5),
            },
        }),
    },
    referralCodeText: {
        ...fonts.NUNITO_700_24,
        color: colors.BLACK,
    },
    textContainer: {
        position: 'absolute',
        padding: dynamicSize(20),
        top: dimensions.fullWidth * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                top: dimensions.fullWidth * 0.3,
            },
        }),
    },
    titleText: {
        textAlign: 'center',
        ...fonts.NUNITO_700_16,
        color: colors.BLACK,
        backgroundColor: colors.WHITE,
    },
    subTitleText: {
        textAlign: 'center',
        color: colors.GREY_DARK,
        backgroundColor: colors.WHITE,
        padding: dynamicSize(5),
        ...fonts.NUNITO_700_12,
    },
    button: {
        marginVertical: dynamicSize(20),
        marginHorizontal: dynamicSize(60),
        padding: dynamicSize(5),
        paddingHorizontal: dynamicSize(10),
        borderRadius: dynamicSize(5),
        backgroundColor: colors.RED_PRIMARY,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        ...fonts.NUNITO_700_16,
        color: colors.WHITE,
    },
    buttonIcon: {
        width: dynamicSize(20),
        height: dynamicSize(20),
    },
});

export default ReferralCard;
