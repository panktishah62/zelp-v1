import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import deliveryBoyImage from '../../assets/images/deliveryBoy.png';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import CallIcon from '../../assets/icons/call-icon.svg';
import TextIcon from '../../assets/icons/text-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'react-native';

const DeliveryBoyCard = props => {
    const callNumber = phoneNumber => {
        Linking.openURL(`tel:${phoneNumber}`).catch(error =>
            console.error('Error in opening phone app:', error),
        );
    };

    const sendWhatsAppMessage = (phoneNumber, message) => {
        Linking.openURL(
            `whatsapp://send?phone=${phoneNumber}&text=${message}`,
        ).catch(error => console.error('Error in opening WhatsApp:', error));
    };

    return (
        <View style={styles.container}>
            <Image source={deliveryBoyImage} style={styles.partnerIcon} />
            <View style={styles.details}>
                <View style={styles.detailsText}>
                    <Text style={styles.title}>Walter White</Text>
                    <Text style={styles.subtitle}>Delivery Boy</Text>
                </View>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => callNumber('8260169650')}>
                        <CallIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            sendWhatsAppMessage('8260169650', 'Hey there!')
                        }>
                        <TextIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(20),
        display: 'flex',
        flexDirection: 'row',
        gap: dynamicSize(10),
        paddingVertical: dynamicSize(12),
        paddingHorizontal: dynamicSize(10),
    },
    partnerIcon: {
        width: dynamicSize(50),
        height: dynamicSize(50),
    },
    details: {
        color: colors.BLACK,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    detailsText: {
        display: 'flex',
    },
    title: {
        color: colors.BLACK,
        fontWeight: 'bold',
        fontSize: normalizeFont(18),
    },
    subtitle: {
        color: colors.BLACK,
        fontSize: normalizeFont(16),
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        gap: dynamicSize(20),
        marginRight: dynamicSize(16),
    },
});

export default DeliveryBoyCard;
