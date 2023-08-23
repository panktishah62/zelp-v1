import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import WhatsAppIcon from '../../assets/icons/whatsappIcon.svg';
import { dynamicSize } from '../../utils/responsive';

export default IconButton = props => {
    const { text, onClick } = props;
    return (
        <TouchableOpacity style={styles.button} onPress={() => onClick()}>
            <WhatsAppIcon />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.WHATSAPP_GREEN,
        width: dynamicSize(250),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: dynamicSize(10),
        height: dynamicSize(65),
    },
    text: {
        ...fonts.NUNITO_600_16,
        color: colors.WHITE,
    },
});
