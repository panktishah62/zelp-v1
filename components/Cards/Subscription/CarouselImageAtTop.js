import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { dimensions } from '../../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../styles/colors';
import { dynamicSize } from '../../../utils/responsive';

const CarouselImageAtTop = props => {
    const { bannerImagesArr, isStatic } = props;

    const renderItem = () => {
        return bannerImagesArr?.map((item, index) => (
            <View style={[styles.shadow]} key={index}>
                <View style={styles.imageContainer}>
                    {!isStatic && item.image && (
                        <Image
                            style={styles.imageStyle}
                            resizeMode="stretch"
                            source={{
                                uri: item.image,
                            }}
                        />
                    )}
                    {isStatic && item.caroselImage && (
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: item.caroselImage }}
                        />
                    )}
                </View>
            </View>
        ));
    };

    return (
        <View style={styles.conatiner}>
            {bannerImagesArr?.length !== 0 && (
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}>
                    {renderItem()}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        width: dimensions.fullWidth,
        height: dynamicSize(200),
        flexShrink: 0,
        padding: 0,
    },
    scrollView: {
        height: dynamicSize(200),
        marginHorizontal: dynamicSize(10),
    },
    imageStyle: {
        width: dimensions.fullWidth - dynamicSize(60),
        height: dynamicSize(178),
        borderRadius: dynamicSize(7),
    },
    imageContainer: {
        width: dimensions.fullWidth - dynamicSize(60),
        height: dynamicSize(178),
        // resizeMode: 'cover',
    },

    shadow: {
        width: dimensions.fullWidth - dynamicSize(60),
        margin: dynamicSize(10),
        height: dynamicSize(178),
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(7),
        elevation: 5, // Apply elevation for shadow
    },
});

export default CarouselImageAtTop;
