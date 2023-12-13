import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';
import { dimensions, fonts, Styles } from './../../../styles/index';
import { colors } from '../../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteAddress,
    getDefaultAddress,
    getUserCurrentOrSavedLocation,
    setDefaultAddressTo,
} from '../../../redux/actions/address';
import { sliceText } from '../../../utils';
import HomeIcon from '../../../assets/icons/HomeAddress.svg';
import LocationIcon from '../../../assets/icons/MapPin.svg';
import OtherAddressIcon from '../../../assets/icons/address-book.svg';

const AddressCard = ({
    index,
    id,
    addressName,
    addressType,
    address,
    fullAddress,
    pinCode,
    city,
    state,
    phoneNo,
    countryCode,
    callingCode,
    geoLocation,
    geoLocationSearch,
    navigation,
    setIsLoading,
}) => {
    const dispatch = useDispatch();
    const _defaultAddress = useSelector(state => state.address.defaultAddress);

    const iconNames = {
        home: <HomeIcon />,
        work: <LocationIcon />,
        others: <OtherAddressIcon />,
    };
    let iconType = addressType.toLowerCase();
    if (iconType !== 'home' && iconType !== 'work' && iconType !== 'others') {
        iconType = 'others';
    }

    const afterSelectDefault = () => {
        setIsLoading(false);
        navigation.goBack();
    };

    const iconName = iconNames[iconType];

    return (
        <TouchableOpacity
            style={[styles.cardContainer, styles.boxShadow, styles.elevation]}
            onPress={() => {
                setIsLoading(true);
                dispatch(setDefaultAddressTo(id, afterSelectDefault));
            }}>
            <View style={[Styles.row_space_between, styles.savedAddressCard]}>
                <View style={[Styles.row]}>
                    {/* <FontAwesome name={iconName} size={24} color={colors.BLACK} /> */}
                    {iconName}
                    <Text
                        style={[
                            fonts.NUNITO_700_14,
                            { marginLeft: 12 },
                            Styles.default_text_color,
                        ]}>
                        {addressType == 'Others' ? addressName : addressType}
                    </Text>
                </View>
            </View>
            <View style={styles.savedAddressTextStyle}>
                <View>
                    {fullAddress && (
                        <Text
                            style={[
                                fonts.NUNITO_600_12,
                                { color: colors.BLACK },
                            ]}>
                            {sliceText(fullAddress, 60)}
                        </Text>
                    )}
                    {phoneNo && (
                        <Text
                            style={[
                                fonts.NUNITO_600_12,
                                { color: colors.BLACK },
                            ]}>
                            Phone Number: +{callingCode} {phoneNo}
                        </Text>
                    )}
                </View>
                <View
                    style={[
                        Styles.row_flex_start,
                        {
                            paddingTop: 20,
                            paddingBottom: 10,
                        },
                    ]}>
                    <Text
                        style={styles.buttonStyle}
                        onPress={() => {
                            navigation.navigate('AddressEditing', {
                                id: id,
                                addressName: addressName,
                                line1: address.split(',')[0],
                                line2: address.split(',')[1],
                                zipCode: pinCode,
                                instruction: 'Some Instruction',
                                type: addressType,
                                phoneNo: phoneNo,
                                countryCode: countryCode,
                                callingCode: callingCode,
                                geoLocation: geoLocation,
                                geoLocationSearch: geoLocationSearch,
                                action: 'EDIT',
                            });
                        }}>
                        EDIT
                    </Text>
                    <Text
                        style={styles.buttonStyle}
                        onPress={() => {
                            setIsLoading(true);
                            dispatch(deleteAddress(id));
                            dispatch(
                                getUserCurrentOrSavedLocation(setIsLoading),
                            );
                        }}>
                        DELETE
                    </Text>
                    {/* <Text
                        style={[fonts.NUNITO_700_14, { color: colors.ORANGE }]}
                        onPress={() => {
                            Alert.alert('This feature is not yet available');
                        }}>
                        SHARE
                    </Text> */}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: dimensions.fullWidth * 0.95,
        borderRadius: 8,
        marginVertical: 10,
        justifyContent: 'center',
    },
    elevation: {
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        padding: 10,

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
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        marginVertical: 10,

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
    savedAddressCard: {
        paddingHorizontal: 10,
    },
    savedAddressTextStyle: {
        width: '65%',
        marginLeft: '12%',
    },
    buttonStyle: {
        marginRight: 20,
        ...fonts.NUNITO_700_14,
        color: colors.ORANGE,
    },
});

export default AddressCard;
