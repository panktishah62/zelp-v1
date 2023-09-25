import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Heart from '../../../assets/icons/BigHeart.svg';
import ShowMore from '../../../assets/icons/backRight.svg';
import Star from '../../../assets/icons/Star.svg';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import { sliceText } from '../../../utils';

const Restaurant = props => {
    const { restaurant, navigation } = props;
    return (
        <View style={styles.container}>
            <View style={styles.containerLeft}>
                <View style={styles.imageContainer}>
                    <View style={styles.layer}>
                        {restaurant.image ? (
                            <Image
                                source={{
                                    uri: restaurant.image,
                                }}
                                style={styles.image}
                            />
                        ) : (
                            <Image
                                source={require('../../../assets/images/foodItem.png')}
                                style={styles.image}
                            />
                        )}
                        {/* <Heart style={styles.likeButton} /> */}
                    </View>
                </View>
            </View>
            <View style={styles.containerRight}>
                {restaurant.name && (
                    <View>
                        <Text style={styles.titleText}>
                            {sliceText(restaurant.name, 15)}
                        </Text>
                    </View>
                )}
                <View style={styles.ratingContainer}>
                    <Star />
                    <Text style={[styles.ratings, Styles.margin_05]}>
                        {restaurant.rating.value} ({restaurant.rating.count} + )
                    </Text>
                </View>
                <View>
                    {restaurant.tags && (
                        <Text style={styles.subtitleText}>
                            {sliceText(
                                restaurant.tags.slice(0, 3).toString(),
                                20,
                            )}
                        </Text>
                    )}
                </View>
                <View style={styles.moreDetails}>
                    <TouchableOpacity
                        style={Styles.row_space_evenly}
                        onPress={() => {
                            navigation.navigate('RestaurantWithMenu', {
                                restaurant: restaurant,
                            });
                        }}>
                        <Text style={Styles.default_text_color}>
                            More Details{' '}
                        </Text>
                        <ShowMore height={10} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        backgroundColor: colors.WHITE,
        padding: 20,
        borderRadius: 20,
        shadowColor: colors.BLACK,
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 10,
    },
    image: {
        height: 130,
        width: (dimensions.fullWidth - 100) / 2,
        borderRadius: 20,
        opacity: 0.5,
    },
    likeButton: {
        margin: 10,
        right: 0,
        position: 'absolute',
    },
    layer: {
        backgroundColor: colors.BLACK,
        borderRadius: 20,
    },
    imageContainer: {
        borderRadius: 20,
        height: 130,
        // position: 'absolute',
        width: (dimensions.fullWidth - 100) / 2,
    },
    containerLeft: {
        // width: (dimensions.fullWidth - 100) / 2,
        borderRadius: 20,
    },
    containerRight: {
        margin: 20,
        // width: (dimensions.fullWidth - 100) / 2,
    },
    ratingContainer: {
        ...Styles.row_flex_start,
    },
    titleText: {
        ...fonts.NUNITO_700_24,
        ...Styles.default_text_color,
    },
    ratings: {
        ...fonts.NUNITO_500_16,
        ...Styles.default_text_color,
    },
    subtitleText: {
        ...Styles.default_text_color,
    },
    moreDetails: {
        width: 110,
        marginBottom: 10,
        marginTop: 10,
        padding: 5,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.GREY_MEDIUM,
    },
});

export default Restaurant;
