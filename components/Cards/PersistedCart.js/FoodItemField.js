import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { dimensions, fonts, Styles } from '../../../styles';
import VegIcon from '../../../assets/icons/VegIcon.svg';
import NonVegIcon from '../../../assets/icons/nonveg.svg';
import { colors } from '../../../styles/colors';
import { Text } from 'react-native';
import AddButton from '../../Buttons/AddButton';
import Rupee from '../../../assets/icons/rupee.svg';
import { sliceText } from '../../../utils';

const FoodItemField = props => {
    let { foodItem, navigation, restaurant } = props;
    return (
        <View style={styles.container}>
            {foodItem && foodItem.foodItem && foodItem.foodItem.name && (
                <View style={styles.leftContainer}>
                    <View style={styles.icon}>
                        {foodItem.foodItem.isVeg ? <VegIcon /> : <NonVegIcon />}
                    </View>
                    <View>
                        <Text style={styles.titleText}>
                            {/* {sliceText(foodItem.id.name, 15)} */}
                            {foodItem.foodItem.name}
                        </Text>
                    </View>
                </View>
            )}
            {foodItem &&
                foodItem.foodItem &&
                foodItem.foodItem.price &&
                foodItem.count > 0 && (
                    <View style={styles.rightContainer}>
                        <AddButton
                            foodItem={foodItem.foodItem}
                            restaurant={restaurant}
                            count={foodItem.count}
                            style={styles.button}
                            navigation={navigation}
                            mode={'dark'}
                        />
                        <View style={styles.amount}>
                            <Rupee />
                            {foodItem.foodItem.price && (
                                <Text style={styles.priceText}>
                                    {foodItem.foodItem.price}
                                </Text>
                            )}
                        </View>
                    </View>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 70,
        maxHeight: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        // width: dimensions.fullWidth / 3.5,
        width: dimensions.fullWidth * 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        // width: dimensions.fullWidth / 2.5,
        width: dimensions.fullWidth * 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amount: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceText: {
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_800_10,
            },
            android: {
                ...fonts.NUNITO_800_12,
            },
        }),
        ...Styles.default_text_color,
    },
    icon: {
        margin: 10,
    },
    titleText: {
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_700_12,
            },
            android: {
                ...fonts.NUNITO_700_14,
            },
        }),
        ...Styles.default_text_color,
        width: dimensions.fullWidth / 3,
    },
});

export default FoodItemField;
