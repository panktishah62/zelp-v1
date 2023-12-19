import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import CategoryPurse from '../../assets/ZelpIcons/CategoryPurse.svg';
import { dynamicSize } from '../../utils/responsive';

const IMAGE_URI = '../../assets/images/category.png';

const CategoryCard = props => {
    const { category, image, onClick } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                onClick();
            }}
            style={styles.container}>
            <CategoryPurse height={'60'} width={'60'} />
            <Text style={styles.text}>{category}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth / 4,
        padding: dynamicSize(10),
        // borderColor: colors.BLUE_DARK,
        // borderWidth: 1,
    },

    text: {
        ...fonts.NUNITO_500_14,
        color: colors.BLACK,
        margin: dynamicSize(5),
    },
});

export default CategoryCard;
