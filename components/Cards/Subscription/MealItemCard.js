import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import VEGICON from '../../../assets/icons/VegIcon.svg';
import NONVEGICON from '../../../assets/icons/nonveg.svg';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import STAR_ICON from '../../../assets/icons/starIcon.svg';
import SELECTED_ICON from '../../../assets/icons/Selected.svg';
import KNOW_MORE from '../../../assets/icons/know_more.svg';
import { colors } from '../../../styles/colors';
import { dimensions, fonts } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { showDialog } from '../../../redux/actions/dialog';
import { DialogTypes } from '../../../utils';
const MealItemCard = props => {
    const {
        item,
        isSelectable = false,
        isRemovable = false,
        handleKnowMore,
        onSelectItem,
        onUnSelectItem,
        isAvailable = true,
        availableAt,
    } = props;
    const { selectedItem } = useSelector(state => state.subscriptionCart);
    const [isSelectedAny, setIsSelected] = useState(
        selectedItem ? selectedItem?._id === item?._id : false,
    );
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsSelected(selectedItem ? selectedItem?._id === item?._id : false);
    }, [selectedItem]);

    const selectButtonHandler = () => {
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
            onSelectItem(item);
        }
    };

    const unselectButtonHandler = () => {
        onUnSelectItem();
    };

    const selectRemoveButtonHandler = () => {
        onUnSelectItem();
    };

    return (
        <View style={styles.wrapperContainer}>
            <View style={styles.itemConainer}>
                <View style={styles.leftContainer}>
                    {item?.image && (
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.imageStyle}
                                source={{ uri: item.image }}
                            />
                        </View>
                    )}
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.firstContainer}>
                        {item?.category === 'Veg' && (
                            <View style={styles.vegContainer}>
                                <VEGICON />
                                <Text style={styles.vegText}>
                                    {item.category}
                                </Text>
                            </View>
                        )}
                        {item?.category === 'NonVeg' && (
                            <View style={styles.vegContainer}>
                                <NONVEGICON />
                                <Text style={styles.vegText}>
                                    {item.category}
                                </Text>
                            </View>
                        )}
                        <View style={styles.middleTextContainer}>
                            <Text
                                style={styles.boldText}
                                numberOfLines={
                                    isSelectable || isRemovable ? 1 : 2
                                }
                                ellipsizeMode="tail">
                                {item?.title}
                            </Text>
                            {item?.rating && (
                                <Text
                                    style={[
                                        styles.firstText,
                                        { marginLeft: dynamicSize(3) },
                                    ]}>
                                    <STAR_ICON style={styles.iconStyle} />
                                    {item.rating?.value}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => handleKnowMore(item)}>
                            <View style={styles.vegContainer}>
                                <Text style={styles.lastText}>Know more</Text>
                                <KNOW_MORE />
                            </View>
                        </TouchableOpacity>

                        {isAvailable && isSelectable && !isSelectedAny && (
                            <TouchableOpacity onPress={selectButtonHandler}>
                                <View style={styles.selectButtonContainer}>
                                    <Text style={styles.selectButtonText}>
                                        Select
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        {isAvailable && isSelectable && isSelectedAny && (
                            <TouchableOpacity onPress={unselectButtonHandler}>
                                <View style={styles.selectedButtonContainer}>
                                    <SELECTED_ICON />
                                </View>
                            </TouchableOpacity>
                        )}
                        {isAvailable && isRemovable && isSelectedAny && (
                            <TouchableOpacity
                                onPress={selectRemoveButtonHandler}>
                                <View style={styles.selectButtonContainer}>
                                    <Text style={styles.selectButtonText}>
                                        Remove
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        {!isAvailable && availableAt?.openingTime && (
                            <View>
                                <View
                                    style={styles.notAvailableButtonContainer}>
                                    <Text style={styles.notAvailableButtonText}>
                                        Available at {availableAt?.openingTime}-
                                        {availableAt?.closingTime}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    imageContainer: {
        height: '100%',
        width: '100%',
        // backgroundColor: colors.BLACK,
    },
    image: {
        width: dynamicSize(100),
    },
    nextImage: {
        marginLeft: dynamicSize(10),
    },
    wrapperContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: dynamicSize(10),
        marginVertical: dynamicSize(10),
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(14),
        elevation: 5,
    },
    middleTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: dynamicSize(10),
        backgroundColor: colors.WHITE_DARK,
    },
    itemConainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: dynamicSize(130),
        marginVertical: dynamicSize(5),
    },
    leftContainer: {
        flex: 1,
        width: '40%',
        height: '100%',
        width: '100%',
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: dynamicSize(5),
    },
    rightContainer: {
        display: 'flex',
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    firstContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',

        height: dynamicSize(100),
        flexShrink: 0,
    },
    secondContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: dynamicSize(100),
    },
    vegContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: dynamicSize(6),
        marginLeft: dynamicSize(4),
    },
    boldText: {
        flex: 1,
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(17),
        fontStyle: 'normal',
        fontWeight: '600',
        marginVertical: dynamicSize(6),
        marginLeft: dynamicSize(4),
        marginRight: dynamicSize(10),
    },
    lastText: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '400',
    },
    firstText: {
        color: colors.DARKER_GRAY,
        textAlign: 'center',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(12),
        fontStyle: 'normal',
        fontWeight: '400',
        paddingRight: dynamicSize(10),
    },
    gradient: {
        borderRadius: 14,
    },

    starContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: dynamicSize(6),
    },
    vegText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    selectButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: dynamicSize(22),
        width: dynamicSize(84),
        height: dynamicSize(25),
        marginTop: dynamicSize(10),
    },
    notAvailableButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.GREY_BUTTON,
        borderRadius: 22,
        width: dynamicSize(130),
        height: 25,
        marginTop: dynamicSize(10),
    },
    tickIcon: {
        width: dynamicSize(20),
        height: dynamicSize(20),
    },
    selectedButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.GREEN_SHADE,
        borderRadius: dynamicSize(22),
        width: dynamicSize(84),
        height: dynamicSize(28),
        marginTop: dynamicSize(10),
    },
    selectButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(14),
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: -0.408,
    },
    notAvailableButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(10),
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: -0.408,
    },
    selectDisableButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors,
        borderRadius: dynamicSize(22),
        width: dynamicSize(84),
        height: dynamicSize(25),
        marginTop: dynamicSize(10),
    },
    selectDisableButtonText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 22,
        letterSpacing: -0.408,
    },
    imageStyle: {
        // height: dynamicSize(100),
        height: '100%',
        width: '100%',
        borderRadius: dynamicSize(8),
    },
    iconStyle: {
        marginBottom: dynamicSize(5),
    },
});

export default MealItemCard;
