import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import STAR_ICON from '../../../assets/icons/starIcon.svg';
import SELECTED_ICON from '../../../assets/icons/Selected.svg';
import { useSelector } from 'react-redux';
import KNOW_MORE from '../../../assets/icons/know_more.svg';
import FastImage from 'react-native-fast-image';

const ComboCard = props => {
    const {
        item,
        onSelectItem,
        onUnSelectItem,
        isAvailable = true,
        handleKnowMore,
    } = props;
    const selectButtonHandler = () => {
        onSelectItem(item);
    };
    const { selectedItem } = useSelector(state => state.subscriptionCart);
    const [isSelectedAny, setIsSelected] = useState(
        selectedItem ? selectedItem?._id === item?._id : false,
    );
    const unselectButtonHandler = () => {
        onUnSelectItem();
    };

    useEffect(() => {
        setIsSelected(selectedItem ? selectedItem?._id === item?._id : false);
    }, [selectedItem]);
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {item?.image && (
                    <View style={styles.innerImageContainer}>
                        <FastImage
                            style={styles.dishImage}
                            source={{ uri: item.image }}
                            resizeMode="cover"
                        />
                    </View>
                )}
            </View>
            <Text
                style={styles.dishName}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item?.title}
            </Text>
            <TouchableOpacity onPress={() => handleKnowMore(item)}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingValue}>more info</Text>
                    <KNOW_MORE />
                </View>
            </TouchableOpacity>
            {isAvailable && isSelectedAny && (
                <TouchableOpacity
                    style={styles.selectedButton}
                    onPress={unselectButtonHandler}>
                    <SELECTED_ICON />
                </TouchableOpacity>
            )}
            {isAvailable && !isSelectedAny && (
                <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => selectButtonHandler()}>
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
            )}
            {!isAvailable && (
                <View
                    style={styles.notAvailableButton}
                    onPress={() => selectButtonHandler()}>
                    <Text style={styles.notAvailableButtonText}>
                        Not Available
                    </Text>
                </View>
            )}
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

        gap: dynamicSize(10),
        marginTop: dynamicSize(20),
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: dynamicSize(10),
        marginTop: dynamicSize(50),
        marginBottom: dynamicSize(20),
        alignItems: 'center',
    },
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(10),
        paddingHorizontal: dynamicSize(6),
        // paddingVertical: dynamicSize(10),
        // justifyContent: 'center',
        elevation: 5,
        alignItems: 'center',
        width: dynamicSize(132),
        height: dynamicSize(216),
    },

    imageContainer: {
        // alignItems: 'center',
        // top: 0,
        // elevation: dynamicSize(2),
    },
    innerImageContainer: {
        // elevation: dynamicSize(30),
        justifyContent: 'center',
        alignItems: 'center',
        width: dynamicSize(132),
        height: dynamicSize(100),
        // borderWidth: 1,
        // borderRadius: dynamicSize(50),
        // marginTop: dynamicSize(-50),
    },
    dishImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: dynamicSize(10),
        borderTopRightRadius: dynamicSize(10),
        // borderRadius: dynamicSize(50),
    },
    dishName: {
        color: '#000',
        ...fonts.POPPINS_500_12,
        // lineHeight: dynamicSize(19),
        height: dynamicSize(40),
        paddingTop: 10,
        textAlign: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: dynamicSize(5),
        marginHorizontal: dynamicSize(5),
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
        height: dynamicSize(14),
        marginRight: dynamicSize(4),
        marginLeft: dynamicSize(5),
    },
    tickIcon: {
        width: dynamicSize(20),
        height: dynamicSize(20),
    },
    ratingValue: {
        color: '#000',
        ...fonts.POPPINS_400_12,
        paddingRight: dynamicSize(3),
    },
    selectButton: {
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: dynamicSize(25),
        display: 'flex',
        justifyContent: 'center',

        width: dynamicSize(88),
        height: dynamicSize(28),

        alignItems: 'center',
        marginTop: dynamicSize(10),
    },
    selectedButton: {
        backgroundColor: '#00B16A',
        borderRadius: dynamicSize(25),
        display: 'flex',
        justifyContent: 'center',

        width: dynamicSize(88),
        height: dynamicSize(28),

        alignItems: 'center',
        marginTop: dynamicSize(10),
    },
    notAvailableButton: {
        backgroundColor: colors.GREY_BUTTON,
        borderRadius: dynamicSize(25),
        display: 'flex',
        justifyContent: 'center',

        width: dynamicSize(88),
        height: dynamicSize(28),

        alignItems: 'center',
        marginTop: dynamicSize(10),
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
    notAvailableButtonText: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: dynamicSize(10),
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: dynamicSize(22), // You can use the exact value provided
        letterSpacing: -0.408,
    },
    selectButtonDisable: {
        backgroundColor: '#5D5956',
        borderRadius: dynamicSize(25),
        display: 'flex',
        justifyContent: 'center',

        width: dynamicSize(88),
        height: dynamicSize(28),
        paddingHorizontal: dynamicSize(25),
        alignItems: 'center',
        marginTop: dynamicSize(10),
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

export default ComboCard;
