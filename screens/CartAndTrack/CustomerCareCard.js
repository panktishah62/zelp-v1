import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import customerSupportImg from '../../assets/images/customerSupport.png';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import CallIcon from '../../assets/icons/call-icon.svg';
import TextIcon from '../../assets/icons/text-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import { fonts } from '../../styles';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../redux/actions/dialog';
import { DialogTypes } from '../../utils';

const CustomerCareCard = ({ number, order = null }) => {
    const dispatch = useDispatch();
    const callNumber = phoneNumber => {
        Linking.openURL(`tel:${phoneNumber}`).catch(error =>
            console.error('Error in opening phone app:', error),
        );
    };

    const sendWhatsAppMessage = (phoneNumber, message) => {
        Linking.openURL(
            `whatsapp://send?phone=${phoneNumber}&text=${message}`,
        ).catch(error => {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Cannot open WhatsApp!',
                    subTitleText:
                        'Please install WhatsApp or try again after sometime.',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        });
    };
    const messageText = order?.referenceId
        ? `Hi there! I wanted to talk about my order: ${order?.referenceId}`
        : order?._id
        ? `Hi there! I wanted to talk about my order: ${order?._id}`
        : 'Hey there!';

    return (
        <View style={styles.container}>
            <Image source={customerSupportImg} style={styles.partnerIcon} />
            <View style={styles.details}>
                <View style={styles.detailsText}>
                    <Text style={styles.title}>Having Issues?</Text>
                    <Text style={styles.subtitle}>Contact Us</Text>
                </View>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => callNumber(number)}>
                        <CallIcon />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            sendWhatsAppMessage(number, messageText)
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
        fontSize: normalizeFont(18),
        fontFamily: fonts.NUNITO_500_16.fontFamily,
    },
    subtitle: {
        color: colors.BLACK,
        fontSize: normalizeFont(20),
        fontFamily: fonts.NUNITO_700_24.fontFamily,
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        gap: dynamicSize(16),
        marginRight: dynamicSize(16),
    },
});

export default CustomerCareCard;
