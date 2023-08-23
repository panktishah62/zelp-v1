import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    SafeAreaView,
    Platform,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';

import AppLogo from '../../assets/icons/AppTour/AppLogo.svg';

import APP_TOUR1 from '../../assets/icons/AppTour/illus1.svg';
import APP_TOUR2 from '../../assets/icons/AppTour/illus2.svg';
import APP_TOUR3 from '../../assets/icons/AppTour/illus3.svg';
import APP_TOUR4 from '../../assets/icons/AppTour/illus4.svg';
import APP_TOUR5 from '../../assets/icons/AppTour/illus5.svg';
import APP_TOUR6 from '../../assets/icons/AppTour/illus6.svg';
import APP_TOUR7 from '../../assets/icons/AppTour/illus7.svg';
import APP_TOUR8 from '../../assets/icons/AppTour/illus8.svg';

import APP_TOUR_FROKIE1 from '../../assets/icons/AppTourFrokie1.svg';
import APP_TOUR_FROKIE2 from '../../assets/icons/AppTourFrokie2.svg';
import APP_TOUR_FROKIE3 from '../../assets/icons/AppTourFrokie3.svg';
import APP_TOUR_FROKIE4 from '../../assets/icons/AppTourFrokie4.svg';
import APP_TOUR_FROKIE5 from '../../assets/icons/AppTourFrokie5.svg';
import APP_TOUR_FROKIE7 from '../../assets/icons/AppTourFrokie7.svg';
import { dynamicSize } from '../../utils/responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DATA = [
    {
        id: 1,
        image: <APP_TOUR1 height={dimensions.fullHeight * 0.2} />,
        title: 'Froker',
        subtitle:
            'Find top food gurus, follow for tasty eats and original content',
        frokieImg: <APP_TOUR_FROKIE1 />,
    },

    {
        id: 2,
        image: <APP_TOUR2 height={dimensions.fullHeight * 0.2} />,

        title: 'Shots',
        subtitle:
            'Savor quality food or watch Froker videos while waiting and Get paid for it',
        frokieImg: <APP_TOUR_FROKIE2 />,
    },
    {
        id: 3,
        image: <APP_TOUR3 height={dimensions.fullHeight * 0.2} />,

        title: 'Food Affair',
        subtitle:
            "Ordering food is as easy as swiping right - we'll always have a match for you!",
        frokieImg: <APP_TOUR_FROKIE3 />,
    },
    {
        id: 4,
        image: <APP_TOUR4 height={dimensions.fullHeight * 0.2} />,

        title: 'Switch To Froker',
        subtitle:
            'Become a Froker - the perfect place to create content and become a popular food blogger!',
        frokieImg: <APP_TOUR_FROKIE4 />,
    },
    {
        id: 5,
        image: <APP_TOUR5 height={dimensions.fullHeight * 0.2} />,

        title: 'Restaurants',
        subtitle:
            'Check out our top restaurants serving outstanding quality food!',
        frokieImg: <APP_TOUR_FROKIE5 />,
    },
    {
        id: 6,
        image: <APP_TOUR6 height={dimensions.fullHeight * 0.2} />,

        title: 'Froker Wallet',
        subtitle: 'You will be getting a 1000rs signup bonus in your wallet.',
        frokieImg: <APP_TOUR_FROKIE1 />,
    },
    {
        id: 7,
        image: <APP_TOUR7 height={dimensions.fullHeight * 0.2} />,

        title: 'Scratch card',
        subtitle:
            'Get upto 100/- cash back in the scratch card on your every order.',
        frokieImg: <APP_TOUR_FROKIE7 />,
    },
    {
        id: 8,
        image: <APP_TOUR8 height={dimensions.fullHeight * 0.2} />,

        title: 'Order From Multiple Restaurants',
        subtitle:
            'Order from more than one place and enjoy different food items.',
        frokieImg: <APP_TOUR_FROKIE1 />,
    },
];

const AppTourScreenComponent = ({ navigation }) => {
    const flatlistRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [viewableItems, setViewableItems] = useState([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const insets = useSafeAreaInsets();
    const handleViewableItemsChanged = useRef(({ viewableItems }) => {
        setViewableItems(viewableItems);
    });

    useEffect(() => {
        if (!viewableItems[0] || currentPage === viewableItems[0].index) return;
        setCurrentPage(viewableItems[0].index);
    }, [viewableItems]);

    useEffect(() => {
        setIsLastPage(currentPage === DATA.length - 1);
    }, [currentPage]);

    const handleNext = () => {
        if (currentPage == DATA.length - 1) {
            navigation.navigate('MainStack');
        } else {
            flatlistRef.current.scrollToIndex({
                animated: true,
                index: currentPage + 1,
            });
        }
    };

    const handleSkip = () => {
        navigation.navigate('MainStack');
    };

    const renderFlatlistItem = ({ item }) => {
        return (
            <View style={[styles.container1]}>
                <View style={[styles.image]}>
                    <AppLogo style={styles.AppLogo} />
                    {item.image}
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.frokieContainer}>{item.frokieImg}</View>
            </View>
        );
    };

    return (
        <View
            style={[
                styles.container,
                { height: dimensions.fullHeight - insets.bottom },
            ]}>
            <FlatList
                data={DATA}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={renderFlatlistItem}
                ref={flatlistRef}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
                initialNumToRender={1}
            />
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleSkip}>
                    <Text style={styles.footerLeftText}>SKIP</Text>
                </TouchableOpacity>
                <View style={styles.dotContainer}>
                    {[...Array(DATA.length)].map((_, index) => (
                        <View
                            key={index}
                            style={{
                                width: 8,
                                height: 8,
                                backgroundColor:
                                    index == currentPage
                                        ? colors.ORANGE
                                        : colors.GREY_MEDIUM,
                                borderRadius: 5,
                                margin: 2,
                            }}
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.footerRightText}>
                        {isLastPage ? 'DONE' : 'NEXT'}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* <Text>hi</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        height: dimensions.fullHeight,
        backgroundColor: '#F6FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        width: dimensions.fullWidth,
    },
    container1: {
        height: dimensions.fullHeight,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        width: dimensions.fullWidth,
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 40,
        // resizeMode: "contain",
        height:
            Platform.OS === 'ios'
                ? dimensions.fullHeight * 0.55
                : dimensions.fullHeight * 0.65,
        width: dimensions.fullWidth,
    },
    footer: {
        flexDirection: 'row',
        height: dimensions.fullHeight * 0.06,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    titleContainer: { alignSelf: 'center', marginTop: dynamicSize(15) },
    title: {
        color: colors.BLACK,
        ...fonts.INTER_700_16,
    },
    subtitleContainer: { alignSelf: 'center', width: '80%' },
    subtitle: {
        alignSelf: 'center',
        textAlign: 'center',
        ...fonts.NUNITO_700_16,
        color: '#000000A6',
    },
    footerLeftText: {
        marginLeft: dynamicSize(10),
        color: colors.BLACK,
        ...fonts.NUNITO_700_14,
    },
    footerRightText: {
        ...fonts.NUNITO_700_14,
        color: colors.ORANGE,
        marginRight: dynamicSize(10),
    },
    frokieContainer: {
        alignSelf: 'center',
        // zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: dynamicSize(60),
        marginBottom: dynamicSize(50),
    },
    pageNoText: {
        zIndex: 500,
    },
    dots: {
        width: dynamicSize(8),
        height: dynamicSize(8),
        // backgroundColor: index == currentPage ? colors.ORANGE : colors.GREY_MEDIUM,
        borderRadius: dynamicSize(5),
        margin: 2,
    },
    dotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    img: {
        height: '100%',
        width: '95%',
        alignSelf: 'center',
        marginLeft: dynamicSize(15),
    },
    AppLogo: {
        marginBottom: dynamicSize(100),
    },
});

export default AppTourScreenComponent;
