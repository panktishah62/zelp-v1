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

const profileMenuData = [
    {
        name: 'Profile',
        desc: 'Manage your profile information',
        image: <PROFILE_EDIT />,
        navigateTo: 'ProfileEditing',
        isLoggedIn: true,
    },
    {
        name: 'Addresses',
        desc: 'Manage your profile addresses',
        image: <ADDRESS />,
        navigateTo: 'Address',
        isLoggedIn: true,
    },
    {
        name: 'Payments and Refunds',
        desc: 'Payment Modes and Refund Status',
        image: <RUPEE />,
        navigateTo: 'Refunds',
        isLoggedIn: true,
    },
    {
        name: 'My Orders',
        desc: 'Track your orders',
        image: <CART />,
        navigateTo: 'OrdersList',
        isLoggedIn: true,
    },
    {
        name: 'Referrals',
        desc: 'Share Your Referral Code To Earn',
        image: (
            <Image
                source={require('../../assets/icons/referral.png')}
                style={{ height: 25, width: 25 }}
            />
        ),
        navigateTo: 'Referrals',
        isLoggedIn: true,
    },
    {
        name: 'Help and Support',
        desc: 'Get your queries resolved',
        image: <QUESTIONMARKCIRCLE />,
        navigateTo: 'HelpAndSupport',
        isLoggedIn: false,
    },
    {
        name: 'Logout',
        desc: 'Hope to see you soon!',
        image: <LOGOUT />,
        navigateTo: 'LogIn',
        isLoggedIn: true,
    },
    {
        name: 'Delete Account',
        desc: 'Hope to see you again!',
        image: <DELETEICON />,
        navigateTo: 'Profile',
        isLoggedIn: true,
    },
];

const ProfileMenuItem = ({
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
                { marginVertical: 3, marginHorizontal: 8 },
            ]}
            onPress={() => {
                if (name === 'Logout') {
                    handleLogout();
                    dispatch(getDefaultAddress());
                    navigation.popToTop();
                    return;
                }
                if (name === 'Profile') {
                    navigation.navigate(navigateTo, {
                        id: userData._id,
                        fullName: userData.name,
                        email: userData.email,
                        dob: userData.dateOfBirth
                            ? userData.dateOfBirth
                            : Date.now(),
                        gender: userData.gender ? userData.gender : '',
                        phoneNo: userData.mobNo,
                    });
                    return;
                }
                if (name === 'Addresses') {
                    navigation.navigate(navigateTo);
                    return;
                }
                if (name === 'Delete Account') {
                    Popup.show({
                        type: 'confirm',
                        title: 'Delete Account?',
                        textBody:
                            'Are you sure you want to delete your account?',
                        buttonText: 'No',
                        confirmText: 'Yes',
                        confirmButtonTextStyle: { color: '#FD7A33' },
                        timing: 10000,
                        callback: () => {
                            Popup.hide();
                        },
                        cancelCallback: () => {
                            dispatch(deleteAccount());
                            navigation.popToTop();
                            Popup.hide();
                        },
                    });
                    return;
                }
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
                    <Text
                        style={[fonts.INTER_400_12, Styles.default_text_color]}>
                        {desc}
                    </Text>
                </View>
            </View>
            <BackRightIcon />
        </TouchableOpacity>
    );
};

const ProfileScreen = ({ navigation }) => {
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
        navigation.setOptions({
            header: () => (
                <HeaderWithTitle navigation={navigation} title="Profile" />
            ),
        });
        if (userProfile) {
            setUser(userProfile);
        }
    }, [navigation, userProfile, _defaultAddress]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View
                    style={[
                        styles.elevation,
                        { marginVertical: 10, marginHorizontal: 8 },
                    ]}>
                    {user && !isLoading && (
                        <View>
                            <View style={styles.userCardContainer}>
                                <View style={styles.userCard}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {user && user.image && (
                                            <Image
                                                style={styles.userImage}
                                                source={{ uri: user.image }}
                                            />
                                        )}
                                        {(!user || !user.image) && (
                                            <EmptyProfileIcon />
                                        )}
                                    </View>
                                    <View style={styles.userTextContainer}>
                                        {user && (
                                            <Text style={styles.userNameText}>
                                                {user.name}
                                            </Text>
                                        )}
                                        {user && (
                                            <Text style={styles.userNumberText}>
                                                +91 {user.mobNo}
                                            </Text>
                                        )}
                                        {user && user?.email && (
                                            <Text style={styles.userEmailText}>
                                                {user?.email}
                                            </Text>
                                        )}
                                        {_defaultAddress &&
                                            _defaultAddress.address && (
                                                <Text
                                                    style={
                                                        styles.userAddressText
                                                    }>
                                                    {sliceText(
                                                        _defaultAddress.address,
                                                        50,
                                                    )}
                                                </Text>
                                            )}
                                        {user && user?.wallet >= 0 && (
                                            <Text
                                                style={
                                                    styles.userWalletMoneyText
                                                }>
                                                Current Wallet Money:{' '}
                                                {user.wallet} ₹
                                            </Text>
                                        )}
                                        {user && user?.referral?.name && (
                                            <Text
                                                style={
                                                    styles.userWalletMoneyText
                                                }>
                                                Referral Code:{' '}
                                                {user?.referral?.name}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                    {!user && !isLoading && (
                        <View>
                            <View style={Styles.center}>
                                <EmptyProfileIcon />
                                <YellowButton
                                    text="Sign Up To Order"
                                    onClick={() => {
                                        navigation.navigate('SignUp');
                                    }}
                                />
                            </View>
                        </View>
                    )}
                </View>
                {!isLoading &&
                    profileMenuData.map((profileItem, index) => {
                        if (user) {
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
                        } else {
                            return (
                                !profileItem.isLoggedIn && (
                                    <ProfileMenuItem
                                        key={index}
                                        name={profileItem.name}
                                        desc={profileItem.desc}
                                        image_prop={profileItem.image}
                                        navigateTo={profileItem.navigateTo}
                                        navigation={navigation}
                                    />
                                )
                            );
                        }
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
        width: 25,
        height: 25,
        marginRight: 10,
        marginLeft: 5,
        resizeMode: 'contain',
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

export default ProfileScreen;
