import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Styles, fonts, dimensions } from '../styles/index';
import { colors } from '../styles/colors';
import { sliceText } from '../utils';
import MapPinIcon from '../assets/icons/MapPin.svg';

const SelectLocationBtn = props => {
    const {
        addressUrl,
        setAddressUrl,
        geoLocationSearch,
        setGeoLocationSearch,
        navigateTo,
        navigation,
    } = props;

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(navigateTo, {
                    addressUrl: addressUrl,
                    setAddressUrl: setAddressUrl,
                    geoLocationSearch: geoLocationSearch,
                    setGeoLocationSearch: setGeoLocationSearch,
                });
            }}>
            <View style={[Styles.row_flex_start, styles.headerTextContainer]}>
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
    );
};

const styles = StyleSheet.create({
    headerTextContainer: {
        borderWidth: 1,
        borderColor: colors.GREY_BORDER,
        borderRadius: 8,
        height: 56,
        width: dimensions.fullWidth * 0.9,
        // margin: 5,
        paddingVertical: 15,
        paddingLeft: 15,
    },
    headerBoxText: {
        ...fonts.INTER_400_14,
        paddingLeft: 10,
        color: colors.GREY_MEDIUM,
    },
    icon: {
        size: 24,
        color: colors.BLACK,
    },
});

export default SelectLocationBtn;
