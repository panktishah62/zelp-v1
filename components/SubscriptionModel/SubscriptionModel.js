import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Platform } from 'react-native';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';
import Carousel, { Pagination } from 'react-native-new-snap-carousel';
import { dimensions, fonts } from '../../styles';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const SubscriptionModel = props => {
    const { subscriptionPlans, flexiPayPlan, navigation } = props;
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);

    const _renderItemForSubscriptionPlan = (item, index) => {
        return (
            <LinearGradient style={styles.container} colors={item?.color}>
                {item?.image && (
                    <FastImage
                        source={{ uri: item?.image }}
                        style={styles.image}
                    />
                )}
                {item?.type && (
                    <Text style={styles.titleText}>{item?.type}</Text>
                )}
                {item?.text1 && (
                    <Text style={styles.subtitleText}>{item?.text1}</Text>
                )}
                {item?.text2 && (
                    <Text style={styles.subtitleText}>{item?.text2}</Text>
                )}
                {item?.text3 && (
                    <Text style={styles.subtitleText}>{item?.text3}</Text>
                )}
                {item?.text4 && (
                    <Text style={styles.subtitleText}>{item?.text4}</Text>
                )}
                {item?.text5 && (
                    <Text style={styles.subtitleText}>{item?.text5}</Text>
                )}
            </LinearGradient>
        );
    };

    const _renderItemForFlexiPayPlan = (item, index) => {
        return (
            <LinearGradient style={styles.container} colors={item?.color}>
                {item?.image && (
                    <FastImage
                        source={{ uri: item?.image }}
                        style={styles.image}
                    />
                )}
                {item?.type && (
                    <Text style={styles.titleText}>{item?.type}</Text>
                )}
                {item?.payableAmount && (
                    <Text style={styles.subtitleText}>
                        {item?.payableAmount}
                    </Text>
                )}
                {item?.validityCondition && (
                    <Text style={styles.subtitleText}>
                        {item?.validityCondition}
                    </Text>
                )}
                {item.orderConstraint && item.amountConstraint && (
                    <Text style={styles.subtitleText}>
                        {item?.orderConstraint} | {item?.amountConstraint}
                    </Text>
                )}
            </LinearGradient>
        );
    };

    useEffect(() => {
        if (ref1.current) {
            ref1.current.snapToItem(1);
        }
        if (ref2.current) {
            ref2.current.snapToItem(0);
        }
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Welcome To Froker Mart</Text>
            </View>
            <Text style={styles.subHeader}>
                Introducing Our Flexi-pay Option
            </Text>
            <Carousel
                ref={ref2}
                data={flexiPayPlan}
                renderItem={({ item, index }) =>
                    _renderItemForFlexiPayPlan(item, index)
                }
                layout={'default'}
                sliderWidth={dimensions.fullWidth}
                itemWidth={dimensions.fullWidth / 2 + 40}
                onSnapToItem={index => setIndex2(index)}
                useScrollView={true}
                firstItem={0}
                initialScrollIndex={0}
            />
            <Text style={styles.subHeader}>Introducing Our Pre-pay Option</Text>
            <Carousel
                ref1={ref1}
                data={subscriptionPlans}
                renderItem={({ item, index }) =>
                    _renderItemForSubscriptionPlan(item, index)
                }
                layout={'default'}
                sliderWidth={dimensions.fullWidth}
                itemWidth={dimensions.fullWidth / 2 + 40}
                onSnapToItem={index => setIndex1(index)}
                useScrollView={true}
                firstItem={0}
                initialScrollIndex={1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: dynamicSize(20),
        backgroundColor: colors.WHITE,
        alignItems: 'center',
    },
    container: {
        // width: dynamicSize(dimensions.fullWidth / 2 + 20),
        // height: dynamicSize(dimensions.fullWidth / 2 + 80),
        width: dynamicSize(220),
        height: dynamicSize(270),
        borderRadius: dynamicSize(30),
        backgroundColor: colors.BLUE_DARK,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        ...fonts.NUNITO_700_24,
        color: colors.WHITE,
        textAlign: 'center',
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_600_20,
            },
        }),
    },
    subtitleText: {
        ...fonts.NUNITO_500_16,
        color: colors.WHITE,
        textAlign: 'center',
    },
    image: {
        height: dynamicSize(120),
        width: dynamicSize(120),
        borderRadius: dynamicSize(60),
    },
    header: {
        ...fonts.NUNITO_500_24,
        color: colors.GREY_DARK,
    },
    subHeader: {
        ...fonts.NUNITO_500_16,
        color: colors.GREY_MEDIUM,
        padding: dynamicSize(10),
    },
    headerContainer: {
        alignItems: 'center',
    },
});
export default SubscriptionModel;
