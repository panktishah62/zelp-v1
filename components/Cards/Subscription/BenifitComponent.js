import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import Svg, { SvgUri } from 'react-native-svg';
import { fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import FastImage from 'react-native-fast-image';

const BenifitComponent = props => {
    const { data, isDynamic } = props;

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {data &&
                data.map((item, index) => (
                    <View style={styles.innerContainer} key={index}>
                        {!isDynamic && item.image && (
                            <FastImage source={item.image} />
                        )}
                        {item.svg && (
                            <SvgUri
                                style={styles.innerImage}
                                width="50"
                                height="50"
                                uri={item.svg}
                            />
                        )}
                        {item.text && (
                            <Text style={styles.innerText}>
                                {item.text}
                                {item.boldText && (
                                    <Text style={styles.innerBoldText}>
                                        {item.boldText}
                                    </Text>
                                )}
                            </Text>
                        )}
                    </View>
                ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: dynamicSize(10),
        alignItems: 'flex-start',
        padding: 10,
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: dynamicSize(95),
        gap: 10,
        flexDirection: 'column',
        padding: 10, // Add padding to mimic gap
    },
    innerImage: {
        width: dynamicSize(45),
        height: dynamicSize(45),
        flexShrink: 0,
    },
    innerText: {
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: normalizeFont(12),
        fontWeight: '500',
        color: colors.BLACK,
        textTransform: 'capitalize',
    },
    innerBoldText: {
        fontFamily: fonts.NUNITO_500_12.fontFamily,
        fontSize: normalizeFont(12),
        fontWeight: '800',
        color: colors.BLACK,
        textTransform: 'capitalize',
    },
});

export default BenifitComponent;
