import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';
import { getRandomInt } from '../../utils';
import { dynamicSize } from '../../utils/responsive';

const IMAGE_URI = '../../assets/images/froker.png';

const FrokerCard = props => {
    const { froker } = props;
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                () => {};
            }}
            style={styles.container}>
            <Image style={styles.image} source={froker.ProfilePic} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{froker.name}</Text>
                <Text style={styles.subtext}>
                    {getRandomInt(20, 50)} Orders
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: dimensions.fullWidth / 5 - 5,
    },
    image: {
        width: dynamicSize(48),
        height: dynamicSize(48),
        borderRadius: dynamicSize(24),
        margin: dynamicSize(10),
        marginTop: 30,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        ...fonts.NUNITO_700_10,
        color: colors.BLACK,
    },
    subtext: {
        ...fonts.NUNITO_400_8,
        color: colors.GREY_DARK,
    },
});

export default FrokerCard;
