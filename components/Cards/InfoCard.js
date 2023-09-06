import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Platform,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles/index';
import { colors } from '../../styles/colors';
import { useDispatch } from 'react-redux';
import { showDialog } from '../../redux/actions/dialog';
import { DialogTypes } from '../../utils';
const InfoCard = props => {
    const image = props.image;
    const type = props.type;

    const dispatch = useDispatch();
    const handlePress = () => {
        try {
            if (type === 'CONTACT_NUM') {
                Linking.openURL(`tel:${props.text}`).catch(error => {
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Cannot Open Phone, please try again!',
                            subTitleText: '',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.WARNING,
                        }),
                    );
                });
            } else if (type === 'EMAILID') {
                Linking.openURL(`mailto:${props.text}`).catch(error => {
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText:
                                'Cannot Open Mail Box, please try again!',
                            subTitleText: '',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.WARNING,
                        }),
                    );
                });
            }
        } catch (error) {}
    };
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.card, styles.boxShadow, styles.elevation]}>
            <View style={styles.icon}>{image}</View>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth * 0.95,
        borderRadius: 8,
        padding: 20,
        marginVertical: 10,
    },
    elevation: {
        backgroundColor: colors.WHITE,
        borderRadius: 10,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    boxShadow: {
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        marginVertical: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
    text: {
        ...fonts.NUNITO_600_14,
        color: colors.BLACK,
    },
});

export default InfoCard;
