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
    const [userWalletMoney, setUserWalletMoney] = useState(
        cart?.walletMoney ? cart?.walletMoney : 0,
    );
    const [text, setText] = useState(0);
    const [animation] = useState(new Animated.Value(0));
    const animationRef = useRef(null);

    useEffect(() => {
        animationRef.current?.play();
    }, []);

    const startAnimation = () => {
        if (
            cart?.walletMoney > 0 &&
            (cart?.walletMoney - userWalletMoney).toFixed(1) > 0
        ) {
            setText((cart?.walletMoney - userWalletMoney).toFixed(1));
        }
        Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
            setUserWalletMoney(cart?.walletMoney);
            animation.setValue(0);
        });
    };

    useEffect(() => {
        if (
            cart?.walletMoney > 0 &&
            (cart?.walletMoney - userWalletMoney).toFixed(1) > 0
        ) {
            startAnimation();
        }
    }, [cart]);

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
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{userWalletMoney} Furos</Text>
                </View>
            </View>
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
