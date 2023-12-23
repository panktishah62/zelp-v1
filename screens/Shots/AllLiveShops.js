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
        desc: 'Manage your profile information',
        imageUri: '../../assets/images/zelp/brownDressUrbanic.webp',
        seller: 'allenDorc',
        bidPrice: 250.0,
        bids: 32,
        time: '1 hr : 22 min',
        navigateTo: 'ShotClassScreen',
        isLoggedIn: true,
    },
    {
        name: 'Profile',
        desc: 'Manage your profile information',
        imageUri: '../../assets/images/zelp/brownDressUrbanic.webp',
        seller: 'allenDorc',
        bidPrice: 250.0,
        bids: 32,
        time: '1 hr : 22 min',
        navigateTo: 'ProfileEditing',
        isLoggedIn: true,
    },
    {
        name: 'Profile',
        desc: 'Manage your profile information',
        imageUri: '../../assets/images/zelp/brownDressUrbanic.webp',
        seller: 'allenDorc',
        bidPrice: 250.0,
        bids: 32,
        time: '1h: 22m: 30s',
        navigateTo: 'ProfileEditing',
        isLoggedIn: true,
    },
    // {
    //     name: 'Addresses',
    //     desc: 'Manage your profile addresses',
    //     image: <ADDRESS />,
    //     navigateTo: 'Address',
    //     isLoggedIn: true,
    // },
    // {
    //     name: 'Payments and Refunds',
    //     desc: 'Payment Modes and Refund Status',
    //     image: <RUPEE />,
    //     navigateTo: 'Refunds',
    //     isLoggedIn: true,
    // },
    // {
    //     name: 'My Orders',
    //     desc: 'Track your orders',
    //     image: <CART />,
    //     navigateTo: 'OrdersList',
    //     isLoggedIn: true,
    // },
    // {
    //     name: 'Referrals',
    //     desc: 'Share Your Referral Code To Earn',
    //     imageUri: (
    //         <Image
    //             source={require('../../assets/images/zelp/brownDressUrbanic.webp')}
    //             style={{ height: 50, width: 50 }}
    //         />
    //     ),
    //     navigateTo: 'Referrals',
    //     isLoggedIn: true,
    // },
    // {
    //     name: 'Help and Support',
    //     desc: 'Get your queries resolved',
    //     image: <QUESTIONMARKCIRCLE />,
    //     navigateTo: 'HelpAndSupport',
    //     isLoggedIn: false,
    // },
    // {
    //     name: 'Logout',
    //     desc: 'Hope to see you soon!',
    //     image: <LOGOUT />,
    //     navigateTo: 'LogIn',
    //     isLoggedIn: true,
    // },
    // {
    //     name: 'Delete Account',
    //     desc: 'Hope to see you again!',
    //     image: <DELETEICON />,
    //     navigateTo: 'Profile',
    //     isLoggedIn: true,
    // },
];

const AuctionItems = ({
    name,
    desc,
    seller,
    imageUri,
    bidPrice,
    bids,
    time,
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
                // { marginVertical: 3, marginHorizontal: 8 },
            ]}
            onPress={() => {
                console.log('Live Shop Navigated !');
                navigation.navigate(navigateTo);
            }}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image
                        source={require('../../assets/images/zelp/brownDressUrbanic.webp')}
                        style={styles.imageStyle}
                    />
                    <Text style={styles.timer}>{time}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.auctionName}>{name}</Text>
                    <Text style={styles.desc}>{desc}</Text>
                    <View style={Styles.row_space_between}>
                        <View>
                            <Text
                                style={[
                                    fonts.NUNITO_600_16,
                                    Styles.default_text_color,
                                ]}>
                                {seller}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.bidPrice}>₹ {bidPrice}</Text>
                            <Text style={styles.totalBids}>{bids} bids</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const AllLiveShops = ({ navigation }) => {
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
                {!isLoading &&
                    profileMenuData.map((auctionItem, index) => {
                        return (
                            <AuctionItems
                                key={index}
                                name={auctionItem.name}
                                desc={auctionItem.desc}
                                seller={auctionItem.seller}
                                bidPrice={auctionItem.bidPrice}
                                bids={auctionItem.bids}
                                time={auctionItem.time}
                                imageUri={auctionItem.imageUri}
                                navigateTo={auctionItem.navigateTo}
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
        flexDirection: 'row',
    },
    leftContainer: {
        // width: dimensions.fullWidth * 0.2,
        // backgroundColor: colors.BLUE_DARK,
    },
    rightContainer: {
        width: dimensions.fullWidth * 0.7,
        // backgroundColor: colors.RED,
    },
    auctionName: {
        ...fonts.NUNITO_700_18,
        color: colors.BLACK,
    },
    desc: { ...fonts.NUNITO_500_14, color: colors.GREY_MEDIUM },
    bidPrice: {
        ...fonts.NUNITO_700_18,
        color: colors.BLACK,
        alignSelf: 'flex-end',
        marginTop: 15,
    },
    totalBids: {
        ...fonts.NUNITO_600_16,
        color: colors.BLACK,
        alignSelf: 'flex-end',
    },
    elevation: {
        backgroundColor: colors.WHITE,
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
        // shadowColor: colors.BLACK,
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 5,
        // backgroundColor: colors.WHITE,
        // padding: 25,
        // borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.GREY_LIGHT,
        // marginVertical: 1,
    },
    profileItemContainer: {
        backgroundColor: colors.WHITE,
        paddingHorizontal: 5,
        paddingVertical: dynamicSize(15),
    },
    imageStyle: {
        width: dynamicSize(80),
        height: dynamicSize(80),
        borderRadius: 5,
        marginRight: dynamicSize(15),
        marginLeft: dynamicSize(5),
        marginBottom: 5,
        resizeMode: 'contain',
    },
    timer: {
        ...fonts.NUNITO_600_12,
        marginRight: dynamicSize(15),
        marginLeft: dynamicSize(5),
        color: colors.RED,
    },
    loadingContainer: {
        height: dimensions.fullHeight * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AllLiveShops;
