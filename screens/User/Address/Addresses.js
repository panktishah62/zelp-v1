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
import { hideDialogBox, showDialogBox } from '../../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button_ } from '../../../components/Buttons/Button';

const getFullAddress = (address, locality, pinCode, city, state) => {
    return `${address}, ${locality}, ${city} ${pinCode}, ${state}`;
};
const Addresses = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const _addresses = useSelector(state => state.address.addresses);
    const _defaultAddress = useSelector(state => state.address.defaultAddress);
    const [addresses, setAddresses] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            setAddresses(_addresses);
            if (_defaultAddress && _defaultAddress._id) {
                setSelectedItem(_defaultAddress._id);
            } else {
                setSelectedItem(null);
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [_addresses, _defaultAddress]);

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderWithTitle navigation={navigation} title={'Addresses'} />
            ),
        });

        setAddresses(_addresses);
        if (_defaultAddress && _defaultAddress._id) {
            setSelectedItem(_defaultAddress._id);
        } else {
            setSelectedItem(null);
        }
    }, [navigation]);

    const isLoggedIn = async () => {
        try {
            const _token = await AsyncStorage.getItem('token');
            if (_token != null && _token != '') {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            showDialogBox('', error.message, 'warning', 'OK', true);
        }
    };

    onPressLogin = () => {
        hideDialogBox();
        navigation.navigate('LogIn');
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <View style={styles.container}>
            {addresses && addresses.length && !isLoading ? (
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
                        {addresses &&
                            addresses.length > 0 &&
                            addresses.map((address, index) => {
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
                                        selectedItem={selectedItem}
                                        setSelectedItem={setSelectedItem}
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
                                    />
                                );
                            })}
                    </View>
                </ScrollView>
            ) : (
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
                )
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
                                showDialogBox(
                                    'Please LogIn',
                                    'You are not Logged In!',
                                    'warning',
                                    'Login',
                                    true,
                                    onPressLogin,
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
        color: '#00000065',
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
