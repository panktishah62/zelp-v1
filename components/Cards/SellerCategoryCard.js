import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { GreyColorMatrix } from '../../utils';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';

const IMAGE_URI = '../../assets/images/restaurant.png';

const SellerCategoryCard = ({
    categoryType,
    categoryImage,
    selected,
    setSelectedCategory,
}) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setSelectedCategory(categoryType);
            }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {IMAGE_URI && selected && (
                        <Image
                            source={{
                                uri: categoryImage,
                            }}
                            style={styles.image}
                        />
                    )}
                    {IMAGE_URI && !selected && (
                        <ColorMatrix matrix={GreyColorMatrix}>
                            <Image
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                                style={styles.image}
                            />
                        </ColorMatrix>
                    )}
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.title} numberOfLines={1}>
                            {categoryType}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth * 0.42,
        margin: dimensions.fullWidth * 0.02,
        borderRadius: 4,
        height: 200,
    },
    imageContainer: {
        width: dimensions.fullWidth * 0.42,
        height: 150,
    },
    image: {
        minHeight: 162,
        width: dimensions.fullWidth * 0.42,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    innerContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        width: dimensions.fullWidth * 0.45,
        padding: 5,
    },
    ratingContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 2,
        padding: 2,
    },
    cuisines: {
        maxWidth: dimensions.fullWidth * 0.45 * 0.4,
        ...Styles.row,
    },
    cuisinesText: {
        color: colors.GREY_DARK,
        ...fonts.NUNITO_500_6,
    },
    titleContainer: {},
    title: {
        maxWidth: dimensions.fullWidth * 0.45 * 0.5,
        ...fonts.NUNITO_700_12,
        color: colors.BLACK,
    },
    bottomContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        ...Styles.row_space_between,
        backgroundColor: colors.ORANGE_GRADIENT_LIGHT,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        bottom: 0,
    },
    distanceContainer: {
        alignItems: 'flex-end',
    },
});

export default SellerCategoryCard;
