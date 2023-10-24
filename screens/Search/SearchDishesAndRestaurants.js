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
import { searchbyAlgolia } from '../../redux/services/searchService';

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
    const locationCoordinates = useSelector(state => state.address.location);
    const page = 0;

    const [searchedData, setSearchedData] = useState(null);
    const searchAlgolia = async (text_, location) => {
        await searchbyAlgolia(
            text_,
            location?.latitude,
            location?.longitude,
        ).then(data => {
            setSearchedData(data);
            setIsLoadingFoodItems(false);
            setIsLoadingRestaurants(false);
        });
    };

    const search = async (text_, location) => {
        setLocation(location);
        setIsSearched(true);
        if (locationPermission === GRANTED && isServableArea) {
            setIsLoadingFoodItems(true);
            setIsLoadingRestaurants(true);
            searchAlgolia(text_, location);
        } else if (!isServableArea) {
            setIsLoadingFoodItems(false);
            setIsLoadingRestaurants(false);
        }
    };

    const setText = text_ => {
        setTextInput(text_);
        setIsFound(true);
        setIsSearched(false);
        setSearchedData(null);
        setIsLoadingFoodItems(false);
        setIsLoadingRestaurants(false);
    };

    const onBack = () => {
        setIsSearched(false);
        setText('');
        setIsServableArea(false);
        setSearchedData(null);
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
                            searchedData={searchedData}
                            location={location}
                        />
                    )}
                {isServableArea &&
                    locationPermission === GRANTED &&
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
