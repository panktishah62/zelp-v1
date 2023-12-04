import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AuctionCard from '../Auction/AuctionCard';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';

export default AuctionwithCategorySlider = ({restaurants, navigation}) => {
    return (
        <View style={styles.container3}>
            <Text style={styles.title}>Auctions from Sports</Text>
            <ScrollView
                style={styles.container}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {restaurants.map((restaurant, index) => {
                    if (restaurant.restaurant) {
                        return <AuctionCard restaurantObject={restaurant} navigation={navigation} />
                    }
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    container3: {
        // alignItems: 'center',
        // height: 250,
        paddingBottom: 20,
    },
    title: {
        ...fonts.NUNITO_700_14,
        color: colors.GREY_DARK,
        padding: 10,
        alignItems: 'flex-start',
        paddingTop: 25,
    },
});
