import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AlertModal from './AlertModalComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fonts, Styles } from '../../styles';

const AppRating = () => {
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const close = () => {
        return setShow(false);
    };
    const closeAlert = () => {
        return setShowAlert(false);
    };

    return (
        <View>
            <AlertModal
                show={showAlert}
                closePopup={closeAlert}
                haveOutsideTouch={true}
                size={'28%'}>
                <View style={styles.alertContainer}>
                    <Text style={styles.headerTitle}>Enjoying Froker?</Text>
                    <View style={styles.line} />
                    <TouchableOpacity>
                        <Text style={styles.subtitle}>Rate Us</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <Text style={styles.subtitle}>Not Really </Text>
                    </TouchableOpacity>
                </View>
            </AlertModal>
            <BottomSheet
                show={show}
                closePopup={close}
                haveOutsideTouch={true}
                size={'50%'}>
                <View>
                    <Text style={styles.heading}>
                        We are sorry to hear that. Please help us with your
                        feedback to improve and grow.
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Suggestions"
                    />
                </View>
                <TouchableOpacity></TouchableOpacity>
            </BottomSheet>
        </View>
    );
};

export default AppRating;

const styles = StyleSheet.create({
    ratingText: {
        ...fonts.INTER_500_16,
        alignSelf: 'center',
        marginTop: 20,
    },
    headerTitle: {
        alignSelf: 'center',
        ...fonts.NUNITO_500_24,
        color: colors.ORANGE,
    },
    alertContainer: {
        marginTop: 20,
    },
    line: {
        width: dimensions.fullWidth * 0.8,
        height: 2,
        backgroundColor: colors.GREY_BORDER,
        margin: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    subtitle: {
        ...fonts.NUNITO_700_20,
        color: '#000000A6',
        alignSelf: 'center',
        marginTop: 5,
    },
    heading: {
        ...fonts.INTER_500_16,
        alignSelf: 'center',
        textAlign: 'left',
        margin: 10,
        marginTop: 10,
        ...Styles.default_text_color,
    },
    textInput: {
        marginTop: 10,
        height: '70%',
        width: '90%',
        borderWidth: 1,
        borderColor: 'gray',
        alignSelf: 'center',
        borderRadius: 8,
        ...Styles.default_text_color,
    },
});
