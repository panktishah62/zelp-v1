import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    SafeAreaView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import EmptyProfileIcon from '../../assets/icons/emptyProfile.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import TextInput_ from '../../components/Inputs/TextInput';
// import NumberedInput from '../../components/Inputs/NumberedInput';
import SelectDropdown from 'react-native-select-dropdown';
import { Button_ } from '../../components/Buttons/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { editUserProfile } from '../../redux/actions/user';
import { DialogTypes, emailRegex } from '../../utils';
import CaretDownIcon from '../../assets/icons/CaretDown.svg';
import CalenderIcon from '../../assets/icons/Calender.svg';
import { showDialog } from '../../redux/actions/dialog';

const genders = ['Male', 'Female', 'Others'];

const getDefaultValueForSelect = genderPrevious => {
    let selectedIndex = -1;
    genders.forEach((gender, index) => {
        if (genderPrevious === gender) {
            selectedIndex = index;
        }
    });
    return selectedIndex;
};

const ProfileEditingScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const userData = route.params;

    const getFormattedDate = timestamp => {
        const dateObj = new Date(timestamp);
        const formattedDate = format(dateObj, 'dd/MM/yyyy');
        return formattedDate;
    };

    const [userDetails, setUserDetails] = useState({
        fullName: userData.fullName || '',
        email: userData.email || '',
        dob: userData.dob ? new Date(userData.dob) : new Date(),
        gender: userData.gender || '',
        phoneNo: userData.phoneNo || '',
    });

    const [focus, setFocus] = useState(0);
    const [date, setDate] = useState(
        userData.dob ? new Date(userData.dob) : new Date(),
    );
    const [show, setShow] = useState(false);

    const setBlur = () => {
        setFocus(0);
    };

    const handleSubmit = () => {
        const dataToPost = {
            email: userDetails?.email,
            dateOfBirth: userDetails?.dob,
            gender: userDetails?.gender,
        };
        if (!userDetails.email) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Email',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!emailRegex.test(userData.email)) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter a Valid Email',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!userDetails.dob) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Date of Birth',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!userDetails.gender) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Gender',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            dispatch(editUserProfile(dataToPost, navigation));
        }
    };

    const onChange = (event, selectedDate) => {
        setShow(false);
        setDate(new Date(selectedDate));
        setUserDetails({
            ...userDetails,
            dob: new Date(selectedDate),
        });
    };

    const showMode = currentMode => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View contentContainerStyle={[{ flex: 1 }]}>
                <View
                    style={[
                        styles.elevation,
                        styles.headerCardMargin,
                        Styles.center,
                    ]}>
                    <EmptyProfileIcon />
                </View>
                {/*  Form Container */}
                <View style={styles.formContainer}>
                    <TextInput_
                        disabled={true}
                        text={userDetails.fullName}
                        setText={value => {
                            setUserDetails({
                                ...userDetails,
                                fullName: value,
                            });
                        }}
                        placeholder={'Full Name'}
                    />
                    <TextInput_
                        text={userDetails.email}
                        setText={value => {
                            setUserDetails({
                                ...userDetails,
                                email: value,
                            });
                        }}
                        focused={focus === 2}
                        setBlur={setBlur}
                        setFocus={() => {
                            setFocus(2);
                        }}
                        placeholder={'Email ID'}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setShow(true);
                            setFocus(3);
                        }}>
                        <View
                            style={[
                                {
                                    borderColor:
                                        focus === 3
                                            ? colors.ORANGE
                                            : colors.GREY_BORDER,
                                    paddingHorizontal: 10,
                                    marginTop: 20,
                                },
                                styles.dateTextContainer,
                                Styles.row_space_between,
                            ]}>
                            <Text
                                style={[
                                    fonts.NUNITO_500_14,
                                    Styles.default_text_color,
                                ]}>
                                {getFormattedDate(date)}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setShow(true);
                                    setFocus(3);
                                }}>
                                <CalenderIcon />
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                    <SelectDropdown
                        data={genders}
                        defaultValueByIndex={getDefaultValueForSelect(
                            userDetails.gender,
                        )}
                        onSelect={(selectedItem, index) => {
                            setUserDetails({
                                ...userDetails,
                                gender: selectedItem,
                            });
                        }}
                        defaultButtonText={'Select gender'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdownBtnStyle}
                        buttonTextStyle={styles.dropdownBtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return (
                                <View>
                                    <CaretDownIcon />
                                </View>
                            );
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdownDropdownStyle}
                        rowStyle={styles.dropdownRowStyle}
                        rowTextStyle={styles.dropdownRowTxtStyle}
                    />
                    {/* <NumberedInput
                        disabled={true}
                        number={userDetails.phoneNo}
                        setNumber={value => {
                            setUserDetails({
                                ...userDetails,
                                phoneNo: value,
                            });
                        }}
                        placeholder={'Phone Number'}
                    /> */}
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={false}
                        textColor="#ffffff"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={[Styles.center, styles.buttonContainer]}>
                <Button_
                    text={'Save and Update Changes'}
                    onClick={e => handleSubmit(e)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: dimensions.fullHeight,
        backgroundColor: colors.WHITE,
    },
    elevation: {
        backgroundColor: colors.WHITE,
        padding: 20,
        borderRadius: 8,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    headerCardMargin: { marginVertical: 10, marginHorizontal: 17 },
    formContainer: {
        ...Styles.center,
    },
    dropdownBtnStyle: {
        marginTop: 20,
        width: dimensions.fullWidth * 0.9,
        height: 50,
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.GREY_BORDER,
    },
    dropdownBtnTxtStyle: {
        color: colors.GREY_MEDIUM,
        textAlign: 'left',
        ...fonts.NUNITO_500_16,
    },
    dropdownDropdownStyle: {
        backgroundColor: colors.WHITE,
        borderRadius: 8,
    },
    dropdownRowStyle: {
        backgroundColor: colors.WHITE,
        borderBottomColor: colors.GRAY_30,
    },
    dropdownRowTxtStyle: { color: colors.GREY_MEDIUM, textAlign: 'left' },
    btnPosStyle: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    dateTextContainer: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
        width: dimensions.fullWidth * 0.9,
        // margin: 5,
        padding: 15,
        color: colors.GREY_MEDIUM,
        ...fonts.NUNITO_500_14,
    },
    buttonContainer: {
        backgroundColor: colors.WHITE,
        width: dimensions.fullWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,

        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 8,
        padding: 20,
    },
});

export default ProfileEditingScreen;
