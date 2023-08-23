import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
const Star = '../../assets/icons/Star.png';
const StarFilled = '../../assets/icons/StarFilled.png';

const StarRating = () => {
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    return (
        <View style={styles.mainContainer}>
            {maxRating.map((item, key) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={item}
                        onPress={() => {
                            setDefaultRating(item);
                        }}>
                        <Image
                            style={styles.image}
                            source={
                                item <= defaultRating
                                    ? require(Star)
                                    : require(StarFilled)
                            }
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
    },
    image: { width: 40, height: 40, resizeMode: 'cover' },
});
export default StarRating;
