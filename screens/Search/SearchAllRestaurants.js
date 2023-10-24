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
    const { searchRestaurants, searchFoodItems, searchedData, location } =
        props;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [isLoading, setIsLoading] = useState(false);
    const [updatedSearchedRestaurants, setUpdatedSearchedRestaurants] =
        useState([]);

    useEffect(() => {
        const restaurants = [];
        if (searchedData?.data) {
            Object.keys(searchedData?.data).map(restaurant => {
                if (searchedData?.data[restaurant]?.length > 0) {
                    restaurants.push(
                        searchedData?.data[restaurant][0].restaurant,
                    );
                }
            });
            setUpdatedSearchedRestaurants(restaurants);
        }
    }, [searchedData]);

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
                        {updatedSearchedRestaurants &&
                            updatedSearchedRestaurants?.length > 0 && (
                                <Text style={styles.selectedItem}>
                                    Suggested Restaurants
                                </Text>
                            )}
                        {updatedSearchedRestaurants &&
                            updatedSearchedRestaurants?.length > 0 &&
                            updatedSearchedRestaurants.map(
                                (restaurant, index) => {
                                    return (
                                        <RestaurantCardInfo
                                            restaurant={restaurant}
                                            key={index}
                                            navigation={navigation}
                                        />
                                    );
                                },
                            )}
                    </View>
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {!isLoading &&
                        searchedData &&
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
