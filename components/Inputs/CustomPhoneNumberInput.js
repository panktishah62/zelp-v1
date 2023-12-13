import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Picker,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';
import { phoneRegex } from '../../utils';
import DropDownButton from '../../assets/icons/chevron-down.svg';
import CountryPicker from 'react-native-country-picker-modal';

const CustomPhoneNumberInput = props => {
    const {
        label,
        value,
        setValue,
        countryCode,
        setCountryCode,
        callingCode,
        setCallingCode,
        setIsNumberValid,
        onSubmitEditing,
    } = props;

    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const onPressDropDown = () => {
        setShowCountryPicker(!showCountryPicker);
    };
    useEffect(() => {
        if (!phoneRegex.test(value)) {
            setIsNumberValid(false);
        } else {
            setIsNumberValid(true);
        }
    }, [value, countryCode]);

    const handlePhoneInputChange = input => {
        // Remove any spaces and extract only the last 10 digits
        let phoneNumber = input.replace(/\s/g, '');
        phoneNumber = phoneNumber.slice(-10);

        // setValue(phoneNumber);
        if (phoneNumber.length <= 10) {
            setValue(phoneNumber);
        }
    };

    return (
        <View style={{ marginVertical: 5 }}>
            {label && <Text style={styles.text}>{label}</Text>}
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    hitSlop={{
                        top: dynamicSize(20),
                        bottom: dynamicSize(20),
                        left: dynamicSize(20),
                        right: dynamicSize(20),
                    }}
                    onPress={() => {
                        onPressDropDown();
                    }}
                    style={styles.searchIcon}>
                    <DropDownButton />
                    <Text style={styles.callingCode}>+{callingCode}</Text>
                </TouchableOpacity>
                <TextInput
                    maxLength={15}
                    style={[styles.textContainerStyle]}
                    placeholder={'Enter Phone Number'}
                    value={value}
                    onChangeText={_text => {
                        handlePhoneInputChange(_text);
                    }}
                    placeholderTextColor={colors.GREY_MEDIUM}
                    keyboardType={'numeric'}
                    onSubmitEditing={() => {
                        if (onSubmitEditing) {
                            onSubmitEditing();
                        }
                    }}
                />
            </View>
            <View style={styles.countryPickerContainer}>
                {showCountryPicker && (
                    <CountryPicker
                        onSelect={value => {
                            setCallingCode(value?.callingCode[0]);
                            setCountryCode(value?.cca2);
                        }}
                        translation="eng"
                        cca2={'IN'}
                        countryCodes={['IN', 'NP']}
                        withCallingCode={true}
                        onClose={onPressDropDown}
                        visible={showCountryPicker}
                        withFlag>
                        <View />
                    </CountryPicker>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderRadius: dynamicSize(8),
        borderWidth: 1,
        borderColor: colors.GREY_BORDER,
        width: dimensions.fullWidth * 0.9,
        color: colors.GREY_MEDIUM,
        elevation: 0,
    },
    textContainerStyle: {
        color: colors.GREY_MEDIUM,
        ...fonts.NUNITO_500_14,
        // width: '75%',
        flex: 1,
        // backgroundColor: colors.BLACK,
    },
    textInputStyle: {
        margin: 0,
        padding: 0,
        ...fonts.NUNITO_500_14,
        color: colors.BLACK,
    },
    countryPickerButtonStyle: {
        margin: 0,
        padding: 0,
        ...fonts.NUNITO_500_14,
        width: '18%',
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        height: dynamicSize(56),
        width: dimensions.fullWidth * 0.9,
        // padding: 15,
        marginVertical: 5,
        borderColor: colors.GREY_BORDER,
        backgroundColor: 'transparent',
        // backgroundColor: colors.BLACK,
    },
    text: {
        ...fonts.NUNITO_600_14,
        width: dimensions.fullWidth * 0.9,
        ...Styles.default_text_color,
        // marginBottom: 5,
    },
    callingCode: {
        ...fonts.NUNITO_600_14,
        ...Styles.default_text_color,
    },
    searchIcon: {
        marginHorizontal: 15,
        flexDirection: 'row',
        // position: 'absolute',
    },
    countryPickerContainer: {
        position: 'absolute',
        height: 0,
        width: 0,
    },
});

export default CustomPhoneNumberInput;
