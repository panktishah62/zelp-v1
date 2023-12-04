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

const USER = './../../assets/icons/profileEdit.png';

const CategoryData = [
    {
        name: 'Trading Card Games',        
        image: <PROFILE_EDIT />,
        navigateTo: 'CategoryAuction',
        isLoggedIn: true,
    },
    {
        name: 'Sports Cards',
        image: <ADDRESS />,
        navigateTo: 'CategoryAuction',
        isLoggedIn: true,
    },
    {
        name: 'Toys and Hobbies',
        image: <RUPEE />,
        navigateTo: 'CategoryAuction',
        isLoggedIn: true,
    },
    {
        name: 'Comics',
        image: <CART />,
        navigateTo: 'CategoryAuction',
        isLoggedIn: true,
    },
    {
        name: 'Women\'s fashion',
        image: (
            <Image
                source={require('../../assets/icons/referral.png')}
                style={{ height: 25, width: 25 }}
            />
        ),
        navigateTo: 'CategoryAuction',
        isLoggedIn: true,
    },
    {
        name: 'Sneakers & StreetWear',
        image: <QUESTIONMARKCIRCLE />,
        navigateTo: 'CategoryAuction',
        isLoggedIn: false,
    },
    {
        name: 'Bags & Accessories',
        image: <LOGOUT />,
        navigateTo: 'CategoryAuction',
        isLoggedIn: true,
    },
    {
        name: 'Books',
        image: <DELETEICON />,
        navigateTo: 'CategoryAuction',
        isLoggedIn: true,
    },
];

const CategoryItem = ({
    name,
    desc,
    image_prop,
    navigateTo,
    navigation,
}) => {
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user.userProfile);
    const [userData, setUserData] = useState('');
    const handleLogout = () => {
        const response = dispatch(logoutUser());
    };
    useEffect(() => {
        if (userProfile) {
            setUserData(userProfile);
        }
    }, [userProfile, navigation]);

    return (
        <TouchableOpacity
            style={[
                Styles.row_space_between,
                styles.profileItemContainer,
                styles.boxShadow,
                styles.elevation,
                { marginVertical: 1, marginHorizontal: 8 },
            ]}
            onPress={() => {
                // if (name === 'Logout') {
                //     handleLogout();
                //     dispatch(getDefaultAddress());
                //     navigation.popToTop();
                //     return;
                // }
                // if (name === 'Profile') {
                //     navigation.navigate(navigateTo, {
                //         id: userData._id,
                //         fullName: userData.name,
                //         email: userData.email,
                //         dob: userData.dateOfBirth
                //             ? userData.dateOfBirth
                //             : Date.now(),
                //         gender: userData.gender ? userData.gender : '',
                //         phoneNo: userData.mobNo,
                //     });
                //     return;
                // }
                // if (name === 'Addresses') {
                //     navigation.navigate(navigateTo);
                //     return;
                // }
                // if (name === 'Delete Account') {
                //     Popup.show({
                //         type: 'confirm',
                //         title: 'Delete Account?',
                //         textBody:
                //             'Are you sure you want to delete your account?',
                //         buttonText: 'No',
                //         confirmText: 'Yes',
                //         confirmButtonTextStyle: { color: colors.ORANGE },
                //         timing: 10000,
                //         callback: () => {
                //             Popup.hide();
                //         },
                //         cancelCallback: () => {
                //             dispatch(deleteAccount());
                //             navigation.popToTop();
                //             Popup.hide();
                //         },
                //     });
                //     return;
                // }
                console.log("Category navigated");
                navigation.navigate(navigateTo);
            }}>
            <View style={Styles.row}>
                <View style={styles.imageStyle}>{image_prop}</View>
                <View>
                    <Text
                        style={[
                            fonts.NUNITO_500_16,
                            Styles.default_text_color,
                        ]}>
                        {name}
                    </Text>                   
                </View>
            </View>
            <BackRightIcon />
        </TouchableOpacity>
    );
};

const BrowseScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user.userProfile);
    const _defaultAddress = useSelector(state => state.address.defaultAddress);
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');
    const [defaultAddress, setDefaultAdddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!userProfile) {
            setIsLoading(true);
            dispatch(getUserProfile(setIsLoading));
        }
    }, []);

    useEffect(() => {
        // navigation.setOptions({
        //     header: () => (
        //         <HeaderWithTitle navigation={navigation} title="Profile" />
        //     ),
        // });
        if (userProfile) {
            setUser(userProfile);
        }
    }, [navigation, userProfile, _defaultAddress]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {CategoryData.map((profileItem, index) => {
                    return (
                        <CategoryItem
                            key={index}
                            name={profileItem.name}
                            desc={profileItem.desc}
                            image_prop={profileItem.image}
                            navigateTo={profileItem.navigateTo}
                            navigation={navigation}
                        />
                    );
                })}
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
    button: {
        alignItems: 'center',
        backgroundColor: colors.YELLOW_MUSTARD,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    buttonText: {
        color: colors.WHITE,
        fontWeight: 'bold',
        marginLeft: 3,
    },
    elevation: {
        backgroundColor: colors.WHITE,
        padding: 20,
        borderRadius: 8,

        ...Platform.select({
            ios: {
                shadowColor: colors.BLACK,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.09,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    boxShadow: {
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: colors.WHITE,
        padding: 25,
        borderRadius: 8,
        marginVertical: 5,
    },
    profileItemContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    imageStyle: {
        width: 45,
        height: 45,
        marginRight: 5,
        marginLeft: 10,
        resizeMode: 'contain',
        justifyContent:'center'
    },
    userNameText: {
        ...fonts.NUNITO_700_24,
        ...Styles.default_text_color,
    },
    userNumberText: {
        color: colors.GREY_MEDIUM,
        ...fonts.NUNITO_700_12,
    },
    userCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userCardContainer: {
        flex: 1,
        ...Styles,
    },
    userTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20,
    },
    userEmailText: {
        color: colors.GREY_MEDIUM,
        ...fonts.NUNITO_700_12,
    },
    userWalletMoneyText: {
        color: colors.BLACK,
        ...fonts.NUNITO_700_12,
    },
    userAddressText: {
        color: colors.GREY_MEDIUM,
        ...fonts.NUNITO_700_12,
    },
    userImage: {
        ...Styles.margin_05,
    },
    loadingContainer: {
        height: dimensions.fullHeight * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BrowseScreen;
