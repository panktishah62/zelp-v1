/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import SteamingCup from '../../assets/icons/steaming-cup.svg';
import LocationPinWhite from '../../assets/icons/location-pin-white.svg';
import SingleItemDetails from './SingleItemDetails';
import { truncateString } from '../../utils';

const OrderItemDetailsCard = ({ itemsDetails }) => {
    return (
        <View style={styles.parentContainer}>
            <View style={styles.headerContaine}>
                <View style={styles.hotelDetails}>
                    <View
                        style={{
                            display: 'flex',
                            gap: dynamicSize(5),
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                        <SteamingCup />
                        <Text style={styles.detailsText}>
                            {truncateString(
                                itemsDetails.length > 0 &&
                                    itemsDetails[0]?.id.restaurant.name,
                                20,
                            )}
                        </Text>
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            gap: dynamicSize(5),
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                        <LocationPinWhite />
                        <Text style={styles.detailsText}>
                            {truncateString(
                                itemsDetails.length > 0 &&
                                    itemsDetails[0]?.id.restaurant.address.city,
                                15,
                            )}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.itemCard}>
                    {itemsDetails.map(item => (
                        <SingleItemDetails
                            key={item.id._id}
                            name={item.id.name}
                            isVeg={item.id.isVeg}
                            quantity={item.count}
                            price={item.id.price}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default OrderItemDetailsCard;

const styles = StyleSheet.create({
    parentContainer: {
        borderRadius: dynamicSize(18),
        width: dimensions.fullWidth - dynamicSize(40),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: dynamicSize(30),
    },
    container: {
        backgroundColor: colors.WHITE,
        paddingVertical: dynamicSize(20),
        borderRadius: dynamicSize(18),
        width: '100%',
        display: 'flex',
        gap: dynamicSize(25),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContaine: {
        width: '90%',
        // opacity: dynamicSize(0.9),
        display: 'flex',
        borderTopLeftRadius: dynamicSize(18),
        borderTopRightRadius: dynamicSize(18),
        paddingVertical: dynamicSize(8),
        paddingHorizontal: dynamicSize(10),
        backgroundColor: colors.GREY_DARK,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    hotelDetails: {
        display: 'flex',
        // backgroundColor: colors.BLACK,
        flex: 3,
        flexDirection: 'row',
        gap: dynamicSize(10),
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    detailsText: {
        color: colors.WHITE,
        fontFamily: fonts.NUNITO_700_16.fontFamily,
        fontSize: normalizeFont(16),
        fontStyle: 'normal',
        fontWeight: '700',
    },
    itemCard: {
        width: '95%',
        paddingHorizontal: dynamicSize(10),
        display: 'flex',
        gap: dynamicSize(16),
    },
});
