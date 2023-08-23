import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StyleSheet, View, Text } from 'react-native';
import { dimensions, fonts } from '../styles';
import { colors } from '../styles/colors';

export const toastConfig = {
    success: props => (
        <BaseToast
            style={[styles.container, styles.containerSuccess]}
            contentContainerStyle={styles.contentContainerStyle}
            text1Style={styles.text1Style}
            text2Style={styles.text2Style}
            {...props}
        />
    ),

    error: props => (
        <ErrorToast
            style={[styles.container, styles.containerError]}
            contentContainerStyle={styles.contentContainerStyle}
            text1Style={styles.text1Style}
            text2Style={styles.text2Style}
            {...props}
        />
    ),

    tomatoToast: props => (
        <View style={props.style ? props.style : styles.container}>
            <View
                style={
                    props.contentContainerStyle
                        ? props.contentContainerStyle
                        : styles.contentContainerStyle
                }>
                {props.text1 && (
                    <Text
                        style={
                            props.text1Style
                                ? props.text1Style
                                : styles.text1Style
                        }>
                        {props.text1}
                    </Text>
                )}
                {props.text2 && (
                    <Text
                        style={
                            props.text2Style
                                ? props.text2Style
                                : styles.text2Style
                        }>
                        {props.text2}
                    </Text>
                )}
            </View>
        </View>
    ),
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        width: dimensions.fullWidth - 100,
        maxHeight: 40,
        borderRadius: 20,
    },
    containerSuccess: {
        borderColor: colors.GREEN,
    },
    containerError: {
        borderColor: colors.RED,
    },
    containerTomato: {
        borderColor: colors.GREY_BORDER,
    },
    contentContainerStyle: {
        paddingHorizontal: 15,
    },
    text1Style: {
        ...fonts.NUNITO_500_12,
        width: dimensions.fullWidth - 130,
    },
    text2Style: {},
});
