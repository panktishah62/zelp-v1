import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from './BottomSheet';
import StarRating from './StarRatingComponent';
import { fonts, Styles } from '../../styles';

const Rating = ({ text }) => {
    const [show, setShow] = useState(false);
    const close = () => {
        return setShow(false);
    };

    return (
        <View>
            <BottomSheet
                show={show}
                closePopup={close}
                haveOutsideTouch={true}
                size={'20%'}>
                <Text style={styles.ratingText}>{text}</Text>
                <StarRating />
            </BottomSheet>
        </View>
    );
};

export default Rating;

const styles = StyleSheet.create({
    ratingText: {
        ...fonts.INTER_500_16,
        alignSelf: 'center',
        marginTop: 20,
        ...Styles.default_text_color,
    },
});
