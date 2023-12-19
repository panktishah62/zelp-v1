import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';

const ChatInput = props => {
    const {
        // text,
        setText,
        // focused,
        setFocus,
        // setBlur,
        placeholder,
        onSubmitEditing,
    } = props;

    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>{label}</Text> */}
            <TextInput
                maxLength={100}
                style={styles.textContainerStyle}
                placeholder={placeholder}
                // value={text}
                onChangeText={_text => {
                    setText(_text);
                }}
                onFocus={setFocus}
                // onBlur={setBlur}
                placeholderTextColor={colors.WHITE}
                keyboardType={'default'}
                onSubmitEditing={() => {
                    if (onSubmitEditing) {
                        onSubmitEditing();
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    textContainerStyle: {
        borderColor: colors.WHITE,
        borderRadius: 20,
        borderWidth: 1,
        height: dynamicSize(35),
        width: dimensions.fullWidth * 0.4,
        paddingLeft: 15,
        ...fonts.NUNITO_500_14,
        color: colors.WHITE,
        marginVertical: 5,
    },
});

export default ChatInput;
