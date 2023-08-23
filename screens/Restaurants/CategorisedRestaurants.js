import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import RestaurantCardLarge from '../../components/Restaurant/RestaurantCardLarge';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { BASE_URL, NETWORK_ERROR } from '../../redux/constants';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import { useSelector } from 'react-redux';
import { isPointInPolygon, isTimeInIntervals } from '../../utils';
import ComingSoon from '../../assets/images/soon.svg';

const CategorisedRestaurant = ({ route, navigation }) => {
    const { category } = route.params;
    const location = useSelector(state => state.address.location);
    const [restaurantData, setRestaurantData] = useState([]);
    const [isServableArea, setIsServableArea] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getAllRestaurants = (lat, long) => {
        fetch(
            `${BASE_URL}/restaurants/searchFoodItemByRestaurantsWithDistanceTiming/${category}/${lat}/${long}`,
        )
            .then(response => {
                if (!response.ok) {
                    throw new Error(NETWORK_ERROR);
                }
                return response.json();
            })
            .then(data => {
                const restaurants = data.restaurants.sort(function (a, b) {
                    return !isTimeInIntervals(a.restaurant._id.timings);
                });
                setRestaurantData(restaurants);
                setIsLoading(false);
            })
            .catch(error => {
                throw new Error(error);
            });
    };

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderWithTitle navigation={navigation} title={category} />
            ),
        });
    }, []);

    useEffect(() => {
        if (location && location.latitude && location.longitude) {
            setIsLoading(true);
            setLatitude(location.latitude);
            setLongitude(location.longitude);
            setIsServableArea(
                isPointInPolygon([location.latitude, location.longitude]),
            );
            getAllRestaurants(location.latitude, location.longitude);
        }
    }, [location]);

    return (
        <View style={[Styles.center, styles.container]}>
            {isServableArea && !isLoading && (
                <ScrollView>
                    {restaurantData &&
                        restaurantData.length > 0 &&
                        restaurantData.map((restaurant, index) => {
                            return (
                                <RestaurantCardLarge
                                    restaurant={restaurant.restaurant._id}
                                    distance={restaurant.distance}
                                    time={restaurant.time}
                                    navigation={navigation}
                                    key={index}
                                />
                            );
                        })}
                </ScrollView>
            )}
            {!isServableArea && (
                <View style={styles.commingSoon}>
                    <ComingSoon />
                    <Text style={styles.commingSoonText}>
                        Sit Tight !! We will be coming soon to your location.
                    </Text>
                </View>
            )}
            {isLoading && (
                <View style={[Styles.center, { flex: 1 }]}>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.WHITE,
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
    },
    commingSoon: {
        height: dimensions.fullHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commingSoonText: {
        ...fonts.NUNITO_800_14,
        paddingTop: 20,
        textAlign: 'center',
        ...Styles.default_text_color,
    },
});

export default CategorisedRestaurant;
