import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { dimensions, fonts, Styles } from './../../../styles/index';
import { colors } from '../../../styles/colors';
import AddressCard from './AddressCard';
import HeaderWithTitle from '../../../components/Header/HeaderWithTitle';
import { useDispatch, useSelector } from 'react-redux';
import EmptyAddresses from '../../../assets/icons/emptyAddresses.svg';
import { DialogTypes } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button_ } from '../../../components/Buttons/Button';
import { getAllAddress } from '../../../redux/actions/address';
import { hideDialog, showDialog } from '../../../redux/actions/dialog';

const getFullAddress = (address, locality, pinCode, city, state) => {
    return `${address}, ${locality}, ${city} ${pinCode}, ${state}`;
};
const Addresses = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const _addresses = useSelector(state => state.address.addresses);
    const _defaultAddress = useSelector(state => state.address.defaultAddress);
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = async () => {
        try {
            const _token = await AsyncStorage.getItem('token');
            if (_token != null && _token != '') {
                setIsAuthenticated(true);
                setIsLoading(true);
                dispatch(getAllAddress(() => setIsLoading(false)));
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Something Went Wrong',
                    subTitleText: error?.message,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.ERROR,
                }),
            );
        }
    };

    onPressLogin = () => {
        navigation.navigate('LogIn');
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <View style={styles.container}>
            {_addresses && _addresses.length > 0 && !isLoading && (
                <ScrollView
                    contentContainerStyle={[
                        styles.shadowStyle,
                        styles.scrollContainer,
                    ]}
                    showsVerticalScrollIndicator={false}>
                    <Text
                        style={[
                            fonts.NUNITO_700_14,
                            styles.savedAddressTextStyle,
                        ]}>
                        Select Address
                    </Text>
                    <View style={styles.AddressCard}>
                        {_addresses &&
                            _addresses.length > 0 &&
                            _addresses.map((address, index) => {
                                return (
                                    <AddressCard
                                        key={index}
                                        index={index}
                                        id={address._id}
                                        addressName={address.name}
                                        addressType={address.typeOfAddress}
                                        fullAddress={getFullAddress(
                                            address.address,
                                            address.locality,
                                            address.pinCode,
                                            address.city,
                                            address.state,
                                        )}
                                        address={address.address}
                                        pinCode={address.pinCode}
                                        city={address.city}
                                        state={address.state}
                                        phoneNo={address.mobNo}
                                        geoLocation={
                                            address.geoLocation
                                                ? address.geoLocation
                                                : ''
                                        }
                                        geoLocationSearch={
                                            address.geoLocationSearch
                                                ? address.geoLocationSearch
                                                : ''
                                        }
                                        navigation={navigation}
                                        setIsLoading={setIsLoading}
                                    />
                                );
                            })}
                    </View>
                </ScrollView>
            )}
            {(!_addresses || _addresses.length == 0) && !isLoading && (
                <View style={styles.emptyImageContainer}>
                    <EmptyAddresses />
                    <Text
                        style={[
                            fonts.NUNITO_500_14,
                            Styles.default_text_color,
                        ]}>
                        Add Addresses to see them here!
                    </Text>
                </View>
            )}
            {isLoading && (
                <View style={[Styles.center, { flex: 1 }]}>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            )}

            <View style={styles.btnPosStyle}>
                <View style={Styles.center}>
                    <Button_
                        text={'Add New Address'}
                        onClick={() => {
                            if (isAuthenticated) {
                                navigation.navigate('AddressEditing', {
                                    action: 'ADD',
                                });
                            } else {
                                dispatch(
                                    showDialog({
                                        isVisible: true,
                                        titleText: 'Please LogIn',
                                        subTitleText: 'You are not Logged In!',
                                        buttonText1: 'LOGIN',
                                        buttonFunction1: () => {
                                            onPressLogin();
                                            dispatch(hideDialog());
                                        },
                                        type: DialogTypes.WARNING,
                                    }),
                                );
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: dimensions.fullHeight,
        backgroundColor: colors.WHITE,
    },
    scrollContainer: {
        paddingHorizontal: 10,
        paddingBottom: 100,
        backgroundColor: colors.WHITE,
        minHeight: dimensions.fullHeight,
        paddingBottom: dimensions.fullHeight * 0.1,
    },
    shadowStyle: {
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5,
    },
    savedAddressTextStyle: {
        color: colors.BLACK,
        marginVertical: 10,
    },
    btnPosStyle: { position: 'absolute', bottom: 10, left: 0, right: 0 },
    btnStyle: {
        height: 50,
        width: 0.9 * dimensions.fullWidth,
        borderRadius: 8,
        backgroundColor: colors.ORANGE,
    },
    AddressCard: {
        alignItems: 'center',
    },
    emptyImageContainer: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: dimensions.fullWidth,
    },
});

export default Addresses;
