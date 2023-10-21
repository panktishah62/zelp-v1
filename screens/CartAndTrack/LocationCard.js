import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BigLocationIcon from '../../assets/icons/location-pin.svg';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { truncateString } from '../../utils';

const LocationCard = ({ address }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.subDetails}>
                    <BigLocationIcon />
                    <View>
                        <Text style={styles.homeText}>
                            Delivery to{' '}
                            <Text style={{ color: colors.ORANGE }}>
                                {address.name}
                            </Text>
                        </Text>

                        <Text style={styles.address}>
                            {truncateString(address.address, 40)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LocationCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        width: '100%',
        borderRadius: dynamicSize(18),
        paddingVertical: dynamicSize(15),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 0,
        gap: dynamicSize(10),
        marginBottom: dynamicSize(20),
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        gap: dynamicSize(10),
    },
    homeText: {
        color: colors.BLACK, // Text color
        fontFamily: fonts.NUNITO_700_14.fontFamily, // Font family
        fontSize: normalizeFont(18), // Font size
        fontStyle: 'normal', // Font style
        fontWeight: '700', // Font weight
        lineHeight: dynamicSize(24),
    },
    subDetails: {
        display: 'flex',
        flexDirection: 'row',
        gap: dynamicSize(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%',
        gap: dynamicSize(10),
    },
    address: {
        color: colors.BLACK, // Text color
        fontFamily: fonts.NUNITO_500_14.fontFamily, // Font family
        fontSize: normalizeFont(16), // Font size
        fontStyle: 'normal', // Font style
        fontWeight: '500', // Font weight
        lineHeight: dynamicSize(24), //
    },
    subdetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: dynamicSize(5),
        marginTop: dynamicSize(5),
        flexDirection: 'row',
    },
    normalText: {
        color: colors.BLACK, // Text color
        fontFamily: fonts.NUNITO_500_14.fontFamily, // Font family
        fontSize: normalizeFont(14), // Font size
        fontStyle: 'normal', // Font style
        fontWeight: '500', // Font weight
        lineHeight: dynamicSize(20), //
    },
    boldText: {
        color: colors.ORANGE_WHITE, // Text color
        fontFamily: fonts.NUNITO_700_14.fontFamily, // Font family
        fontSize: normalizeFont(14), // Font size
        fontStyle: 'normal', // Font style
        fontWeight: '700', // Font weight
        lineHeight: dynamicSize(20), //
    },
});
