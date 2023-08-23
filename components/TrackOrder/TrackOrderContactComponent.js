import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Platform,
} from 'react-native';
import Call from '../../assets/icons/call.svg';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { useSelector } from 'react-redux';

const TrackOrderContactComponent = () => {
    const serverData = useSelector(state => state.serverReducer);
    const phoneNumber = serverData?.config?.contactNo;

    const handlePhonePress = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
        <View style={{}}>
            <View style={styles.container}>
                <View style={styles.elevation1}>
                    <TouchableOpacity
                        onPress={handlePhonePress}
                        style={styles.touchableText}>
                        <View style={styles.icon}>
                            <Call />
                        </View>
                        <Text style={styles.title}>Contact Customer Care</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    elevation1: {
        padding: 20,
        borderRadius: 8,
        flexDirection: 'row',
        width: dimensions.fullWidth * 0.95,
        marginBottom: 15,
        backgroundColor: colors.WHITE,
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
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        // marginTop: -2,
        // marginRight: 10,
        borderWidth: 1,
        borderRadius: 50,
        padding: 5,
    },
    title: {
        ...fonts.NUNITO_700_12,
        color: '#000000A6',
        marginHorizontal: 5,
    },
    touchableText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default TrackOrderContactComponent;
