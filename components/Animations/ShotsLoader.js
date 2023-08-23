import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Lottie from 'lottie-react-native';

export default function ShotsLoader() {
    const animationProgress = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationProgress.current, {
            toValue: 0,
            // duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <Lottie
            source={require('../../assets/animations/loader.json')}
            progress={animationProgress.current}
            autoPlay
            loop
            style={{ height: 100, width: 100 }}
        />
    );

    // const animationRef = useRef < Lottie > null;

    // useEffect(() => {
    //     animationRef.current?.play();

    //     // Or set a specific startFrame and endFrame with:
    //     animationRef.current?.play(30, 120);
    // }, []);

    // return (
    //     <Lottie
    //         ref={animationRef}
    //         source={require('../../assets/animations/laddos.json')}
    //         // autoPlay
    //         // loop
    //         style={{ height: 200, width: 200 }}
    //     />
    // );
}
