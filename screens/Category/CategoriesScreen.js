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
        image: <PROFILE_EDIT />,
        navigateTo: 'ProfileEditing',
    },
    {
        name: 'Addresses',
        image: <ADDRESS />,
        navigateTo: 'Address',
    },
    {
        name: 'Payments and Refunds',
        image: <RUPEE />,
        navigateTo: 'Refunds',
    },
    {
        name: 'My Orders',
        image: <CART />,
        navigateTo: 'OrdersList',
    },
    {
        name: 'Referrals',
        image: (
            <Image
                source={require('../../assets/icons/referral.png')}
                style={{ height: 25, width: 25 }}
            />
        ),
        navigateTo: 'Referrals',
    },
    {
        name: 'Help and Support',
        image: <QUESTIONMARKCIRCLE />,
        navigateTo: 'HelpAndSupport',
    },
    {
        name: 'Logout',
        image: <LOGOUT />,
        navigateTo: 'LogIn',
    },
    {
        name: 'Delete Account',
        image: <DELETEICON />,
        navigateTo: 'Profile',
    },
    {
        name: 'Profile',
        image: <PROFILE_EDIT />,
        navigateTo: 'ProfileEditing',
    },
];

const ProfileMenuItem = ({ name, image_prop, navigateTo, navigation }) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={styles.profileItemContainer}
            onPress={() => {
                console.log('Category Navigated from categories SCreen');
                navigation.navigate('ProductAllScreen');
            }}>
            <View style={styles.textPosition}>
                <Text style={styles.categoryType}>{name}</Text>
            </View>
            <View style={styles.imageStyle}>{image_prop}</View>
        </TouchableOpacity>
    );
};

const CategoriesScreen = ({ navigation }) => {
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
    profileItemContainer: {
        backgroundColor: colors.GREY_BORDER,
        borderRadius: 8,
        width: dynamicSize(160),
        height: dynamicSize(100),
        marginVertical: dynamicSize(10),
        marginHorizontal: dynamicSize(10),
    },
    textPosition: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: dynamicSize(100),
        flexWrap: 'wrap',
        paddingTop: dynamicSize(15),
        paddingLeft: dynamicSize(15),
    },
    categoryType: {
        ...fonts.NUNITO_600_16,
        color: colors.BLACK,
    },
    imageStyle: {
        width: 25,
        height: 25,
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: dynamicSize(10),
        right: dynamicSize(10),
        backgroundColor: colors.BLUE_DARK,
    },
    loadingContainer: {
        height: dimensions.fullHeight * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoriesScreen;
