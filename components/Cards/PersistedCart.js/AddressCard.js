import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Location from '../../../assets/icons/map-pin.svg';
import { getAllAddress } from '../../../redux/actions/address';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import { sliceText } from '../../../utils';

const AddressCard = props => {
    const dispatch = useDispatch();
    const { address, navigation } = props;
    return (
        <TouchableOpacity
            style={[
                styles.container,
                address ? styles.addressFound : styles.addressNotFound,
            ]}
            onPress={() => {
                dispatch(getAllAddress());
                navigation.navigate('Address');
            }}>
            <View style={styles.innerContainer}>
                <View style={styles.iconContainer}>
                    <Location height={24} />
                </View>
                {address && address.address && (
                    <View style={styles.addressContainer}>
                        <Text style={styles.name}>
                            {sliceText(address.name, 60)}
                        </Text>
                        <Text style={styles.address}>
                            {sliceText(address.address, 60)}
                        </Text>
                        <Text style={styles.phone}>
                            Phone Number: {address.mobNo}
                        </Text>
                    </View>
                )}
                {!address && (
                    <View style={styles.addressContainer}>
                        <Text style={styles.name}>Select Address</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: colors.WHITE,
        borderRadius: 5,
        padding: 10,
        margin: 10,

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
    innerContainer: {
        width: dimensions.fullWidth - 40,
        flexDirection: 'row',
        padding: 10,
        // alignItems: 'center',
    },
    iconContainer: {},
    addressContainer: {},
    name: {
        ...fonts.NUNITO_700_14,
        color: colors.ORANGE,
        marginBottom: 5,
    },
    address: {
        marginBottom: 5,
        ...fonts.NUNITO_500_14,
        color: colors.GREY_MEDIUM,
        width: dimensions.fullWidth / 1.3,
    },
    phone: {
        ...fonts.NUNITO_500_14,
        color: colors.GREY_MEDIUM,
    },
    addressFound: {
        height: 130,
    },
    addressNotFound: {
        height: 60,
    },
});
export default AddressCard;
