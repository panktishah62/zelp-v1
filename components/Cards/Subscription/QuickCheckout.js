import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
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
import { colors } from '../../../styles/colors';
import ComboCard from './ComboCard';
import {
    addItemToCart,
    removeItemFromCart,
} from '../../../redux/actions/subscriptionCart';
import ItemCard from './ItemCard';
import { showDialog } from '../../../redux/actions/dialog';
import { DialogTypes } from '../../../utils';
import FastImage from 'react-native-fast-image';

const QuickCheckout = props => {
    const { navigation } = props;
    const {
        firstActive,
        secondActive,
        bestSellerItemCard,
        QuickCheckoutArray,
        quickCheckoutNotAvailableItems,
        orderHistory,
        isLoadingForCheckoutItems,
        isLoadingForOrderHistory,
        handleKnowMore,
    } = props;

    const dispatch = useDispatch();

    const reorderButtonHandler = item => {
        if (currentOrder && currentOrder?._id) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Order in Progress',
                    subTitleText:
                        'Your Current Order is in Progress, cannot add item to cart',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            dispatch(addItemToCart(item));
            navigation.navigate('SubscriptionCart', { subscriptionId: '' });
        }
    };
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);

    const OrderHistoryItemCard = () => {
        return (
            orderHistory &&
            orderHistory.map((item, index) => (
                <View key={index} style={styles1.container}>
                    <View style={styles1.firstContainer}>
                        <View style={styles1.imageContainer}>
                            {item?.combo?.image && (
                                <FastImage
                                    style={styles1.image}
                                    source={{ uri: item.combo.image }}
                                />
                            )}
                        </View>
                        <View style={styles1.textContainer}>
                            <Text
                                style={styles1.name}
                                numberOfLines={2}
                                ellipsizeMode="tail">
                                {item?.combo?.title}
                            </Text>
                            <Text style={styles1.time}>
                                {moment(item.createdAt)
                                    .format('DD-MM-YYYY h:mm A')
                                    .toString()}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => reorderButtonHandler(item?.combo)}>
                        <View style={styles1.secondContainer}>
                            <View style={styles1.iconContainer}>
                                <FastImage
                                    style={styles1.icon}
                                    source={require('../../../assets/images/Subscription/leftRoundArrow.png')}
                                />
                                <FastImage
                                    style={styles1.icon}
                                    source={require('../../../assets/images/Subscription/rightRoundArrow.png')}
                                />
                            </View>
                            <View>
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
            <View>
                {!isLoadingForCheckoutItems && (
                    <View style={styles.wrapperContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <View style={styles.innerContainer}>
                                <ItemCard
                                    ItemCards={bestSellerItemCard}
                                    isVegButtonActive={false}
                                    isAvailable={true}
                                    handleKnowMore={handleKnowMore}
                                />
                                <ItemCard
                                    ItemCards={quickCheckoutNotAvailableItems}
                                    isVegButtonActive={false}
                                    isAvailable={false}
                                    handleKnowMore={handleKnowMore}
                                />
                            </View>
                        </ScrollView>
                    </View>
                )}
                {isLoadingForCheckoutItems && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator
                            color={colors.ORANGE_WHITE}
                            size={32}
                        />
                    </View>
                )}
            </View>
        );
    } else {
        return (
            <View style={styles1.wrapperContainer}>
                {!isLoadingForOrderHistory && OrderHistoryItemCard()}
                {isLoadingForOrderHistory && (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator
                            color={colors.ORANGE_WHITE}
                            size={32}
                        />
                    </View>
                )}
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
        gap: dynamicSize(10),
        flexDirection: 'column',
        marginBottom: dynamicSize(40),
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: dynamicSize(10),
        flexDirection: 'column',
    },
    name: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '600',
    },
    time: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(12),
        fontStyle: 'normal',
        fontWeight: '500',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(12),
        fontStyle: 'normal',
        fontWeight: '500',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth - dynamicSize(60),
        borderWidth: 1,
        borderRadius: dynamicSize(10),
        marginTop: dynamicSize(10),
        height: dynamicSize(75),
        flexDirection: 'row',
    },
    firstContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    secondContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: dynamicSize(6),
        elevation: 5,
        marginRight: dynamicSize(10),
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: dynamicSize(28),
        width: dynamicSize(94),
        height: dynamicSize(27),
    },
    image: {
        width: dynamicSize(51),
        height: dynamicSize(51),
        marginLeft: dynamicSize(10),
        marginRight: dynamicSize(10),
    },
    imageContainer: {},
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
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
        // textAlign: 'center',
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
    activityIndicator: {
        marginTop: dynamicSize(100),
    },
});

export default QuickCheckout;
