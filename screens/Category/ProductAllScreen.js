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

const profileMenuData = [
    {
        name: 'Profile',
        price: 200,
        size: ['S', 'M', 'L'],
        image: require('../../assets/images/zelp/brownDressUrbanic.webp'),
        navigateTo: 'ProfileEditing',
    },
    {
        name: 'Addresses',
        price: 200,
        size: ['S', 'M'],
        image: require('../../assets/images/zelp/brownDressUrbanic.webp'),
        navigateTo: 'Address',
    },
    {
        name: 'Payments and Refunds Payments and Refunds',
        price: 200,
        size: ['S', 'M', 'L', 'XL'],
        image: require('../../assets/images/zelp/brownDressUrbanic.webp'),
        navigateTo: 'Refunds',
    },
    {
        name: 'My Orders',
        price: 200,
        size: ['S', 'M', 'L'],
        image: require('../../assets/images/zelp/brownDressUrbanic.webp'),
        navigateTo: 'OrdersList',
    },
    {
        name: 'Referrals',
        price: 200,
        size: ['S'],
        image: require('../../assets/images/zelp/dressImage.jpeg'),
        navigateTo: 'Referrals',
    },
    {
        name: 'Help and Support',
        price: 200,
        size: ['M', 'L'],
        image: require('../../assets/images/zelp/dressImage.jpeg'),
        navigateTo: 'HelpAndSupport',
    },
    {
        name: 'Logout',
        price: 500,
        size: ['L'],
        image: require('../../assets/images/zelp/dressImage.jpeg'),
        navigateTo: 'LogIn',
    },
    {
        name: 'Delete Account',
        price: 200,
        size: ['S', 'M', 'L'],
        image: require('../../assets/images/zelp/dressImage.jpeg'),
        navigateTo: 'Profile',
    },
    {
        name: 'Profile',
        price: 200,
        size: ['XS', 'S', 'M', 'L'],
        image: require('../../assets/images/zelp/dressImage.jpeg'),
        navigateTo: 'ProfileEditing',
    },
];

const ProfileMenuItem = ({
    name,
    price,
    size,
    image_prop,
    navigateTo,
    navigation,
}) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={styles.productContainer}
            onPress={() => {
                console.log('Category Navigated');
                navigation.navigate('SingleProductScreen');
            }}>
            <View style={styles.ImageContainer}>
                <Image style={styles.imageStyle} source={image_prop} />
                {/* <View style={styles.imageStyle}>{image_prop}</View> */}
            </View>
            <View style={styles.productDescriptionContainer}>
                <Text style={styles.productName}>{sliceText(name, 18)}</Text>
                <Text style={styles.productPrice}>₹ {price}</Text>
                <View style={styles.productSizeContainer}>
                    {size.map((sizeAvailable, index) => {
                        return (
                            <Text style={styles.productSize}>
                                {sizeAvailable}
                            </Text>
                        );
                    })}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const ProductAllScreen = ({ navigation }) => {
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
                <View style={styles.mainContainer}>
                    {!isLoading &&
                        profileMenuData.map((profileItem, index) => {
                            return (
                                <ProfileMenuItem
                                    key={index}
                                    name={profileItem.name}
                                    price={profileItem.price}
                                    size={profileItem.size}
                                    desc={profileItem.desc}
                                    image_prop={profileItem.image}
                                    navigateTo={profileItem.navigateTo}
                                    navigation={navigation}
                                />
                            );
                        })}
                </View>

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
    mainContainer: {
        display: 'flex',
        paddingLeft: dynamicSize(8),
        paddingRight: dynamicSize(5),
        paddingBottom: dynamicSize(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexShrink: 0,
        width: dimensions.fullWidth,
        backgroundColor: colors.WHITE,
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
        width: dynamicSize(170),
        height: dynamicSize(250),
        marginVertical: dynamicSize(5),
        marginHorizontal: dynamicSize(4),
    },
    imageStyle: {
        width: dynamicSize(170),
        height: dynamicSize(250),
    },
    productDescriptionContainer: {
        width: dynamicSize(170),
        flexWrap: 'wrap',
        marginHorizontal: dynamicSize(4),
    },
    productName: {
        ...fonts.NUNITO_500_14,
        color: colors.BLACK,
        width: dynamicSize(170),
        flexWrap: 'wrap',
        paddingBottom: dynamicSize(5),
    },
    productPrice: {
        ...fonts.NUNITO_500_14,
        color: colors.BLACK,
        paddingBottom: dynamicSize(2),
    },
    productSizeContainer: {
        flexDirection: 'row',
    },
    productSize: {
        ...fonts.NUNITO_500_14,
        color: colors.BLACK,
        // padding: dynamicSize(5),
        // width: 20,
        // height: 20,
        paddingLeft: 8,
        paddingRight: 8,
        alignContent: 'center',
        marginHorizontal: 3,
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

export default ProductAllScreen;
