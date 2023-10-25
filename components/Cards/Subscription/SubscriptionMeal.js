import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import BestSellers from './BestSellers';
import LeftSimple from '../../Heading/Subscription/LeftSimple';
import ItemCard from './ItemCard';
import { dynamicSize } from '../../../utils/responsive';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';

const SubscriptionMeal = props => {
    const {
        mealPlan,
        isVeg,
        bestSellers,
        categorisedMenu,
        isAvailable,
        availableAt,
        handleKnowMore,
    } = props;
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const items = bestSellers.filter(bestSeller => {
            return bestSeller?.mealPlan == mealPlan?._id;
        });
        setFilteredItems(items);
    }, [mealPlan, bestSellers]);

    const renderItems = () => {
        return (
            <View style={styles.wrapperContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.innerContainer}>
                        <ItemCard
                            ItemCards={filteredItems}
                            isVegButtonActive={isVeg}
                            isAvailable={isAvailable}
                            availableAt={availableAt}
                            handleKnowMore={handleKnowMore}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    };
    return (
        <View>
            {filteredItems && filteredItems.length > 0 && (
                <LeftSimple text={'Best Sellers'} />
            )}
            {filteredItems && renderItems()}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.fullWidth - dynamicSize(20),
        gap: 10,
        marginTop: dynamicSize(0),
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        marginTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: dynamicSize(6),
        paddingVertical: dynamicSize(10),
        justifyContent: 'center',
        elevation: 5,
        alignItems: 'center',
        width: dynamicSize(128),
        height: dynamicSize(175),
    },

    imageContainer: {
        alignItems: 'center',
    },

    dishImage: {
        width: dynamicSize(98.29),
        height: 98.29,
        borderRadius: 50,
        marginTop: -50,
    },
    dishName: {
        color: '#000',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: dynamicSize(19),
        height: dynamicSize(40),
        paddingTop: 10,
        textAlign: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginHorizontal: 5,
    },
    priceText: {
        color: '#000',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '400',
    },
    starImage: {
        width: dynamicSize(14),
        height: 14,
        marginRight: 4,
        marginLeft: 5,
    },
    tickIcon: {
        width: dynamicSize(20),
        height: dynamicSize(20),
    },
    ratingValue: {
        color: '#000',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '600',
        marginTop: dynamicSize(5),
    },
    selectButton: {
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',

        width: dynamicSize(88),
        height: 28,

        alignItems: 'center',
        marginTop: 10,
    },
    selectedButton: {
        backgroundColor: '#00B16A',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',

        width: dynamicSize(88),
        height: 28,

        alignItems: 'center',
        marginTop: 10,
    },
    selectButtonText: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(14),
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: dynamicSize(22), // You can use the exact value provided
        letterSpacing: -0.408,
    },
    selectButtonDisable: {
        backgroundColor: '#5D5956',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',

        width: dynamicSize(88),
        height: 28,
        paddingHorizontal: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    selectButtonDisableText: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(14),
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: dynamicSize(22), // You can use the exact value provided
        letterSpacing: -0.408,
    },
});

export default SubscriptionMeal;
