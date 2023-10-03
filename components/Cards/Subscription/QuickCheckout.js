import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import {
    addSubscribedItemToCart,
    selectMenu,
    setSubscriptionMealType,
} from '../../../redux/actions/subscriptionActions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const data = [
    {
        image: require('../../../assets/images/Subscription/salad_3.png'),
        text: 'Choose your Preferred Meal',
    },
    {
        image: require('../../../assets/images/Subscription/clock.png'),
        text: 'Wide Variety of options',
    },
];

const QuickCheckout = props => {
    const { navigation } = props;
    const {
        firstActive,
        secondActive,
        bestSellerItemCard,
        QuickCheckoutArray,
    } = props;
    const { mealType, mealPlanTime, mealPlanId } = useSelector(
        state => state.mealTypeForSubscription,
    );

    console.log(QuickCheckoutArray, 'QuickCheckoutArray');

    const reorderButtonHandler = (
        itemName,
        itemImage,
        itemType,
        itemId,
        foodItemId,
        mealType,
        mealPlanId,
    ) => {
        const cartObj = {
            itemName,
            itemImage,
            itemType,
            itemId,
            foodItemId,
        };
        dispatch(addSubscribedItemToCart(cartObj));
        dispatch(setSubscriptionMealType(mealType, mealPlanId, ''));
        navigation.navigate('SubscriptionCart', { subscriptionId: '' });
    };

    const currentDate = moment();

    const { isVegButtonActive } = useSelector(state => state.vegbutton);
    const dispatch = useDispatch();
    const {
        isSelectedAny,
        index: gotIndex,
        componentName,
    } = useSelector(state => state.subscriptionSelectMenu);
    console.log(isSelectedAny, gotIndex, componentName);
    const BestSellerItemCard = (bestSellerItemCard, isVegButtonActive) => {
        const selectButtonHandler = (
            index,
            componentName,
            itemName,
            itemImage,
            itemType,
            foodItemId,
        ) => {
            // dispatch(resetSelectionButton())
            dispatch(selectMenu(index, componentName));
            itemAddToCartHandler(
                index,
                itemName,
                itemImage,
                itemType,
                foodItemId,
            );
        };

        const itemAddToCartHandler = (
            index,
            itemName,
            itemImage,
            itemType,
            foodItemId,
        ) => {
            console.log(foodItemId, 'mohito');
            const cartObj = {
                itemName,
                itemImage,
                itemType,
                itemId: index,
                foodItemId,
            };
            dispatch(addSubscribedItemToCart(cartObj));
        };
        let filterData;
        if (bestSellerItemCard) {
            filterData = isVegButtonActive
                ? bestSellerItemCard.filter(item => item.iVeg === true)
                : bestSellerItemCard;
            console.log(bestSellerItemCard, 'filterData');
        }

        console.log(filterData, 'filterData');
        return (
            filterData &&
            filterData.map((item, index) => (
                <View key={index} style={styles.container}>
                    <View style={styles.imageContainer}>
                        {/* <Image source={require('../../../assets/images/Subscription/dish_image.png')}/> */}

                        <Image
                            style={styles.dishImage}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Image
                            source={require('../../../assets/images/Subscription/golden_star.png')}
                            style={styles.starImage}
                        />
                        <Text style={styles.ratingValue}>
                            {item.rating.value}
                        </Text>
                    </View>
                    {isSelectedAny &&
                        gotIndex === index &&
                        componentName === 'BestSellerItemCard' && (
                            <TouchableOpacity style={styles.selectedButton}>
                                <Image
                                    style={styles.tickIcon}
                                    source={require('../../../assets/images/Subscription/tick.png')}
                                />
                            </TouchableOpacity>
                        )}

                    {isSelectedAny &&
                        gotIndex === index &&
                        componentName !== 'BestSellerItemCard' && (
                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() =>
                                    selectButtonHandler(
                                        index,
                                        'BestSellerItemCard',
                                        item.name,
                                        item.image,
                                        item.isVeg ? 'Veg' : 'Non Veg',
                                        item._id,
                                    )
                                }>
                                <Text style={styles.selectButtonText}>
                                    Select
                                </Text>
                            </TouchableOpacity>
                        )}
                    {isSelectedAny && gotIndex !== index && (
                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={() =>
                                selectButtonHandler(
                                    index,
                                    'BestSellerItemCard',
                                    item.name,
                                    item.image,
                                    item.isVeg ? 'Veg' : 'Non Veg',
                                    item._id,
                                )
                            }>
                            <Text style={styles.selectButtonText}>Select</Text>
                        </TouchableOpacity>
                    )}
                    {!isSelectedAny && (
                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={() =>
                                selectButtonHandler(
                                    index,
                                    'BestSellerItemCard',
                                    item.name,
                                    item.image,
                                    item.isVeg ? 'Veg' : 'Non Veg',
                                    item._id,
                                )
                            }>
                            <Text style={styles.selectButtonText}>Select</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))
        );
    };

    const OrderHistoryItemCard = () => {
        return (
            QuickCheckoutArray &&
            QuickCheckoutArray.map((item, index) => (
                <View key={index} style={styles1.container}>
                    <View style={styles1.firstContainer}>
                        <View style={styles1.imageContainer}>
                            <Image
                                style={styles1.image}
                                source={require('../../../assets/images/Subscription/dish_image.png')}
                            />
                        </View>
                        <View style={styles1.textContainer}>
                            <Text style={styles1.name}>
                                {item?.foodItem?.name}
                            </Text>
                            <Text style={styles1.time}>
                                {moment(item.createdAt)
                                    .format('DD-MM-YYYY h:mm A')
                                    .toString()}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            reorderButtonHandler(
                                item.foodItem.name,
                                item.foodItem.image,
                                item.foodItem.isVeg ? 'Veg' : 'NonVeg',
                                index,
                                item.foodItem._id,
                                item.mealPlans.type,
                                item.mealPlans._id,
                            )
                        }>
                        <View style={styles1.secondContainer}>
                            <View style={styles1.iconContainer}>
                                <Image
                                    style={styles1.icon}
                                    source={require('../../../assets/images/Subscription/leftRoundArrow.png')}
                                />
                                <Image
                                    style={styles1.icon}
                                    source={require('../../../assets/images/Subscription/rightRoundArrow.png')}
                                />
                            </View>
                            <View style={styles1.textContainerTwo}>
                                <Text style={styles1.buttonText}>Reorder</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ))
        );
    };

    if (firstActive) {
        return (
            <View style={styles.wrapperContainer}>
                <ScrollView horizontal>
                    <View style={styles.innerContainer}>
                        {BestSellerItemCard(
                            bestSellerItemCard,
                            isVegButtonActive,
                        )}
                    </View>
                </ScrollView>
            </View>
        );
    } else {
        return (
            <View style={styles1.wrapperContainer}>
                {OrderHistoryItemCard()}
            </View>
        );
    }
};

//style for the Order History Item Card
const styles1 = StyleSheet.create({
    wrapperContainer: {
        marginTop: dynamicSize(20),
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flexDirection: 'column',
        marginBottom: dynamicSize(40),
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flexDirection: 'column',
    },
    name: {
        color: '#3D3D3D',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '600',
    },
    time: {
        color: '#3D3D3D',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(12),
        fontStyle: 'normal',
        fontWeight: '500',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    container: {
        display: 'flex',

        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth - 60,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        height: 75,
        flexDirection: 'row',
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        flexDirection: 'row',
        gap: 8,
    },
    secondContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
        elevation: 5,
        marginRight: 10,
        backgroundColor: '#E1740F',
        borderRadius: 28.5,
        width: 93.319,
        height: 26.625,
    },
    image: {
        width: 51.52,
        height: 51.52,
    },
    imageContainer: {},
    textContainer: {},
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
    },
    icon: {
        width: 10.496,
        height: 3.751,
    },
});

const styles = StyleSheet.create({
    wrapperContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: dimensions.fullWidth - dynamicSize(20),

        gap: 10,
        marginTop: dynamicSize(20),
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        marginTop: dynamicSize(50),
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
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    selectButton: {
        backgroundColor: '#E1740F',
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

export default QuickCheckout;
