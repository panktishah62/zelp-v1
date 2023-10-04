import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import TextSurroundedByLine from './TextSurroundedByLine';
import { dimensions, fonts } from '../../../styles';
import { getPartnerRestaurants } from '../../../redux/services/subscriptionService';
import { colors } from '../../../styles/colors';

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
            partnerRestaurants.map(item => (
                <View key={item.id} style={styles.item}>
                    <View style={styles.imageText}>
                        <Image
                            style={styles.imageTextImage}
                            source={{
                                uri: item.restaurantImage,
                            }}
                        />
                        <Text style={styles.imageTextText}>
                            {item.restaurantName}
                        </Text>
                    </View>
                </View>
            ))
        );
    };

    return (
        <View style={{ marginHorizontal: 4 }}>
            <View style={styles.container}>
                <Text style={styles.innerText}>
                    Our{" "}
                    <Text style={styles.changeColor}>
                        Restaurants Partners
                    </Text>
                </Text>
            </View>
            <ScrollView horizontal showsVerticalScrollIndicator={false}>
                {renderItems()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
        marginVertical:6
    },
    imageTextText: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.NUNITO_700_12.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.6,
    },
});

export default PartnersComponent;
