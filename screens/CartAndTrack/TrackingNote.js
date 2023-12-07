import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';
import RemoteConfigService from '../../redux/services/remoteConfigService';

const TrackingNote = () => {
    const OrderTrackingNote =
        RemoteConfigService.getRemoteValue('OrderTrackingNote').asString();
    return (
        <View style={styles.container}>
            <View style={styles.details}>
                <View style={styles.detailsText}>
                    <Text style={styles.title}>
                        <Text style={styles.subtext}>Note :</Text>{' '}
                        {OrderTrackingNote}
                    </Text>
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
        paddingVertical: dynamicSize(6),
        paddingHorizontal: dynamicSize(12),
        marginVertical: dynamicSize(8),
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
        fontSize: normalizeFont(12),
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
    subtext: {
        color: colors.BLACK,
        fontSize: normalizeFont(14),
        fontFamily: fonts.NUNITO_700_10.fontFamily,
    },
});

export default TrackingNote;
