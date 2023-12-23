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
import { isTimeInIntervals } from '../../utils';
import ComingSoon from '../../assets/images/soon.svg';
import VideoCam from '../../assets/ZelpIcons/VideoCam.svg';
import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import OfferCard from '../../components/Cards/Offers/OfferCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import {
    getOffersRestaurants,
    getTopRated,
} from '../../redux/services/restaurantService';
import BannerOnHomeScreen from '../../components/Banners/BannerOnHomeScreen';
import { dynamicSize } from '../../utils/responsive';

const Explore = props => {
    const { location, navigation } = props;
    const ref = useRef(null);
    const [categories, setCategories] = useState(CategoryData);
    const [frokers, setFrokers] = useState(FrokersData);
    const [foodItems, setFoodItems] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // new state variable for loading
    const [isServableArea, setIsServableArea] = useState(true);
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
        setIsServableArea(true);
        if (location?.latitude && location?.longitude) {
            if (location?.latitude && location?.longitude) {
                getAllRestaurants(location.latitude, location.longitude);
                getAllOffers(location.latitude, location.longitude);
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
                {!isLoading && isServableArea && restaurants?.length > 0 && (
                    <View>
                        {/* Choose from categories */}
                        {/* <View style={styles.container1} horizontal={true}>
                            <Text style={styles.title}>
                                Want To Try Any Of These?
                            </Text> */}
                        <ScrollView
                            style={styles.innerContainer}
                            horizontal={true}>
                            {categories.map((category, index) => {
                                return (
                                    <Categories
                                        item={category}
                                        key={category._id}
                                    />
                                );
                            })}
                        </ScrollView>
                        {/* </View> */}

                        <BannerOnHomeScreen navigation={navigation} />

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
                                {/* <View style={styles.liveShopContainer}></View> */}
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
                                colors.ORANGE_GRADIENT_MEDIUM,
                                colors.ORANGE_GRADIENT_LIGHT,
                            ]}>
                            <View style={styles.leftContainer}>
                                <Text style={styles.titleWithoutPadding}>
                                    Try From Our Top Frokers
                                </Text>
                            </View>
                            <View style={styles.rightContainer}>
                                <Text style={styles.lowestPriceText}>
                                    Lowest Prices
                                </Text>
                                <View style={styles.videoCamContainer}>
                                    <View style={styles.discountTextContainer}>
                                        <Text style={styles.discountText1}>
                                            UPTO
                                        </Text>
                                        <Text style={styles.discountText2}>
                                            25%
                                        </Text>
                                        <Text style={styles.discountText3}>
                                            OFF
                                        </Text>
                                    </View>
                                    <View style={styles.hooferView}>
                                        <Text style={styles.hooferText1}>
                                            only on
                                        </Text>
                                        <Text style={styles.hooferText2}>
                                            LIVE
                                        </Text>
                                    </View>
                                    <View style={styles.liveVideoTimer}>
                                        <Text>8m: 76s</Text>
                                        <Text>left</Text>
                                    </View>
                                    <View style={styles.watchBuyButton}>
                                        <Text>Watch and Buy</Text>
                                    </View>
                                    <View style={styles.liveCamPosition}>
                                        <VideoCam
                                            height={'180'}
                                            width={'180'}
                                        />
                                    </View>
                                </View>

                                {/* {frokers.map((froker, index) => {
                                    return (
                                        <FrokerCard
                                            froker={froker}
                                            key={froker._id}
                                        />
                                    );
                                })} */}
                            </View>
                        </LinearGradient>

                        {/* Choose from Posts/reels */}
                        <View style={styles.container3}>
                            <Text style={styles.title}>
                                Here Is A Small Sneak Peek...
                            </Text>
                            <FoodItemSlider />
                        </View>

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
            {!isServableArea && (
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
        // alignItems: 'center',
        backgroundColor: colors.ORANGE_GRADIENT_LIGHT,
    },
    container2: {
        width: dimensions.fullWidth,
        flexDirection: 'row',
        height: dynamicSize(250),
        marginVertical: 20,
    },
    leftContainer: {
        width: dimensions.fullWidth * 0.5,
        height: dynamicSize(180),
        backgroundColor: colors.BLUE_DARK,
    },
    rightContainer: {
        width: dimensions.fullWidth * 0.5,
        height: dynamicSize(180),
        // backgroundColor: colors.RED,
    },
    lowestPriceText: {
        ...fonts.NUNITO_700_14,
        color: colors.PINK_GRADIENT_DARK,
        alignSelf: 'center',
    },
    videoCamContainer: {
        width: dimensions.fullWidth * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    liveCamPosition: {
        position: 'absolute',
        right: dynamicSize(-12),
        // marginHorizontal: 10,
        // marginVertical: 10,
        // backgroundColor: colors.RED,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
    },
    discountTextContainer:{
        position: 'absolute',
        left: dynamicSize(12),
    },
    discountText1: {
        ...fonts.NUNITO_500_14,
        color: colors.WHITE,
    },
    discountText2: {
        ...fonts.NUNITO_700_18,
        color: colors.WHITE,
    },
    discountText3: {
        ...fonts.NUNITO_500_14,
        color: colors.WHITE,
    },
    hooferView: {
        position: 'absolute',
        right: dynamicSize(18),
        zIndex: 10,
    },
    hooferText1: {
        ...fonts.NUNITO_500_10,
        color: colors.WHITE,
    },
    hooferText2: {
        ...fonts.NUNITO_700_14,
        color: colors.PINK_GRADIENT_DARK,
    },
    innerContainer: {
        width: dimensions.fullWidth,
        flex: 1,
        flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
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
    liveShopContainer: {
        width: dimensions.fullWidth,
        height: 200,
        backgroundColor: colors.BLUE_DARK,
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