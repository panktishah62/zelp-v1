import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    BackHandler,
    ScrollView,
    ActivityIndicator,
    Platform,
} from 'react-native';
import FrokerLogo from '../../assets/icons/FrokerLogo.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { Button_ } from '../../components/Buttons/Button';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth';
import TextInput_ from './../../components/Inputs/TextInput';
import { DialogTypes, phoneRegex } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showDialog } from '../../redux/actions/dialog';
import CustomPhoneNumberInput from '../../components/Inputs/CustomPhoneNumberInput';

const LoginScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [phonenumber, setPhonenumber] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [countryCode, setCountryCode] = useState('IN');
    const [callingCode, setCallingCode] = useState('91');
    const [isNumberValid, setIsNumberValid] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsOTPSent(false);
        setIsLoading(false);
    }, [navigation]);

    useEffect(() => {
        if (isOTPSent) {
            navigation.navigate('OTPVerification', {
                mobNo: phonenumber,
                callingCode,
                countryCode,
            });
        }
    }, [isOTPSent]);

    const handleLogin = () => {
        setIsLoading(true);
        setIsOTPSent(false);
        dispatch(
            login(
                phonenumber,
                countryCode,
                callingCode,
                setIsOTPSent,
                setIsLoading,
            ),
        );
    };

    const onSubmit = () => {
        if (!phonenumber) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Phone Number cannot be blank',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (phonenumber.length !== 10) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText:
                        'Enter Phone Number with valid length of digits!',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!isNumberValid) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Not a valid Phone Number',
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
        <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {!isLoading && (
                <ScrollView>
                    <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}>
                        <View style={[styles.container]}>
                            <TouchableOpacity
                                style={styles.skip}
                                onPress={() => {
                                    navigation.popToTop();
                                }}>
                                <Text
                                    style={[
                                        fonts.NUNITO_500_16,
                                        { color: colors.BLUE_DARK },
                                    ]}>
                                    Skip
                                </Text>
                            </TouchableOpacity>
                            {/* top container */}
                            <View
                                style={[styles.upperContainer, Styles.center]}>
                                <View style={[Styles.center, Styles.height_02]}>
                                    <FrokerLogo />
                                    <View
                                        style={[
                                            Styles.margin_20,
                                            Styles.center,
                                        ]}>
                                        <Text
                                            style={[
                                                fonts.NUNITO_700_24,
                                                Styles.default_text_color,
                                            ]}>
                                            Welcome To Froker
                                        </Text>
                                        <Text
                                            style={[
                                                fonts.NUNITO_500_16,
                                                Styles.default_text_color,
                                            ]}>
                                            Order quality food and leave your{' '}
                                        </Text>
                                        <Text
                                            style={[
                                                fonts.NUNITO_500_14,
                                                Styles.default_text_color,
                                            ]}>
                                            taste behind
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        Styles.center,
                                        Styles.row,
                                        Styles.height_015,
                                    ]}>
                                    <View
                                        style={[
                                            Styles.width_full_03,
                                            {
                                                height: 1,
                                                backgroundColor:
                                                    colors.GREY_BORDER,
                                            },
                                        ]}></View>
                                    <View
                                        style={[
                                            {
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                            },
                                        ]}>
                                        <Text
                                            style={[
                                                fonts.NUNITO_600_14,
                                                Styles.default_text_color,
                                            ]}>
                                            Sign in with Mobile
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            Styles.width_full_03,
                                            {
                                                height: 1,
                                                backgroundColor:
                                                    colors.GREY_BORDER,
                                            },
                                        ]}></View>
                                </View>
                                <CustomPhoneNumberInput
                                    label="Enter Your Mobile Number *"
                                    value={phonenumber}
                                    setValue={setPhonenumber}
                                    countryCode={countryCode}
                                    setCountryCode={setCountryCode}
                                    callingCode={callingCode}
                                    setCallingCode={setCallingCode}
                                    setIsNumberValid={setIsNumberValid}
                                    onSubmitEditing={onSubmit}
                                />
                            </View>

                            {/* bottom container */}
                            <View
                                style={[
                                    styles.bottomContainer,
                                    Styles.center,
                                    Styles.height_015,
                                ]}>
                                <View
                                    style={[
                                        Styles.center,
                                        Styles.row,
                                        Styles.margin_10,
                                    ]}>
                                    <Text
                                        style={[
                                            fonts.NUNITO_500_16,
                                            Styles.default_text_color,
                                        ]}>
                                        Don't have an account?{' '}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // navigation.goBack();
                                            navigation.navigate('SignUp');
                                        }}>
                                        <Text
                                            style={[
                                                fonts.NUNITO_500_16,
                                                { color: colors.BLUE_DARK },
                                            ]}>
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[Styles.center, Styles.margin_05]}>
                                    <Text
                                        style={[
                                            fonts.NUNITO_400_14,
                                            { color: colors.ORANGE },
                                        ]}>
                                        Make sure to fill up your Profile to
                                        have a
                                    </Text>
                                    <Text
                                        style={[
                                            fonts.NUNITO_400_14,
                                            { color: colors.ORANGE },
                                        ]}>
                                        personalised experience
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
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
                    styles.button,
                    { bottom: Platform.OS === 'ios' ? keyboardHeight : 0 },
                ]}>
                <Button_
                    text="Send OTP"
                    onClick={() => {
                        onSubmit();
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: colors.WHITE },
    container: {
        backgroundColor: colors.WHITE,
        height: dimensions.fullHeight,
        alignItems: 'center',
    },
    upperContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    bottomContainer: {
        // position: 'absolute',
        // bottom: 70,
    },
    skip: {
        width: dimensions.fullWidth,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: dimensions.fullWidth,
        bottom: 0,
        backgroundColor: colors.WHITE,
        padding: 15,
    },
    activityIndicator: {
        height: dimensions.fullHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        marginTop: dimensions.fullHeight * 0.4,
    },
});

export default LoginScreen;
