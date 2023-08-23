import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';

const TextInput_ = props => {
    const {
        text,
        setText,
        focused,
        setFocus,
        setBlur,
        label,
        placeholder,
        keyboardType,
        disabled,
        maxLength,
        onSubmitEditing,
    } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TextInput
                maxLength={maxLength ? maxLength : 100}
                style={[
                    {
                        borderColor: focused
                            ? colors.ORANGE
                            : colors.GREY_BORDER,
                        backgroundColor: !disabled
                            ? colors.WHITE
                            : colors.BACKGROUND_WHITE,
                    },
                    styles.textContainerStyle,
                ]}
                editable={!disabled}
                placeholder={placeholder}
                value={text}
                onChangeText={_text => {
                    setText(_text);
                }}
                onFocus={setFocus}
                onBlur={setBlur}
                placeholderTextColor={colors.GREY_MEDIUM}
                keyboardType={keyboardType}
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
        borderRadius: 8,
        borderWidth: 1,
        height: dynamicSize(56),
        width: dimensions.fullWidth * 0.9,
        // margin: 5,
        padding: 15,
        color: colors.GREY_MEDIUM,
        ...fonts.NUNITO_500_14,
        marginVertical: 5,
    },
    text: {
        ...fonts.NUNITO_500_14,
        width: dimensions.fullWidth * 0.9,
        ...Styles.default_text_color,
        // margin: 5,
    },
});

export default TextInput_;
