import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import RestaurantWithFoodItems from '../../components/Cards/Search/RestaurantWithFoodItems';
import { colors } from '../../styles/colors';
import { useSelector } from 'react-redux';
import { dimensions, fonts, Styles } from '../../styles';
import NotFound from '../../assets/icons/NotFound.svg';
import { useNavigation } from '@react-navigation/native';
import {
    BASE_URL,
    NETWORK_ERROR,
    UNEXPECTED_ERROR,
} from '../../redux/constants';
import { isTimeInIntervals } from '../../utils';
import { ErrorHandler } from '../../components/ErrorHandler/ErrorHandler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dynamicSize } from '../../utils/responsive';

const SearchAllDishes = props => {
    const { searchFoodItems } = props;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
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
                        {searchFoodItems && searchFoodItems.length > 0 && (
                            <Text style={styles.selectedItem}>
                                Suggested Food Item
                            </Text>
                        )}
                        {searchFoodItems &&
                            searchFoodItems.length > 0 &&
                            searchFoodItems.map((restaurant, index) => {
                                return (
                                    <RestaurantWithFoodItems
                                        restaurant={restaurant.restaurant}
                                        distance={restaurant.distance}
                                        time={restaurant.time}
                                        key={index}
                                        navigation={navigation}
                                    />
                                );
                            })}
                    </View>
                </ScrollView>
                <View style={styles.indicatorContainer}>
                    {searchFoodItems && searchFoodItems.length == 0 && (
                        <NotFound />
                    )}
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

export default SearchAllDishes;
