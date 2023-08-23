import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { sliceText } from '../../utils';

const IMAGE_URI = '../../assets/images/foodItem.png';

export default FoodItemCard = props => {
    const { description, image, views, onClick } = props;
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                onClick();
            }}>
            <Image style={styles.image} source={require(IMAGE_URI)} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{sliceText(description, 70)}</Text>
                <Text style={styles.subText}>{views} VIEWS</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 184,
        width: 120,
    },
    image: {},
    textContainer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 5,
    },
    text: {
        ...fonts.NUNITO_800_8,
        color: colors.WHITE,
    },
    subText: {
        ...fonts.NUNITO_800_6,
        color: colors.WHITE,
    },
});
