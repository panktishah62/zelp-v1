import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    Platform,
} from 'react-native';
import Header from '../../components/Header/Header';
import OTPInput from '../../components/Inputs/OTPInput';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { Button_ } from '../../components/Buttons/Button';
import { useSelector, useDispatch } from 'react-redux';
import { verifyOTP } from '../../redux/actions/auth';
import { DialogTypes } from './../../utils/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Share from 'react-native-share';
import { showDialog } from '../../redux/actions/dialog';
import { resendOTP } from '../../redux/services/authService';

const ReverseTimer = ({ number, countryCode, callingCode, startTime = 60 }) => {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(startTime);
    const [minutes, setMinutes] = useState(0);
    const [timerEnded, setTimerEnded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                setMinutes(0);
                setSeconds(0);
                setTimerEnded(true);
                clearInterval(interval);
            } else if (seconds === 0 && minutes != 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, minutes]);

    const restartTimer = async () => {
        await resendOTP({ mobNo: number, countryCode, callingCode });
        setSeconds(60);
        setMinutes(0);
        setTimerEnded(false);
    };

    return (
        <View>
            {!timerEnded ? (
                <Text style={[fonts.NUNITO_400_14, Styles.default_text_color]}>
                    Resend OTP in{' '}
                    {`${minutes.toString().padStart(2, '0')}:${seconds
                        .toString()
                        .padStart(2, '0')}`}
                </Text>
            ) : (
                <TouchableWithoutFeedback
                    onPress={() => {
                        restartTimer();
                    }}>
                    <Text
                        style={[fonts.NUNITO_600_14, { color: colors.ORANGE }]}>
                        Resend OTP
                    </Text>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const OTPVerificationScreen = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const { mobNo, callingCode, countryCode } = route.params;
    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        navigation.setOptions({
            header: () => <Header navigation={navigation} />,
        });
    }, [navigation, isAuthenticated]);

    const dispatch = useDispatch();

    const onPressShare = shareTemplate => {
        const message = shareTemplate;
        if (message) {
            const shareOptions = {
                message: message,
            };
            Share.open(shareOptions).catch(err => {});
        }
    };

    const handleLogin = () => {
        setIsLoading(true);
        dispatch(
            verifyOTP(
                mobNo,
                number,
                countryCode,
                callingCode,
                navigation,
                setIsLoading,
                onPressShare,
            ),
        );
    };

    const onSubmit = () => {
        if (!number) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter OTP',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (number.length !== 4) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'OTP not equal to 4 digits',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            handleLogin();
        }
    };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // return () => {
        //     Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
        //     Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        // };
    }, []);

    const _keyboardDidShow = e => {
        setKeyboardHeight(e.endCoordinates.height - insets.bottom);
    };

    const _keyboardDidHide = () => {
        setKeyboardHeight(0);
    };

    return (
        <View style={styles.mainContainer}>
            {!isLoading && (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.container}>
                        <View>
                            <View style={[Styles.center, Styles.height_02]}>
                                <Text
                                    style={[
                                        fonts.NUNITO_700_24,
                                        Styles.default_text_color,
                                    ]}>
                                    Enter Your OTP
                                </Text>
                                <Text
                                    style={[
                                        fonts.NUNITO_500_16,
                                        Styles.default_text_color,
                                    ]}>
                                    We sent you a code on your mobile
                                </Text>
                                <Text
                                    style={[
                                        fonts.NUNITO_500_16,
                                        Styles.default_text_color,
                                    ]}>
                                    {' '}
                                    +{callingCode} {mobNo}
                                </Text>
                            </View>

                            <View style={[Styles.center, Styles.height_03]}>
                                <OTPInput
                                    number={number}
                                    setNumber={setNumber}
                                />
                                <View style={Styles.center}>
                                    <ReverseTimer
                                        number={mobNo}
                                        countryCode={countryCode}
                                        callingCode={callingCode}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
            {isLoading && (
                <View styles={styles.activityIndicator}>
                    <ActivityIndicator
                        size="large"
                        color={colors.ORANGE}
                        style={styles.indicator}
                    />
                </View>
            )}
            <View
                style={[
                    styles.bottomContainer,
                    {
                        bottom: Platform.OS === 'ios' ? keyboardHeight : 0,
                    },
                ]}>
                <Button_
                    text="Verify"
                    onClick={() => {
                        onSubmit();
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        backgroundColor: colors.WHITE,
    },
    container: {
        backgroundColor: colors.WHITE,
        // height: dimensions.fullHeight,
        alignItems: 'center',
    },
    bottomContainer: {
        width: dimensions.fullWidth,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        padding: 15,
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        height: dimensions.fullHeight,
    },
    indicator: {
        marginTop: dimensions.fullHeight * 0.4,
    },
});

export default OTPVerificationScreen;
