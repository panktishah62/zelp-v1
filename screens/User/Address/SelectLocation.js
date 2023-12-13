import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import HeaderWithTitle from '../../../components/Header/HeaderWithTitle';
import { Styles, fonts, dimensions } from './../../../styles/index';
import { colors } from './../../../styles/colors';
import { Button_ } from './../../../components/Buttons/Button';
import { sliceText } from '../../../utils';
import MapPinIcon from '../../../assets/icons/MapPin.svg';

const SelectLocation = ({ route, navigation }) => {
    const {
        addressUrl,
        setAddressUrl,
        geoLocationSearch,
        setGeoLocationSearch,
        setCountryCode,
    } = route.params;

    const setAddressChange = (
        changedAddress,
        changedGeoLocationSearch,
        selectedCountryCode,
    ) => {
        setAddressUrl(changedAddress);
        setGeoLocationSearch(changedGeoLocationSearch);
        setCountryCode(selectedCountryCode);
        navigation.goBack();
    };

    return (
        <View style={Styles.center}>
            <HeaderWithTitle title={'Address'} navigation={navigation} />
            <View style={{ marginVertical: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('MapScreen', {
                            addressUrl: addressUrl,
                            setAddressUrl: setAddressChange,
                        });
                    }}>
                    <View
                        style={[
                            Styles.row_flex_start,
                            styles.headerTextContainer,
                        ]}>
                        <MapPinIcon />
                        {geoLocationSearch ? (
                            <Text style={styles.headerBoxText}>
                                {sliceText(geoLocationSearch, 30)}
                            </Text>
                        ) : (
                            <Text style={styles.headerBoxText}>
                                Select Your Location
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            <Button_
                text="Use My Current Location"
                onClick={() => {
                    navigation.navigate('MapScreen', {
                        addressUrl: addressUrl,
                        setAddressUrl: setAddressChange,
                    });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerTextContainer: {
        borderWidth: 1,
        borderColor: colors.GREY_BORDER,
        borderRadius: 8,
        height: 56,
        width: dimensions.fullWidth * 0.9,
        margin: 5,
        paddingVertical: 15,
        paddingLeft: 15,
    },
    headerBoxText: {
        ...fonts.INTER_400_14,
        paddingLeft: 10,
        ...Styles.default_text_color,
    },
    icon: {
        size: 24,
        color: colors.BLACK,
    },
});

export default SelectLocation;
