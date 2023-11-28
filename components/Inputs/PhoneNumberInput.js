import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';

const PhoneNumberInut = props => {
    const {
        label,
        value,
        setValue,
        countryCode,
        setCountryCode,
        setCallingCode,
        setIsNumberValid,
    } = props;
    const phoneInput = useRef(null);

    useEffect(() => {
        const isValidNumber = phoneInput?.current?.isValidNumber(value);
        setIsNumberValid(isValidNumber);
    }, [value, countryCode]);

    return (
        <View>
            {<Text style={styles.text}>{label}</Text>}
            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode={countryCode}
                layout="first"
                onChangeCountry={text => {
                    setCountryCode(text?.cca2);
                    setCallingCode(text?.callingCode[0]);
                    setValue(value);
                }}
                onChangeText={text => {
                    const countryCode = phoneInput?.current?.getCountryCode();
                    const callingCode = phoneInput?.current?.getCallingCode();
                    setCountryCode(countryCode);
                    setCallingCode(callingCode);
                    setValue(text);
                }}
                withShado
                containerStyle={styles.containerStyle}
                textContainerStyle={styles.textContainerStyle}
                textInputStyle={styles.textInputStyle}
                countryPickerButtonStyle={styles.countryPickerButtonStyle}
            />
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
        // height: dynamicSize(56),
        borderTopRightRadius: dynamicSize(8),
        borderBottomRightRadius: dynamicSize(8),
        backgroundColor: colors.WHITE,
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
    text: {
        ...fonts.NUNITO_500_14,
        width: dimensions.fullWidth * 0.9,
        ...Styles.default_text_color,
        marginBottom: 5,
    },
});

export default PhoneNumberInut;
