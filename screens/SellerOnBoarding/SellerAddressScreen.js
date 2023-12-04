import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Button,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles/index';
import { colors } from '../../styles/colors';
import AddressCard from '../User/Address/AddressCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import EmptyAddresses from '../../assets/icons/emptyAddresses.svg';
import { DialogTypes } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button_ } from '../../components/Buttons/Button';
import { getAllAddress } from '../../redux/actions/address';
import { hideDialog, showDialog } from '../../redux/actions/dialog';
import { dynamicSize } from '../../utils/responsive';
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';

const getFullAddress = (address, locality, pinCode, city, state) => {
    return `${address}, ${locality}, ${city} ${pinCode}, ${state}`;
};

const SellerAddressScreen = props => {
    const { navigation, route } = props;
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const _addresses = useSelector(state => state.address.addresses);
    const _defaultAddress = useSelector(state => state.address.defaultAddress);
    const [isLoading, setIsLoading] = useState(false);

    const addAdressHandle = () => {
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
    };

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
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={[
                        styles.shadowStyle,
                        styles.scrollContainer,
                    ]}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Text style={styles.heading}>
                            Please select your Shipping address or add a new
                            one.
                        </Text>
                        {_addresses && _addresses.length > 0 && !isLoading && (
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
                                                addressType={
                                                    address.typeOfAddress
                                                }
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
                                                countryCode={
                                                    address?.countryCode
                                                }
                                                callingCode={
                                                    address?.callingCode
                                                }
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
                        )}
                        {(!_addresses || _addresses.length == 0) &&
                            !isLoading && (
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
                                <ActivityIndicator
                                    size="large"
                                    color={colors.ORANGE}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>
                <View style={styles.stickyContainer}>
                    <StickyBottomButton
                        title={'Next'}
                        pressHandler={() => navigation.navigate('StartAuction')}
                    />
                    <TouchableOpacity
                        style={styles.secondaryButtonContainer}
                        onPress={addAdressHandle}>
                        <Text style={styles.secondaryButtonText}>
                            Add new address
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
        backgroundColor: colors.WHITE,
    },
    mainCon: {
        marginLeft: 30,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        flexDirection: 'column',
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
    },
    scrollContainer: {
        // paddingHorizontal: 10,
        // paddingBottom: 100,
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
    heading: {
        ...fonts.NUNITO_800_28,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        paddingTop: dynamicSize(20),
        marginBottom: dynamicSize(20),
    },
    heading2: {
        ...fonts.NUNITO_500_16,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        // paddingTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
    },

    stickyContainer: {
        paddingTop: 20,
        flex: 1,
        height: dynamicSize(120),
        backgroundColor: colors.WHITE,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonContainer: {
        alignItems: 'center',
        alignContent: 'center',
    },
    secondaryButtonText: {
        ...fonts.NUNITO_700_16,
        padding: 15,
        alignItems: 'center',
        color: colors.ORANGE_GRADIENT_DARK,
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
});

export default SellerAddressScreen;
