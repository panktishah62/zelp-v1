import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { colors } from '../../styles/colors';
import OTPTextView from 'react-native-otp-textinput';

const OTPInput = props => {
    const { number, setNumber } = props;
    return (
        <View style={styles.container}>
            <OTPTextView
                tintColor={colors.RED_PRIMARY}
                offTintColor={colors.GREY_BORDER}
                textInputStyle={styles.textInputStyle}
                handleTextChange={text => {
                    setNumber(text);
                }}
                containerStyle={styles.textInputContainer}></OTPTextView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    textInputStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderBottomWidth: 1,
        height: 64,
        width: 64,
        color: colors.RED_PRIMARY,
    },
    textInputContainer: {
        // marginBottom: 20,
    },
});

export default OTPInput;
