import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';

const IMAGE_URI = '../../assets/images/category.png';

const CategoryCard = props => {
    const { category, image, onClick } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                onClick();
            }}
            style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={IMAGE_URI} style={styles.image} />
            </View>
            <Text style={styles.text}>{category}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth / 3,
        marginTop: 10,
        marginBottom: 10,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    text: {
        ...fonts.NUNITO_500_10,
        color: colors.BLACK,
        margin: 10,
    },
});

export default CategoryCard;
