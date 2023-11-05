import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Platform,
} from 'react-native';
import FrokerLogo from '../../assets/icons/FrokerLogo.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { Button_ } from '../../components/Buttons/Button';
import { useDispatch } from 'react-redux';
import TextInput_ from '../../components/Inputs/TextInput';
import { signup } from '../../redux/actions/auth';
import { phoneRegex, emailRegex, DialogTypes } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showDialog } from '../../redux/actions/dialog';

const SignUpScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [phonenumber, setPhonenumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showReferralInput, setShowReferralInput] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsOTPSent(false);
        setIsLoading(false);
    }, [navigation]);

    useEffect(() => {
        if (isOTPSent) {
            navigation.navigate('OTPVerification', {
                mobNo: phonenumber,
            });
        }
    }, [isOTPSent]);

    const handleLogin = () => {
        setIsLoading(true);
        dispatch(
            signup(
                name,
                phonenumber,
                email,
                referralCode,
                setIsOTPSent,
                setIsLoading,
            ),
        );
    };

    const onSubmit = () => {
        if (!name) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Name',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!phonenumber) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Phone Number',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (phonenumber.length !== 10) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Phone Number not equal to 10 digits',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!phoneRegex.test(phonenumber)) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter a Valid Phone Number',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (email && emailRegex.test(email) === false) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter a Valid Email Address',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            {
                handleLogin();
            }
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
                        <View
                            style={[
                                [
                                    styles.container,
                                    {
                                        height:
                                            dimensions.fullHeight +
                                            insets.bottom +
                                            insets.top +
                                            200,
                                    },
                                ],
                            ]}>
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
                                                Styles.textAlignCenter,
                                            ]}>
                                            Welcome To Froker
                                        </Text>
                                        <Text
                                            style={[
                                                fonts.NUNITO_500_16,
                                                Styles.default_text_color,
                                                Styles.textAlignCenter,
                                            ]}>
                                            Match Your Taste Buds: Swipe,
                                            Connect
                                        </Text>
                                        <Text
                                            style={[
                                                fonts.NUNITO_500_14,
                                                Styles.default_text_color,
                                                Styles.textAlignCenter,
                                            ]}>
                                            and Savor with our Foodie Community!
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
                                            Sign Up with Mobile
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
                                <View>
                                    <TextInput_
                                        text={name}
                                        setText={setName}
                                        label="Enter Your Name *"
                                        placeholder="Full Name"
                                        keyboardType="default"
                                        onSubmitEditing={onSubmit}
                                    />
                                    <TextInput_
                                        text={phonenumber}
                                        setText={setPhonenumber}
                                        maxLength={10}
                                        label="Enter Your Mobile Number *"
                                        keyboardType={'numeric'}
                                        placeholder={'Phone Number'}
                                        onSubmitEditing={onSubmit}
                                    />
                                    <TextInput_
                                        text={email}
                                        setText={setEmail}
                                        label="Enter Your Email"
                                        placeholder="Email Address"
                                        keyboardType="email-address"
                                        onSubmitEditing={onSubmit}
                                    />
                                    {/* {showReferralInput && ( */}
                                    <TextInput_
                                        text={referralCode}
                                        setText={setReferralCode}
                                        label="Have Referral Code?"
                                        placeholder="Referral Code"
                                        maxLength={5}
                                        onSubmitEditing={onSubmit}
                                    />
                                    {/* )} */}
                                </View>
                            </View>

                            {/* bottom container */}
                            <View
                                style={[
                                    styles.bottomContainer,
                                    Styles.center,
                                    // Styles.height_015,
                                ]}>
                                {/* {!showReferralInput && (
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
                                            Have A Referral Code?{' '}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowReferralInput(true);
                                            }}>
                                            <Text
                                                style={[
                                                    fonts.NUNITO_500_16,
                                                    { color: colors.BLUE_DARK },
                                                ]}>
                                                Use Referral Code
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )} */}
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
                                        Already have an account?{' '}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('LogIn');
                                        }}>
                                        <Text
                                            style={[
                                                fonts.NUNITO_500_16,
                                                { color: colors.BLUE_DARK },
                                            ]}>
                                            Sign in
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
    bottomContainer: {},
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
        justifyContent: 'center',
        alignItems: 'center',
        height: dimensions.fullHeight,
    },
    indicator: {
        marginTop: dimensions.fullHeight * 0.4,
    },
});

export default SignUpScreen;
