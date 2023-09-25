import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import RestaurantCardInfo from '../../components/Restaurant/RestaurantCardInfo';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import NotFound from '../../assets/icons/NotFound.svg';
import { useNavigation } from '@react-navigation/native';
import { UNEXPECTED_ERROR } from '../../redux/constants';
import { ErrorHandler } from '../../components/ErrorHandler/ErrorHandler';
import { isTimeInIntervals } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dynamicSize } from '../../utils/responsive';
import { searchRestaurants_ } from '../../redux/services/restaurantService';

const SearchAllRestaurants = props => {
    const { searchRestaurants, searchFoodItems, location } = props;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(false);
    const [updatedSearchedRestaurants, setUpdatedSearchedRestaurants] =
        useState([]);
    const SearchRestaurants = async text_ => {
        try {
            // perform search for food items with the given query
            await searchRestaurants_(
                text_,
                location?.latitude,
                location?.longitude,
            )
                .then(response => response?.data)
                .then(data => {
                    if (data.status === 'success') {
                        setIsLoading(false);
                        const restaurants = data?.restaurants?.sort(function (
                            a,
                            b,
                        ) {
                            return !isTimeInIntervals(
                                a?.restaurant?._id?.timings,
                            );
                        });
                        setUpdatedSearchedRestaurants(restaurants);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                        throw new Error(
                            data.message ? data?.message : UNEXPECTED_ERROR,
                        );
                    }
                })
                .catch(error => {
                    setIsLoading(false);
                    throw new Error(error);
                });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            throw new Error(error);
        }
    };

    useEffect(() => {
        if (searchRestaurants === undefined || searchRestaurants?.length == 0) {
            setIsLoading(true);
            SearchRestaurants();
        }
    }, []);

    return (
        <ErrorHandler>
            <View
                style={[
                    styles.mainContainer,
                    {
                        paddingBottom:
                            insets.top + insets.bottom + dynamicSize(100),
                    },
                ]}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View>
                        {searchRestaurants && searchRestaurants.length > 0 && (
                            <Text style={styles.selectedItem}>
                                Suggested Restaurants
                            </Text>
                        )}
                        {searchRestaurants &&
                            searchRestaurants?.length > 0 &&
                            searchRestaurants.map((restaurant, index) => {
                                return (
                                    <RestaurantCardInfo
                                        restaurant={restaurant?.restaurant}
                                        key={index}
                                        navigation={navigation}
                                    />
                                );
                            })}
                        {updatedSearchedRestaurants &&
                            updatedSearchedRestaurants?.length > 0 &&
                            updatedSearchedRestaurants.map(
                                (restaurant, index) => {
                                    return (
                                        <RestaurantCardInfo
                                            restaurant={restaurant?.restaurant}
                                            key={index}
                                            navigation={navigation}
                                        />
                                    );
                                },
                            )}
                    </View>
                    <View>
                        {searchFoodItems && searchFoodItems?.length > 0 && (
                            <Text style={styles.selectedItem}>
                                Suggested Restaurants for searched FoodItem
                            </Text>
                        )}
                        {searchFoodItems &&
                            searchFoodItems?.length > 0 &&
                            searchFoodItems.map((restaurant, index) => {
                                return (
                                    <RestaurantCardInfo
                                        restaurant={restaurant?.restaurant._id}
                                        key={index}
                                        navigation={navigation}
                                    />
                                );
                            })}
                    </View>
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {!isLoading &&
                        searchRestaurants &&
                        searchRestaurants.length == 0 &&
                        searchFoodItems &&
                        searchFoodItems.length == 0 &&
                        updatedSearchedRestaurants &&
                        updatedSearchedRestaurants.length == 0 && <NotFound />}
                </View>
            </View>
        </ErrorHandler>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: dimensions.fullHeight,
    },
    container: {
        minHeight: dimensions.fullHeight,
        backgroundColor: colors.WHITE,
    },
    indicatorContainer: {
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        position: 'absolute',
        bottom: dimensions.fullHeight * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedItem: {
        ...fonts.NUNITO_700_12,
        marginHorizontal: 20,
        ...Styles.default_text_color,
    },
});

export default SearchAllRestaurants;
