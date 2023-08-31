import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    FlatList,
} from 'react-native';
import RestaurantCardLarge from '../../components/Restaurant/RestaurantCardLarge';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { LiveTrackingContainer } from '../../components/TrackOrder/LiveTrackingContainer';
import { useSelector } from 'react-redux';
import { GRANTED, isPointInPolygon, isTimeInIntervals } from '../../utils';
import ComingSoon from '../../assets/images/soon.svg';
import LocationPermission from '../../components/Buttons/LocationPermission';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAllRestaurants } from '../../redux/services/restaurantService';

const RestaurantsScreen = props => {
    const { navigation, route } = props;
    const { navigateTo } = route.params ? route.params : {};
    //uncomment this to fetch data from an API
    const insets = useSafeAreaInsets();
    const location = useSelector(state => state.address.location);
    const [restaurantData, setrestaurantData] = useState([]);
    const [isServableArea, setIsServableArea] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const locationPermission = useSelector(
        state => state.permissions.locationPermission,
    );
    const flatListRef = useRef(null);
    const [refreshing, setRefreshing] = useState(false);
    const [restaurantIdToIndex, setRestaurantIdToIndex] = useState({});
    const [page, setPage] = useState(1);
    const [nextPageLoading, setNextPageLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const LIMIT = 10;

    const fetchData = async (lat, long, _page) => {
        await getAllRestaurants(lat, long, _page ? _page : page, LIMIT)
            .then(response => response?.data)
            .then(data => {
                if (page == 1 || _page) {
                    setrestaurantData(data?.restaurants);
                } else {
                    setrestaurantData([
                        ...restaurantData,
                        ...data?.restaurants,
                    ]);
                }
                if (data?.pagination?.next) {
                    setHasNextPage(true);
                    setPage(data?.pagination?.next?.page);
                } else {
                    setHasNextPage(false);
                    setPage(1);
                }
                setNextPageLoading(false);
                setIsLoading(false);
            });
    };
    const handleEndReached = () => {
        if (hasNextPage && !nextPageLoading) {
            if (location && location.latitude && location.longitude) {
                setNextPageLoading(true);
                fetchData(location.latitude, location.longitude);
            }
        }
    };

    getRefreshedRestaurants = async () => {
        setIsLoading(true);
        setIsServableArea(false);
        setNextPageLoading(false);
        if (location && location.latitude && location.longitude) {
            const isServableArea_ = isPointInPolygon([
                location.latitude,
                location.longitude,
            ]);
            setIsServableArea(isServableArea_);
            if (isServableArea_) {
                setIsLoading(true);
                await fetchData(location.latitude, location.longitude, 1);
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

    const handleScrollTo = index => {
        flatListRef.current.scrollToIndex({
            animated: true,
            index: index,
        });
        setIsLoading(false);
    };

    useEffect(() => {
        if (navigateTo && restaurantIdToIndex[navigateTo]) {
            handleScrollTo(restaurantIdToIndex[navigateTo]);
        }
    }, [restaurantIdToIndex]);

    const ITEM_HEIGHT = 170;

    const getItemLayout = useCallback(
        (data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
        }),
        [],
    );

    const _renderItem = (item, index) => {
        return (
            <View
                key={index}
                onLayout={event => {
                    let updatedValue = {};
                    updatedValue[item?.restaurant?._id] = index;
                    setRestaurantIdToIndex(idsToIndex => ({
                        ...idsToIndex,
                        ...updatedValue,
                    }));
                }}
                style={{ height: ITEM_HEIGHT }}>
                <RestaurantCardLarge
                    restaurant={item?.restaurant}
                    distance={item?.distance}
                    time={item?.time}
                    navigation={navigation}
                />
            </View>
        );
    };

    const renderLoader = () => {
        return (
            nextPageLoading && (
                <ActivityIndicator size="large" color={colors.ORANGE} />
            )
        );
    };

    return (
        <View style={styles.container}>
            {locationPermission === GRANTED && isLoading ? (
                <View styles={[styles.activityIndicator]}>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            ) : (
                <FlatList
                    data={restaurantData}
                    renderItem={({ item, index }) => _renderItem(item, index)}
                    ref={flatListRef}
                    getItemLayout={getItemLayout}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                // Handle the refresh here
                                setRefreshing(true);
                                getRefreshedRestaurants();
                                setRefreshing(false);
                            }}
                        />
                    }
                    onEndReached={handleEndReached}
                    ListFooterComponent={renderLoader}
                />
            )}

            {locationPermission === GRANTED &&
                !isLoading &&
                (!isServableArea ||
                    (page === 1 && restaurantData.length === 0)) && (
                    <View
                        style={[
                            styles.commingSoon,
                            {
                                height:
                                    dimensions.fullHeight * 0.8 -
                                    insets.bottom -
                                    insets.top,
                            },
                        ]}>
                        <ComingSoon />
                        <Text style={styles.commingSoonText}>
                            Sit Tight !! We will be coming soon to your
                            location.
                        </Text>
                    </View>
                )}
            <View style={styles.LiveTrackingContainer}>
                <LiveTrackingContainer navigation={navigation} />
            </View>
            <LocationPermission
                locationPermission={locationPermission}
                _style={styles.locationAccessDenied}
            />
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
        // paddingBottom: 50,
    },
    commingSoon: {
        height: dimensions.fullHeight * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commingSoonText: {
        ...fonts.NUNITO_800_14,
        paddingTop: 20,
        textAlign: 'center',
        ...Styles.default_text_color,
    },
    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // paddingVertical: dimensions.fullHeight * 0.3,
    },
    locationAccessDenied: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight * 1.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LiveTrackingContainer: {
        position: 'absolute',
        bottom: 0,
    },
});

export default RestaurantsScreen;
