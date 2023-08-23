import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { sliceText } from '../../utils';
import { dimensions, fonts } from '../../styles';
import { dynamicSize } from '../../utils/responsive';

const ScrollableText = props => {
    const { text } = props;
    const [showMore, setShowMore] = useState(false);

    const onClick = () => {
        setShowMore(!showMore);
    };

    return showMore ? (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </ScrollView>
    ) : (
        <Text style={styles.text}>
            {sliceText(text, 100)}
            {String(text).length > 120 && (
                <TouchableOpacity onPress={onClick}>
                    <Text style={styles.showMore}> Read more</Text>
                </TouchableOpacity>
            )}
        </Text>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: dynamicSize(70),
        marginVertical: dynamicSize(5),
    },
    text: {
        color: colors.WHITE,
        width: '100%',
        marginVertical: dynamicSize(10),
        ...fonts.NUNITO_600_12,
    },
    showMore: {
        color: colors.BLUE_DARK,
        ...fonts.NUNITO_600_12,
    },
});

export default ScrollableText;
