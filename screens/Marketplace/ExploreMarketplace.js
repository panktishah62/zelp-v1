import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { getTopRated } from '../../redux/services/restaurantService';
import AuctionwithCategorySlider from '../../components/Sliders/AuctionwithCategorySlider';

const MarketplaceAuctions = props => {
    const { location, navigation } = props;
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // new state variable for loading
    const [isServableArea, setIsServableArea] = useState(true);

    const getAllRestaurants = async (lat, long) => {
        await getTopRated(lat, long)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    if (
                        data?.restaurants?.length &&
                        data?.restaurants?.length % 2 != 0
                    ) {
                        setRestaurants(
                            data.restaurants.slice(
                                0,
                                data.restaurants.length - 1,
                            ),
                        );
                    } else {
                        setRestaurants(data?.restaurants);
                    }
                    if (data?.restaurants?.length > 0) {
                        setIsServableArea(true);
                    } else {
                        setIsServableArea(false);
                    }
                } else {
                    setIsServableArea(false);
                }
                setIsLoading(false); // set loading to false after fetch
            })
            .catch(error => {
                throw new Error(error);
            });
    };

    useEffect(() => {
        getAllRestaurants(location.latitude, location.longitude);
    }, [location?.latitude]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                {!isLoading && isServableArea && restaurants?.length > 0 && (
                    <>
                        <View>
                            <AuctionwithCategorySlider
                                restaurants={restaurants}
                                navigation={navigation}
                            />
                        </View>
                        <View>
                            <AuctionwithCategorySlider
                                restaurants={restaurants}
                                navigation={navigation}
                            />
                        </View>
                    </>
                )}
                {isLoading && (
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default MarketplaceAuctions;
