import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    CategoryData,
    FrokersData,
    RestaurantsData,
} from '../../assets/Data/testData';
import CategoryCard from '../../components/Cards/CategoryCard';
import FrokerCard from '../../components/Cards/FrokerCard';
import RestaurantCard from '../../components/Restaurant/RestaurantCardSmall';
import FoodItemSlider from '../../components/Sliders/FoodItemSlider';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { isPointInPolygon, isTimeInIntervals } from '../../utils';
import ComingSoon from '../../assets/images/soon.svg';
import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import OfferCard from '../../components/Cards/Offers/OfferCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
    getOffersRestaurants,
    getTopRated,
} from '../../redux/services/restaurantService';
import BannerOnHomeScreen from '../../components/Banners/BannerOnHomeScreen';

const Explore = props => {
    const { location, navigation } = props;
    const ref = useRef(null);
    const [categories, setCategories] = useState(CategoryData);
    const [frokers, setFrokers] = useState(FrokersData);
    const [foodItems, setFoodItems] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // new state variable for loading
    const [isServableArea, setIsServableArea] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [index, setIndex] = React.useState(0);

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
                }
                setIsLoading(false); // set loading to false after fetch
            })
            .catch(error => {
                throw new Error(error);
            });
    };

    const getAllOffers = async (lat, long) => {
        await getOffersRestaurants(lat, long)
            .then(response => response?.data)
            .then(data => {
                if (data) {
                    const restaurants = data?.restaurants.sort(function (a, b) {
                        return !isTimeInIntervals(a?.restaurant?.timings);
                    });
                    setOffers(restaurants);
                    setIsLoading(false); // set loading to false after fetch
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    };

    const getRefreshedRestaurants = () => {
        setIsLoading(true); // set loading to true before fetch
        setIsServableArea(false);
        if (location?.latitude && location?.longitude) {
            const isServableArea_ = isPointInPolygon([
                location.latitude,
                location.longitude,
            ]);
            setIsServableArea(isServableArea_);
            if (isServableArea_) {
                getAllRestaurants(location.latitude, location.longitude);
                getAllOffers(location.latitude, location.longitude);
            } else {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            getRefreshedRestaurants();
        }
    }, [location?.latitude]);

    const Restaurants = ({ item }) => {
        return (
            <RestaurantCard restaurantObject={item} navigation={navigation} />
        );
    };

    const Categories = ({ item }) => {
        return (
            <CategoryCard
                category={item.category}
                image={item.image}
                onClick={() => {
                    navigation.navigate('CategorisedRestaurant', {
                        category: item.category,
                    });
                }}
            />
        );
    };

    const Offers = ({ item, index }) => {
        return (
            <OfferCard
                restaurant={item.restaurant}
                navigation={navigation}
                key={index}
            />
        );
    };

    const insets = useSafeAreaInsets();
    const dynamicStyles = useSelector(state => state.dynamicStyles);

    return (
        <View style={{ flex: 1 }}>
            <View
                style={styles.container}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={() => {
                //             // Handle the refresh here
                //             setRefreshing(true);
                //             getRefreshedRestaurants();
                //             setRefreshing(false);
                //         }}
                //     />
                // }
            >
                {!isLoading && isServableArea && (
                    <View>
                        <BannerOnHomeScreen navigation={navigation} />
                        {/* Choose from categories */}
                        <View style={styles.container1}>
                            <Text style={styles.title}>
                                Want To Try Any Of These?
                            </Text>
                            <View style={styles.innerContainer}>
                                {categories.map((category, index) => {
                                    return (
                                        <Categories
                                            item={category}
                                            key={category._id}
                                        />
                                    );
                                })}
                            </View>
                        </View>

                        {offers.length > 0 && (
                            <View
                                style={[
                                    styles.container3,
                                    offers.length < 2 &&
                                        styles.carouselSingleHeight,
                                ]}>
                                <Text style={styles.title}>
                                    Get the best Offers
                                </Text>
                                <View style={styles.carousel}>
                                    <Carousel
                                        ref={ref}
                                        data={offers}
                                        renderItem={Offers}
                                        layout={'default'}
                                        sliderWidth={dimensions.fullWidth}
                                        itemWidth={dimensions.fullWidth}
                                        onSnapToItem={index => setIndex(index)}
                                        useScrollView={true}
                                    />
                                </View>
                                <View style={styles.pagination}>
                                    <Pagination
                                        dotsLength={offers.length}
                                        activeDotIndex={index}
                                        carouselRef={ref}
                                        containerStyle={styles.pagination}
                                        dotStyle={{
                                            width: 5,
                                            height: 5,
                                            borderRadius: 5,
                                            marginHorizontal: 0,
                                            backgroundColor: colors.GREY_DARK,
                                        }}
                                        dotContainerStyle={
                                            styles.dotContainerStyle
                                        }
                                        inactiveDotOpacity={0.4}
                                        inactiveDotScale={0.6}
                                        tappableDots={true}
                                    />
                                </View>
                            </View>
                        )}

                        {/* Choose from frokers */}
                        <LinearGradient
                            style={styles.container2}
                            colors={[
                                colors.ORANGE_GRADIENT_LIGHT,
                                colors.ORANGE_GRADIENT_MEDIUM,
                            ]}>
                            <Text style={styles.titleWithoutPadding}>
                                Try From Our Top Frokers
                            </Text>
                            <View style={styles.innerContainer}>
                                {frokers.slice(0, 5).map((froker, index) => {
                                    return (
                                        <FrokerCard
                                            froker={froker}
                                            key={froker._id}
                                        />
                                    );
                                })}
                            </View>
                        </LinearGradient>

                        {/* Choose from Posts/reels */}
                        {/* <View style={styles.container3}>
        <Text style={styles.title}>Here Is A Small Sneak Peek...</Text>
        <FoodItemSlider />
      </View> */}

                        {/* Choose from Restaurants */}
                        <View style={styles.container4}>
                            <Text style={styles.title}>
                                Pick From Our Best Restaurants
                            </Text>
                            <View style={styles.innerContainer}>
                                {restaurants &&
                                    restaurants &&
                                    restaurants.map((restaurant, index) => {
                                        if (restaurant.restaurant) {
                                            return (
                                                <Restaurants
                                                    item={restaurant}
                                                    key={index}
                                                />
                                            );
                                        }
                                    })}
                            </View>
                        </View>
                    </View>
                )}
                {isLoading && (
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                )}
            </View>
            {!isLoading && (!isServableArea || restaurants.length === 0) && (
                <View
                    style={[
                        styles.commingSoon,
                        {
                            paddingTop:
                                dimensions.fullHeight * 0.15 -
                                insets.bottom -
                                insets.top,
                            height:
                                dimensions.fullHeight -
                                insets.bottom -
                                insets.top -
                                TAB_BAR_HEIGHT -
                                dynamicStyles.headerWithLocationHeight,
                        },
                    ]}>
                    <ComingSoon />
                    <Text style={styles.commingSoonText}>
                        Sit Tight !! We will be coming soon to your location.
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    container1: {
        width: dimensions.fullWidth,
        alignItems: 'center',
        backgroundColor: colors.ORANGE_GRADIENT_LIGHT,
    },
    container2: {
        width: dimensions.fullWidth,
        alignItems: 'center',
        justifyContent: 'center',
        height: 166,
        paddingTop: 20,
        paddingBottom: 20,
        marginVertical: 20,
    },
    innerContainer: {
        width: dimensions.fullWidth,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container3: {
        alignItems: 'center',
        // height: 250,
    },
    container4: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    titleWithoutPadding: {
        ...fonts.NUNITO_700_14,
        color: colors.GREY_DARK,
    },
    title: {
        ...fonts.NUNITO_700_14,
        color: colors.GREY_DARK,
        padding: 10,
        paddingTop: 25,
    },
    commingSoon: {
        height: dimensions.fullHeight,
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    commingSoonText: {
        ...fonts.NUNITO_800_14,
        paddingTop: 20,
        textAlign: 'center',
        ...Styles.default_text_color,
    },
    pagination: {
        height: 20,
        marginBottom: 10,
    },
    dotContainerStyle: {
        height: 10,
    },
    carousel: {
        paddingBottom: 0,
        marginBottom: 0,
        height: 200,
    },
    carouselSingleHeight: {
        height: 250,
    },
});

export default Explore;
