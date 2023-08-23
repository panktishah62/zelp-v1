import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';
import { dimensions, fonts, Styles } from '../../../styles';
import { colors } from '../../../styles/colors';
import { GreyColorMatrix, isTimeInIntervals, sliceText } from '../../../utils';

const CommonSearchCard = props => {
    const { item, text, location, navigation } = props;
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
    useEffect(() => {
        if (item.type === 'Restaurant' && item.timings) {
            setIsRestaurantOpen(isTimeInIntervals(item.timings));
        }
    }, []);
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('SearchTab', {
                    item: item,
                    location: location,
                });
            }}>
            <View style={styles.container}>
                <View>
                    {item.image && isRestaurantOpen && (
                        <Image
                            source={{
                                uri: item.image,
                            }}
                            style={styles.image}
                        />
                    )}
                    {!isRestaurantOpen && (
                        <ColorMatrix matrix={GreyColorMatrix}>
                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                style={styles.image}
                            />
                        </ColorMatrix>
                    )}
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.titleText}>
                        {sliceText(item.name, 25)}
                    </Text>
                    <Text style={styles.subtitleText}>
                        in{' '}
                        {item.type === 'FoodItem'
                            ? 'Food Item'
                            : sliceText(item.type, 40)}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: dimensions.fullWidth,
        padding: 20,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: colors.WHITE,
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 20,
    },
    titleText: {
        ...fonts.NUNITO_600_16,
        ...Styles.default_text_color,
    },
    subtitleText: {
        ...fonts.NUNITO_500_14,
        ...Styles.default_text_color,
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
});

export default CommonSearchCard;
