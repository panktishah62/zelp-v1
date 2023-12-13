import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import HeaderWithTitle from '../../../components/Header/HeaderWithTitle';
import TextInput_ from '../../../components/Inputs/TextInput';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import { Button_ } from '../../../components/Buttons/Button';
import SelectLocationBtn from './../../../components/SelectLocationBtn';
import AddressChip from './../../../components/Buttons/AddressChip';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, editAddress } from '../../../redux/actions/address';
import { DialogTypes, phoneRegex } from '../../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showDialog } from '../../../redux/actions/dialog';
import CustomPhoneNumberInput from '../../../components/Inputs/CustomPhoneNumberInput';
import { dynamicSize } from '../../../utils/responsive';
import RemoteConfigService from '../../../redux/services/remoteConfigService';

const AddressEditing = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const previousAddressData = route.params;
    const action = previousAddressData.action;
    const countryCodeConfig = JSON.parse(
        RemoteConfigService.getRemoteValue('CountryCodeConfig')?.asString(),
    );

    const [addressType, setAddressType] = useState([
        { name: 'Home', selected: true },
        { name: 'Work', selected: false },
        { name: 'Friends and Family', selected: false },
        { name: 'Others', selected: false },
    ]);

    const [focus, setFocus] = useState(0);
    const [addressName, setAddressName] = useState('');
    const [otherName, setOtherName] = useState(
        previousAddressData.type == 'Others'
            ? previousAddressData.addressName
            : '',
    );
    const [addressUrl, setAddressUrl] = useState(
        previousAddressData.geoLocation ? previousAddressData.geoLocation : '',
    );
    const [geoLocationSearch, setGeoLocationSearch] = useState(
        previousAddressData.geoLocationSearch
            ? previousAddressData.geoLocationSearch
            : '',
    );

    const [addressDetails, setAddressDetails] = useState({
        line1: previousAddressData.line1 ? previousAddressData.line1 : '',
        line2: previousAddressData.line2 ? previousAddressData.line2 : '',
        zipCode: previousAddressData.zipCode
            ? String(previousAddressData.zipCode)
            : '',
        type: previousAddressData.type ? previousAddressData.type : '',
        phoneNumber: previousAddressData.phoneNo
            ? String(previousAddressData.phoneNo)
            : '',
        countryCode: previousAddressData?.countryCode
            ? previousAddressData?.countryCode
            : 'IN',
        callingCode: previousAddressData?.callingCode
            ? previousAddressData?.callingCode
            : '91',
    });

    const [selectedAddress, setSelected] = useState(
        addressDetails.type || 'Home',
    );

    const [phoneNumber, setPhoneNumber] = useState(
        previousAddressData?.phoneNo
            ? String(previousAddressData?.phoneNo)
            : '',
    );
    const [locationCountryCode, setLocationCountryCode] = useState(
        previousAddressData?.countryCode
            ? previousAddressData?.countryCode
            : Object.keys(countryCodeConfig)[0],
    );
    const [countryCode, setCountryCode] = useState(
        previousAddressData?.countryCode
            ? previousAddressData?.countryCode
            : Object.keys(countryCodeConfig)[0],
    );
    const [callingCode, setCallingCode] = useState(
        previousAddressData?.callingCode
            ? previousAddressData?.callingCode
            : Object.values(countryCodeConfig)[0].callingCode,
    );
    const [isNumberValid, setIsNumberValid] = useState(false);

    const setBlur = () => {
        setFocus(0);
    };

    const handleSubmit = () => {
        // navigation.navigate('AddressEditing');
        const dataToPost = {
            name:
                addressDetails.type != 'Others'
                    ? addressDetails.type
                    : otherName,
            mobNo: phoneNumber,
            address: `${addressDetails.line1}, ${addressDetails.line2}`,
            pinCode: addressDetails.zipCode,
            typeOfAddress: addressDetails.type,
            geoLocation: addressUrl,
            geoLocationSearch: geoLocationSearch,
            countryCode: countryCode,
            callingCode: callingCode,
        };
        if (!Object.keys(countryCodeConfig).includes(locationCountryCode)) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText:
                        'We are currently not servable in the selected location!',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (
            countryCodeConfig[locationCountryCode].callingCode != callingCode
        ) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText:
                        'Please select a country code valid to the selected location!',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!addressDetails.line1) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Address',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!phoneNumber) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Phone Number',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!addressDetails.type) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Address Type',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!addressDetails.zipCode) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Zip Code',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (
            addressDetails.zipCode.length !=
            countryCodeConfig[locationCountryCode].pinCodeLength
        ) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter valid Zipcode',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (phoneNumber.length !== 10) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText:
                        'Enter Phone Number with valid length of digits!',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!isNumberValid) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Not a valid Phone Number',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!addressUrl) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter Address Url',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (!geoLocationSearch) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter GeoLocation Search',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else if (addressDetails.type === 'Others' && !otherName) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please enter type of address',
                    subTitleText: '',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            setIsLoading(true);
            switch (action) {
                case 'ADD':
                    dispatch(
                        addAddress(dataToPost, navigation, () =>
                            setIsLoading(false),
                        ),
                    );
                    break;
                case 'EDIT':
                    dispatch(
                        editAddress(
                            dataToPost,
                            previousAddressData.id,
                            navigation,
                            () => setIsLoading(false),
                        ),
                    );
                    break;
                default:
                    setIsLoading(false);
                    break;
            }
            // navigation.goBack();
        }
    };

    useEffect(() => {
        const updatedAddressType = addressType.map(address => {
            return {
                ...address,
                selected: address.name === addressDetails.type,
            };
        });
        setAddressType(updatedAddressType);
    }, []);

    useEffect(() => {
        const updatedAddressType = addressType.map(address => {
            return { ...address, selected: selectedAddress === address.name };
        });
        setAddressType(updatedAddressType);
        setAddressDetails({
            ...addressDetails,
            type: selectedAddress,
        });
    }, [selectedAddress]);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // return () => {
        //     Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
        //     Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        // };
    }, []);

    const _keyboardDidShow = e => {
        setKeyboardHeight(e.endCoordinates.height - insets.bottom);
    };

    const _keyboardDidHide = () => {
        setKeyboardHeight(0);
    };

    return (
        <View style={styles.mainContainer}>
            {!isLoading && (
                <KeyboardAwareScrollView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    contentContainerStyle={{ height: dimensions.fullHeight }}
                    showsVerticalScrollIndicator={false}>
                    {/* <HeaderWithTitle navigation={navigation} title={'Address'} /> */}
                    {/* Address Editing Form */}
                    <View style={styles.formContainerInner}>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTextStyle}>
                                Help the delivery agent to deliver faster with
                                detailed address
                            </Text>
                        </View>
                        <SelectLocationBtn
                            navigation={navigation}
                            addressUrl={addressUrl}
                            setAddressUrl={url => setAddressUrl(url)}
                            geoLocationSearch={geoLocationSearch}
                            setGeoLocationSearch={setGeoLocationSearch}
                            setCountryCode={setLocationCountryCode}
                            navigateTo={'SelectLocation'}
                        />
                        <TextInput_
                            text={addressDetails.line1}
                            setText={value =>
                                setAddressDetails({
                                    ...addressDetails,
                                    line1: value,
                                })
                            }
                            focused={focus === 1}
                            setFocus={() => setFocus(1)}
                            setBlur={() => setBlur()}
                            placeholder={'Address Line 1 ( Street, Area)*'}
                        />
                        <TextInput_
                            text={addressDetails.line2}
                            setText={value =>
                                setAddressDetails({
                                    ...addressDetails,
                                    line2: value,
                                })
                            }
                            focused={focus === 2}
                            setFocus={() => setFocus(2)}
                            setBlur={() => setBlur()}
                            placeholder={'Address Line 2 (House No, Building)'}
                        />
                        <TextInput_
                            text={addressDetails.zipCode}
                            setText={value =>
                                setAddressDetails({
                                    ...addressDetails,
                                    zipCode: value,
                                })
                            }
                            focused={focus === 3}
                            setFocus={() => setFocus(3)}
                            setBlur={() => setBlur()}
                            keyboardType={'numeric'}
                            placeholder={'Zip/Postal Code*'}
                            maxLength={
                                Object.keys(countryCodeConfig).includes(
                                    locationCountryCode,
                                )
                                    ? countryCodeConfig[locationCountryCode]
                                          .pinCodeLength
                                    : 10
                            }
                        />
                        <View style={{ marginVertical: dynamicSize(10) }}>
                            <CustomPhoneNumberInput
                                // label="Enter Your Mobile Number *"
                                value={phoneNumber}
                                setValue={setPhoneNumber}
                                countryCode={countryCode}
                                setCountryCode={setCountryCode}
                                callingCode={callingCode}
                                setCallingCode={setCallingCode}
                                setIsNumberValid={setIsNumberValid}
                            />
                        </View>
                        {/* Address Type Container */}
                        <View style={styles.textAreaContainerStyle}>
                            <Text style={styles.textAreaLabelStyle}>
                                Save As
                            </Text>
                            <View style={styles.addressTypeContainer}>
                                {addressType.map((address, index) => {
                                    if (
                                        address.name === 'Others' &&
                                        selectedAddress === 'Others'
                                    ) {
                                        return (
                                            <View
                                                style={[Styles.row]}
                                                key={index}>
                                                <AddressChip
                                                    key={index}
                                                    addressType={address.name}
                                                    selected={address.selected}
                                                    setSelected={setSelected}
                                                />
                                                <TextInput
                                                    style={[
                                                        {
                                                            borderColor:
                                                                focus === 6
                                                                    ? colors.ORANGE
                                                                    : colors.GREY_BORDER,
                                                        },
                                                        styles.addressNameStyle,
                                                    ]}
                                                    value={otherName}
                                                    onChangeText={value => {
                                                        setAddressName(value);
                                                        setOtherName(value);
                                                    }}
                                                    placeholder="Name of the Address"
                                                    onFocus={() => {
                                                        setFocus(6);
                                                    }}
                                                    onBlur={() => {
                                                        setBlur(false);
                                                    }}
                                                />
                                            </View>
                                        );
                                    } else {
                                        return (
                                            <AddressChip
                                                key={index}
                                                addressType={address.name}
                                                selected={address.selected}
                                                setSelected={setSelected}
                                            />
                                        );
                                    }
                                })}
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            )}
            {!isLoading && (
                <View
                    style={[
                        styles.btnPosStyle,
                        { bottom: Platform.OS === 'ios' ? keyboardHeight : 0 },
                    ]}>
                    <View style={Styles.center}>
                        <Button_
                            text={'Save Address'}
                            onClick={e => handleSubmit(e)}
                        />
                    </View>
                </View>
            )}
            {isLoading && (
                <View style={[Styles.center, { flex: 1 }]}>
                    <ActivityIndicator size={32} color={colors.ORANGE} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: dimensions.fullHeight,
        backgroundColor: colors.WHITE,
    },
    shadowStyle: {
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
    },
    infoTextContainer: {
        borderWidth: 1,
        borderColor: colors.ORANGE,
        borderRadius: 6,
        width: dimensions.fullWidth * 0.9,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 14,
    },
    infoTextStyle: {
        ...fonts.NUNITO_700_12,
        color: colors.ORANGE,
    },
    headerTextContainer: {
        borderWidth: 1,
        borderColor: colors.GREY_BORDER,
        borderRadius: 8,
        height: 56,
        margin: 5,
        paddingVertical: 15,
        paddingLeft: 15,
    },
    headerBoxText: {
        ...fonts.INTER_400_14,
        paddingLeft: 10,
    },
    formContainerInner: {
        paddingBottom: 5,
        ...Styles.center,
    },
    textAreaContainerStyle: {
        width: dimensions.fullWidth * 0.9,
    },
    textAreaLabelStyle: {
        ...fonts.NUNITO_500_16,
        margin: 5,
        ...Styles.default_text_color,
    },
    addressTypeContainer: {
        ...Styles.row_flex_start,
        flexWrap: 'wrap',
    },
    addressNameStyle: {
        width: dimensions.fullWidth * 0.5,
        height: 40,
        color: colors.GREY_MEDIUM,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 15,
        marginTop: 6,
        ...fonts.NUNITO_600_16,
    },
    btnPosStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.WHITE,
        padding: 15,
    },
    btnStyle: {
        height: 50,
        width: 0.9 * dimensions.fullWidth,
        borderRadius: 8,
        backgroundColor: colors.ORANGE,
    },
});

export default AddressEditing;
