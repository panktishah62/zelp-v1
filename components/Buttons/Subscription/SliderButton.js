import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { fonts } from '../../../styles';
import { colors } from '../../../styles/colors';

const SliderButton = props => {
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = value => {
        setSliderValue(value);
    };
    const toogleToEnd = () => {
        if (sliderValue === 0) {
            setSliderValue(100);
        } else {
            setSliderValue(0);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Veg</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'row',
    },
    vegButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    text: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22, // You can adjust this based on your design
        letterSpacing: -0.408,
    },
});

export default SliderButton;
