import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Easing,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';
import { useSelector } from 'react-redux';

const ShotsCoinAnimation = props => {
    const cart = useSelector(state => state.cartActions);
    const userProfile = useSelector(state => state?.user?.userProfile);
    const [userWalletMoney, setUserWalletMoney] = useState(
        cart?.walletMoney ? cart?.walletMoney : 0,
    );
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(
        userProfile ? true : false,
    );
    const [text, setText] = useState(0);
    const [animation] = useState(new Animated.Value(0));
    const animationRef = useRef(null);
    const shotsView = useSelector(state => state.shotsView);
    const [swiped, setSwiped] = useState(shotsView?.swiped);

    useEffect(() => {
        if (shotsView?.swiped != swiped) {
            animationRef.current?.play();
            startAnimation();
            setSwiped(shotsView?.swiped);
        }
    }, [shotsView]);

    const startAnimation = () => {
        if (
            cart?.walletMoney >= 0 &&
            (cart?.walletMoney - userWalletMoney).toFixed(1) >= 0
        ) {
            setText((cart?.walletMoney - userWalletMoney).toFixed(1));
        }
        Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            if (cart?.walletMoney && cart?.walletMoney >= 0) {
                setUserWalletMoney(cart?.walletMoney);
            } else {
                setUserWalletMoney(0);
            }
            animation.setValue(0);
        });
    };

    useEffect(() => {
        if (userProfile && userProfile?.wallet >= 0) {
            setIsUserLoggedIn(true);
            setUserWalletMoney(userProfile?.wallet);
        } else {
            setIsUserLoggedIn(false);
            setUserWalletMoney(0);
        }
    }, [userProfile]);

    return (
        <View>
            <View style={styles.container}>
                <LottieView
                    ref={animationRef}
                    source={require('../../assets/animations/coinAnimation.json')}
                    style={{
                        height: dynamicSize(38),
                        width: dynamicSize(38),
                        zIndex: 1,
                    }}
                    loop={false}
                    duration={2000}
                />
                {userWalletMoney >= 0 && (
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{userWalletMoney} Furos</Text>
                    </View>
                )}
            </View>
            {isUserLoggedIn ? (
                <Animated.Text
                    style={[
                        {
                            opacity: animation,
                            transform: [{ scale: animation }],
                        },
                        styles.animatedText,
                    ]}>
                    +{text} Furos credited
                </Animated.Text>
            ) : (
                <Animated.Text
                    style={[
                        {
                            opacity: animation,
                            transform: [{ scale: animation }],
                        },
                        styles.animatedText,
                    ]}>
                    Sign In To Earn Furos
                </Animated.Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: dynamicSize(15),
    },
    textContainer: {
        left: dynamicSize(-20),
        backgroundColor: colors.DARKER_GRAY_TRANSPARENT,
        justifyContent: 'center',
        height: dynamicSize(28),
        borderTopRightRadius: dynamicSize(14),
        borderBottomRightRadius: dynamicSize(14),
    },
    text: {
        color: colors.WHITE,
        paddingHorizontal: dynamicSize(12),
        paddingLeft: dynamicSize(20),
        fontFamily: fonts.INTER_500_14.fontFamily,
        fontSize: normalizeFont(14),
    },
    animatedText: {
        color: colors.WHITE,
        fontFamily: fonts.INTER_600_12.fontFamily,
        fontSize: normalizeFont(14),
    },
});

export default ShotsCoinAnimation;
