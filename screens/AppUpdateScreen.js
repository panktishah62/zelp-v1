import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import { dimensions, fonts } from '../styles';
import { Button_ } from '../components/Buttons/Button';
import { colors } from '../styles/colors';
import { DialogTypes } from '../utils';
import { dynamicSize } from '../utils/responsive';
import remoteConfig from '@react-native-firebase/remote-config';
import { showDialog } from '../redux/actions/dialog';
import { useDispatch } from 'react-redux';
import RemoteConfigService from '../redux/services/remoteConfigService';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AppUpdateScreen = () => {
    const dispatch = useDispatch();
    const animationProgress = useRef(new Animated.Value(0));
    const appLink =
        Platform.OS === 'android'
            ? RemoteConfigService.getRemoteValue('PlayStoreAppLink')?.asString()
            : RemoteConfigService.getRemoteValue('AppStoreAppLink')?.asString();

    useEffect(() => {
        Animated.timing(animationProgress.current, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, []);

    const onUpdate = () => {
        if (appLink) {
            Linking.openURL(appLink)
                .then(data => {})
                .catch(() => {
                    dispatch(
                        showDialog({
                            isVisible: true,
                            titleText: 'Something Went Wrong',
                            subTitleText: 'Please Try Again!',
                            buttonText1: 'CLOSE',
                            type: DialogTypes.ERROR,
                        }),
                    );
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Please Update The App</Text>
                <Text style={styles.text}>
                    We have Some New Features For You
                </Text>
            </View>
            <AnimatedLottieView
                source={require('../assets/animations/appUpdate.json')}
                progress={animationProgress.current}
                autoPlay
                loop
                style={{
                    width: dimensions.fullWidth - 100,
                    height: dimensions.fullHeight / 3,
                }}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onUpdate}>
                    <Text style={styles.buttonText}>Update App</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
    },
    textContainer: {
        marginBottom: dynamicSize(20),
    },
    text: {
        textAlign: 'center',
        ...fonts.NUNITO_600_16,
        color: colors.GREY_MEDIUM,
    },
    buttonContainer: {
        marginVertical: dynamicSize(30),
    },
    button: {
        backgroundColor: colors.ORANGE_GRADIENT_DARK,
        height: dynamicSize(50),
        width: dynamicSize(200),
        borderRadius: dynamicSize(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.WHITE,
        ...fonts.NUNITO_700_16,
    },
});

export default AppUpdateScreen;
