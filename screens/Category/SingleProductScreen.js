import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
    Platform,
} from 'react-native';
import HeaderWithTitle from '../../components/Header/HeaderWithTitle';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import EmptyProfileIcon from '../../assets/icons/emptyProfile.svg';
import { YellowButton } from '../../components/Buttons/YellowButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, logoutUser } from '../../redux/actions/auth';

import PROFILE_EDIT from '../../assets/icons/account-circle.svg';
import ADDRESS from '../../assets/icons/address-book.svg';
import CART from '../../assets/icons/cart.svg';
import QUESTIONMARKCIRCLE from '../../assets/icons/help-circle-outline.svg';
import LOGOUT from '../../assets/icons/logout.svg';
// import LOGOUT from '../../assets/images/zelp/dressImage.jpeg';
import RUPEE from '../../assets/icons/rupee-sign.svg';
import DELETEICON from '../../assets/icons/DeleteIcon.svg';
import { getAllAddress, getDefaultAddress } from '../../redux/actions/address';
import { getUserProfile } from '../../redux/actions/user';
import { sliceText } from '../../utils';
import BackRightIcon from '../../assets/icons/backRight.svg';
import { Popup } from 'react-native-popup-confirm-toast';
import { dynamicSize } from '../../utils/responsive';

const USER = './../../assets/icons/profileEdit.png';

const profileItem = {
    name: 'Profile',
    price: 200,
    size: ['S', 'M', 'L'],
    productColor: 'Black',
    image: require('../../assets/images/zelp/brownDressUrbanic.webp'),
    navigateTo: 'ProfileEditing',
};

const SingleProductScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user.userProfile);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!userProfile) {
            setIsLoading(true);
            dispatch(getUserProfile(setIsLoading));
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {!isLoading && (
                    <TouchableOpacity
                        style={styles.productContainer}
                        onPress={() => {
                            console.log('Category Navigated');
                            // navigation.navigate(navigateTo);
                        }}>
                        <View style={styles.ImageContainer}>
                            <Image
                                style={styles.imageStyle}
                                source={profileItem.image}
                            />
                        </View>
                        <View style={styles.productDescriptionContainer}>
                            <Text style={styles.productName}>
                                {profileItem.name}
                            </Text>
                            <Text style={styles.productPrice}>
                                ₹ {profileItem.price}
                            </Text>
                            <Text style={styles.priceTaxText}>
                                Inclusive of all taxes
                            </Text>
                            <View style={styles.colorOuterContainer}>
                                <View style={styles.colorContainer}>
                                    <Text style={styles.colorText}>
                                        COLOR :{' '}
                                    </Text>
                                    <Text style={styles.productColor}>
                                        {profileItem.productColor}
                                    </Text>
                                </View>
                                <View style={styles.productSizeContainer}>
                                    {profileItem.size.map(
                                        (sizeAvailable, index) => {
                                            return (
                                                <Text
                                                    style={styles.productSize}>
                                                    {sizeAvailable}
                                                </Text>
                                            );
                                        },
                                    )}
                                </View>
                            </View>

                            <View style={styles.colorOuterContainer}>
                                <View style={styles.colorContainer}>
                                    <Text style={styles.colorText}>
                                        Size :{' '}
                                    </Text>
                                    <Text style={styles.productColor}>
                                        {profileItem.size}
                                    </Text>
                                </View>
                                <View style={styles.productSizeContainer}>
                                    {profileItem.size.map(
                                        (sizeAvailable, index) => {
                                            return (
                                                <Text
                                                    style={styles.productSize}>
                                                    {sizeAvailable}
                                                </Text>
                                            );
                                        },
                                    )}
                                </View>
                            </View>
                            <View style={styles.colorOuterContainer}>
                                <View style={styles.colorContainer}>
                                    <Text style={styles.colorText}>
                                        Delivery To :{' '}
                                    </Text>
                                    <Text style={styles.productColor}>
                                        {profileItem.size}
                                    </Text>
                                </View>
                               <View>
                                <Text>Delivery cHECKER</Text>
                               </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.ORANGE} />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        flex: 1,
    },
    productContainer: {
        // height: dynamicSize(300),
        paddingBottom: dynamicSize(20),
        // backgroundColor: colors.RED,
        // borderColor: colors.BLACK,
        // borderWidth: 1,
    },
    ImageContainer: {
        backgroundColor: colors.GREY_CARD,
        width: dimensions.fullWidth,
        height: dimensions.fullHeight * 0.7,
    },
    imageStyle: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight * 0.7,
    },
    productDescriptionContainer: {
        width: dimensions.fullWidth * 0.8,
        padding: dynamicSize(10),
        marginHorizontal: dynamicSize(4),
        // backgroundColor: colors.BLUE_DARK,
    },
    productName: {
        ...fonts.NUNITO_700_18,
        color: colors.BLACK,
        width: dynamicSize(170),
        flexWrap: 'wrap',
        paddingBottom: dynamicSize(15),
    },
    colorOuterContainer: {
        paddingBottom: dynamicSize(20),
    },
    colorContainer: {
        flexDirection: 'row',
    },
    colorText: {
        ...fonts.NUNITO_500_14,
        color: colors.BLACK,
    },
    productColor: {
        ...fonts.NUNITO_500_14,
        color: colors.BLACK,
    },
    // lineBreak: {
    //     width: dimensions.fullWidth * 0.8,
    //     height: 1,
    //     color: colors.GREY_CARD,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingBottom: 2,
    // },
    productPrice: {
        ...fonts.NUNITO_600_16,
        color: colors.BLACK,
        // paddingBottom: dynamicSize(2),
    },
    priceTaxText: {
        ...fonts.NUNITO_600_14,
        color: colors.GRAY_30,
    },
    productSizeContainer: {
        flexDirection: 'row',
        paddingTop: 5,
    },
    productSize: {
        ...fonts.NUNITO_500_16,
        color: colors.BLACK,
        paddingLeft: dynamicSize(10),
        paddingRight: dynamicSize(10),
        paddingTop: dynamicSize(7),
        paddingBottom: dynamicSize(7),
        alignContent: 'center',
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: colors.GREY_BORDER,
        backgroundColor: colors.WHITE,
    },
    loadingContainer: {
        height: dimensions.fullHeight * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SingleProductScreen;
