import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import Heart from '../assets/icons/Heart.svg';
import Star from '../assets/icons/star.svg';
import LocationIcon from '../assets/icons/Vector.svg';
import { sliceText } from '../../utils';

const Cuisines = ({ cuisines }) => {
    return (
        <View style={styles.cuisines}>
            {cuisines && (
                <Text style={styles.cuisinesText}>
                    {sliceText(cuisines.slice(0, 3).toString(), 25)}
                </Text>
            )}
        </View>
    );
};

const RestaurantComponent = ({ restaurant, navigation }) => {
    const {
        image,
        title,
        subtitle,
        rating,
        rating_count,
        priceForOne,
        openingTime,
        closingTime,
        cuisines,
    } = restaurant;
    return (
        <TouchableWithoutFeedback
            onPress={() =>
                navigation.navigate('Restaurant', { restaurant: restaurant })
            }>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={styles.layer}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={styles.innerContainer}>
                            <View
                                style={[
                                    styles.topContainer,
                                    Styles.row_space_between,
                                ]}>
                                <View
                                    style={[
                                        styles.ratingContainer,
                                        Styles.row_flex_start,
                                    ]}>
                                    <Star />
                                    <Text
                                        style={[
                                            fonts.NUNITO_600_6,
                                            Styles.default_text_color,
                                        ]}>
                                        {' '}
                                        {rating}{' '}
                                    </Text>
                                    <Text
                                        style={[
                                            fonts.NUNITO_600_6,
                                            Styles.default_text_color,
                                        ]}>
                                        {' '}
                                        ({rating_count}){' '}
                                    </Text>
                                </View>
                                {/* <View> */}
                                <TouchableWithoutFeedback
                                    style={styles.favIcon}>
                                    {/* <Heart /> */}
                                </TouchableWithoutFeedback>
                                {/* </View> */}
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{title}</Text>
                                {cuisines && <Cuisines cuisines={cuisines} />}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text
                            style={[
                                fonts.NUNITO_700_12,
                                { color: colors.GREY_MEDIUM },
                            ]}>
                            {priceForOne} for one
                        </Text>
                        <Text
                            style={[
                                fonts.NUNITO_700_10,
                                { color: colors.GREY_MEDIUM },
                            ]}>
                            {openingTime} - {closingTime}
                        </Text>
                    </View>
                    {/* <View>
                        <View style={Styles.row}>
                            <LocationIcon />
                            <Text
                                style={[
                                    fonts.NUNITO_700_10,
                                    { color: colors.ORANGE },
                                ]}>
                                {' '}
                                {distance} km
                            </Text>
                        </View>
                        <Text
                            style={[
                                fonts.NUNITO_700_10,
                                { color: colors.ORANGE },
                            ]}>
                            {timeTaken}
                        </Text>
                    </View> */}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth * 0.95,
        margin: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    imageContainer: {
        width: dimensions.fullWidth * 0.95,
        height: 118,
    },
    layer: {
        backgroundColor: colors.BLACK,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        minHeight: 118,
        width: dimensions.fullWidth * 0.95,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        opacity: 0.5,
    },
    innerContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        width: dimensions.fullWidth * 0.95,
        padding: 5,
    },
    ratingContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 2,
        padding: 2,
    },
    cuisines: {
        backgroundColor: colors.WHITE,
        opacity: 0.5,
        borderRadius: 7,
        height: 19,
        minWidth: dimensions.fullWidth * 0.5,
        ...Styles.row,
    },
    cuisinesText: {
        color: colors.BLACK,
        ...fonts.NUNITO_500_8,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 5,
        ...fonts.NUNITO_800_14,
        color: colors.WHITE,
    },
    bottomContainer: {
        padding: 10,
        ...Styles.row_space_between,
        height: 43,
        backgroundColor: colors.ORANGE_GRADIENT_LIGHT,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    favIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
    },
});

export default RestaurantComponent;
