import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import TextSurroundedByLine from './TextSurroundedByLine';
import { dimensions, fonts } from '../../../styles';
import { getPartnerRestaurants } from '../../../redux/services/subscriptionService';
import { colors } from '../../../styles/colors';
import { dynamicSize } from '../../../utils/responsive';
import FastImage from 'react-native-fast-image';

const PartnersComponent = props => {
    const [partnerRestaurants, setPartnerRestaurantsArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, [setPartnerRestaurantsArr]);

    const fetchData = async () => {
        const response = await getPartnerRestaurants();
        setPartnerRestaurantsArr(response?.data?.data);
    };

    const renderItems = () => {
        return (
            partnerRestaurants &&
            partnerRestaurants.map((item, index) => (
                <View key={index} style={styles.item}>
                    <View style={styles.imageText}>
                        {item.restaurantImage && (
                            <FastImage
                                style={styles.imageTextImage}
                                source={{
                                    uri: item.restaurantImage,
                                }}
                            />
                        )}
                        {item.restaurantName && (
                            <Text style={styles.imageTextText}>
                                {item.restaurantName}
                            </Text>
                        )}
                    </View>
                </View>
            ))
        );
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.innerText}>
                    Our{' '}
                    <Text style={styles.changeColor}>Restaurants Partners</Text>
                </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderItems()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: dynamicSize(20),
    },
    container: {
        width: dimensions.fullWidth,
        display: 'flex',
        alignItems: 'center',
    },
    innerText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_16.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    changeColor: {
        color: colors.ORANGE_WHITE,
        fontWeight: '800',
    },
    item: {
        display: 'flex',
        width: dimensions.fullWidth / 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
    },

    imageText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageTextImage: {
        width: 80,
        height: 80,
        flexShrink: 0,
        borderRadius: 50,
        marginVertical: 6,
    },
    imageTextText: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.NUNITO_700_12.fontFamily,
    },
});

export default PartnersComponent;
