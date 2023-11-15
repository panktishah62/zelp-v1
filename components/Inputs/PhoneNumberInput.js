import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';

const PhoneNumberInut = props => {
    const [value, setValue] = useState('');
    const [formattedValue, setFormattedValue] = useState('');
    const [valid, setValid] = useState(false);
    const phoneInput = useRef(null);
    return (
        <View>
            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                layout="first"
                onChangeCountry={text => {}}
                onChangeText={text => {
                    setValue(text);
                }}
                onChangeFormattedText={text => {
                    setFormattedValue(text);
                }}
                withShadow
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
    },
    textInputStyle: {
        margin: 0,
        padding: 0,
        ...fonts.NUNITO_500_14,
        color: fonts.GREY_MEDIUM,
    },
    countryPickerButtonStyle: {
        margin: 0,
        padding: 0,
        ...fonts.NUNITO_500_14,
        width: '18%',
    },
});

export default PhoneNumberInut;
