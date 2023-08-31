import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorHandler } from '../../components/ErrorHandler/ErrorHandler';
import HeaderWithTitleAndSearch from '../../components/Header/HeaderWithTitleAndSearch';
import SearchTabForAll from '../../navigation/SearchTabForAll';
import { UNEXPECTED_ERROR } from '../../redux/constants';
import { GRANTED, isPointInPolygon, isTimeInIntervals } from '../../utils';
import ComingSoon from '../../assets/images/soon.svg';
import LocationPermission from '../../components/Buttons/LocationPermission';
import { colors } from '../../styles/colors';
import { dimensions, fonts, Styles } from '../../styles';
import {
    searchFoodItemByRestaurants,
    searchRestaurants_,
} from '../../redux/services/restaurantService';

const SearchDishesAndRestaurants = ({ navigation }) => {
    const dispatch = useDispatch();
    const [text, setTextInput] = useState('');
    const [location, setLocation] = useState({});
    const [isServableArea, setIsServableArea] = useState(false);
    const [isLoadingFoodItems, setIsLoadingFoodItems] = useState(false);
    const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);
    const [isFound, setIsFound] = useState(true);
    const [isSearched, setIsSearched] = useState(false);
    const locationPermission = useSelector(
        state => state.permissions.locationPermission,
    );
    const [searchedFoodItems, setSearchedFoodItems] = useState([]);
    const [searchedRestaurants, setSearchedRestaurants] = useState([]);
    const locationCoordinates = useSelector(state => state.address.location);

    const SearchFoodItems = async (text_, location) => {
        try {
            // perform search for food items with the given query
            await searchFoodItemByRestaurants(
                text_,
                location?.latitude,
                location?.longitude,
            )
                .then(response => response?.data)
                .then(data => {
                    if (data.status === 'success') {
                        setIsLoadingFoodItems(false);
                        const restaurants = data.restaurants.sort(function (
                            a,
                            b,
                        ) {
                            return !isTimeInIntervals(a.restaurant._id.timings);
                        });
                        setSearchedFoodItems(restaurants);
                    } else {
                        setIsLoadingFoodItems(false);
                        throw new Error(
                            data.message ? data.message : UNEXPECTED_ERROR,
                        );
                    }
                })
                .catch(error => {
                    setIsLoadingFoodItems(false);
                    throw new Error(error);
                });
            setIsLoadingFoodItems(false);
        } catch (error) {
            setIsLoadingFoodItems(false);
            throw new Error(error);
        }
    };
    const SearchRestaurants = async (text_, location) => {
        try {
            await searchRestaurants_(
                text_,
                location?.latitude,
                location?.longitude,
            )
                .then(response => response?.data)
                .then(data => {
                    if (data && data.status === 'success') {
                        setIsLoadingRestaurants(false);
                        const restaurants = data.restaurants.sort(function (
                            a,
                            b,
                        ) {
                            return !isTimeInIntervals(a.restaurant._id.timings);
                        });
                        setSearchedRestaurants(restaurants);
                    } else {
                        setIsLoadingRestaurants(false);
                        throw new Error(
                            data.message ? data.message : UNEXPECTED_ERROR,
                        );
                    }
                })
                .catch(error => {
                    setIsLoadingRestaurants(false);
                    throw new Error(error);
                });
            setIsLoadingRestaurants(false);
        } catch (error) {
            setIsLoadingRestaurants(false);
            throw new Error(error);
        }
    };

    const search = async (text_, location) => {
        setLocation(location);
        setIsSearched(true);
        if (locationPermission === GRANTED && isServableArea) {
            setIsLoadingFoodItems(true);
            setIsLoadingRestaurants(true);
            SearchFoodItems(text_, location);
            SearchRestaurants(text_, location);
        } else if (!isServableArea) {
            setIsLoadingFoodItems(false);
            setIsLoadingRestaurants(false);
        }
    };

    const setText = text_ => {
        setTextInput(text_);
        setIsFound(true);
        setIsSearched(false);
        setSearchedFoodItems([]);
        setSearchedRestaurants([]);
        setIsLoadingFoodItems(false);
        setIsLoadingRestaurants(false);
    };

    const onBack = () => {
        setIsSearched(false);
        setText('');
        setIsServableArea(false);
        setSearchedFoodItems([]);
        setSearchedRestaurants([]);
        setIsLoadingFoodItems(false);
        setIsLoadingRestaurants(false);
    };

    useEffect(() => {
        if (
            locationCoordinates &&
            locationCoordinates.latitude &&
            locationCoordinates.longitude
        ) {
            setIsServableArea(
                isPointInPolygon([
                    locationCoordinates.latitude,
                    locationCoordinates.longitude,
                ]),
            );
        }
    }, [locationCoordinates]);

    useEffect(() => {
        navigation.setOptions({
            header: () => (
                <HeaderWithTitleAndSearch
                    title={'Search for dishes and restaurants'}
                    navigation={navigation}
                    placeholder={'Search Menu'}
                    text={text}
                    setText={setText}
                    keyboardType={'default'}
                    onBack={onBack}
                    search={search}
                />
            ),
        });
    }, [navigation, text]);

    return (
        <ErrorHandler>
            <View style={styles.container}>
                {isServableArea &&
                    locationPermission === GRANTED &&
                    text &&
                    text.length > 0 &&
                    isSearched &&
                    !isLoadingFoodItems &&
                    !isLoadingRestaurants && (
                        <SearchTabForAll
                            searchFoodItems={searchedFoodItems}
                            searchRestaurants={searchedRestaurants}
                            location={location}
                        />
                    )}
                {isServableArea &&
                    locationPermission === GRANTED &&
                    searchedFoodItems &&
                    searchedFoodItems.length == 0 &&
                    searchedRestaurants &&
                    searchedRestaurants.length == 0 &&
                    !isLoadingFoodItems &&
                    !isLoadingRestaurants &&
                    !isSearched && (
                        <View style={styles.tapOnSearch}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    search(text, location);
                                }}>
                                <Text style={styles.text}>
                                    Tap on Search after entering text.
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    )}

                {isServableArea &&
                    locationPermission === GRANTED &&
                    (isLoadingFoodItems || isLoadingRestaurants) && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                size="large"
                                color={colors.ORANGE}
                            />
                        </View>
                    )}
                {locationPermission === GRANTED &&
                    !isLoadingFoodItems &&
                    !isLoadingRestaurants &&
                    !isServableArea && (
                        <View style={styles.commingSoon}>
                            <ComingSoon />
                            <Text style={styles.commingSoonText}>
                                Sit Tight !! We will be coming soon to your
                                location.
                            </Text>
                        </View>
                    )}
                <LocationPermission locationPermission={locationPermission} />
            </View>
        </ErrorHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.WHITE,
        minHeight: dimensions.fullHeight,
    },
    loadingContainer: {
        height: dimensions.fullHeight * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFound: {
        height: dimensions.fullHeight * 0.6,
    },
    tapOnSearch: {
        height: dimensions.fullHeight * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.BLACK,
        ...fonts.NUNITO_500_14,
        backgroundColor: colors.ORANGE_LIGHT,
        borderRadius: 10,
        padding: 15,
    },
    commingSoon: {
        height: dimensions.fullHeight * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        ...Styles.default_text_color,
    },
    commingSoonText: {
        ...fonts.NUNITO_800_14,
        paddingTop: 20,
        textAlign: 'center',
        ...Styles.default_text_color,
    },
});

export default SearchDishesAndRestaurants;
