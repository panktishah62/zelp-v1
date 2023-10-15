import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import remoteConfig from '@react-native-firebase/remote-config';
import { dimensions } from '../../styles';
import FastImage from 'react-native-fast-image';
import { dynamicSize } from '../../utils/responsive';
import { colors } from '../../styles/colors';

const BannerOnHomeScreen = props => {
    const { navigation } = props;
    const bannerOnHomeScreen = JSON.parse(
        remoteConfig().getValue('bannerOnHomeScreen').asString(),
    );
    const containerHeight = bannerOnHomeScreen?.containerMaxHeight;
    const [index, setIndex] = useState(0);
    const ref = useRef(null);
    useEffect(() => {}, []);

    const renderItems = (item, index) => {
        const navigateTo = item?.navigationTo;
        const navigationData = item?.navigationData;

        const onPress = () => {
            if (navigateTo) {
                navigation.navigate(navigateTo, navigationData);
            }
        };

        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <FastImage
                    source={{ uri: item?.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableWithoutFeedback>
        );
    };
    return (
        bannerOnHomeScreen?.areBannerVisible && (
            <View
                style={[
                    styles.container,
                    {
                        height: containerHeight
                            ? dynamicSize(containerHeight)
                            : dynamicSize(250),
                    },
                ]}>
                {bannerOnHomeScreen?.areBannerVisible &&
                    bannerOnHomeScreen?.banners?.length > 0 && (
                        <View>
                            <Carousel
                                ref={ref}
                                data={bannerOnHomeScreen?.banners}
                                renderItem={({ item, index }) =>
                                    renderItems(item, index)
                                }
                                layout={'default'}
                                sliderWidth={dimensions.fullWidth}
                                itemWidth={
                                    dimensions.fullWidth - dynamicSize(45)
                                }
                                onSnapToItem={index => setIndex(index)}
                                useScrollView={true}
                            />
                        </View>
                    )}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: dynamicSize(20),
        marginBottom: dynamicSize(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: dynamicSize(10),
        height: '100%',
    },
    pagination: {
        height: 20,
        marginBottom: 10,
    },
    dotContainerStyle: {
        height: 10,
    },
});

export default BannerOnHomeScreen;
