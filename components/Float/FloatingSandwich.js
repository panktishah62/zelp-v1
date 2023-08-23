import React, { Component } from 'react';
import { View, Animated, Easing, Dimensions, AppState } from 'react-native';

const { height } = Dimensions.get('window');

class FloatingSandwich extends Component {
    constructor(props) {
        super(props);

        this.animatedValue = [];
        for (let i = 0; i < 5; i++) {
            this.animatedValue[i] = new Animated.Value(0);
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.animate();
    }

    componentWillUnmount() {
        this.stopAnimation();
    }

    handleAppStateChange = newAppState => {
        if (newAppState === 'inactive' || newAppState === 'background') {
            this.stopAnimation();
        } else {
            this.animate();
        }
    };

    stopAnimation() {
        this.animatedValue.forEach(value => value.stopAnimation());
    }

    animate() {
        const animations = this.animatedValue.map(item =>
            Animated.timing(item, {
                toValue: 2,
                duration: 15000,
                easing: Easing.linear,
                useNativeDriver: true,
                delay: this.props.delay || 0,
            }),
        );

        Animated.stagger(1000, animations).start(() => {
            this.animatedValue.forEach(value => value.setValue(0));
            this.animate();
        });
    }

    render() {
        const sandwich1Y = this.animatedValue[0].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 50, -50],
        });
        const sandwich2Y = this.animatedValue[1].interpolate({
            inputRange: [0, 1],
            outputRange: [-50, height + 50],
        });

        return (
            <View style={styles.container}>
                <Animated.Image
                    source={require('../../assets/icons/sandwich.png')}
                    style={[
                        styles.sandwich,
                        { transform: [{ translateY: sandwich1Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/sandwich.png')}
                    style={[
                        styles.sandwich,
                        { transform: [{ translateY: sandwich1Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/sandwich.png')}
                    style={[
                        styles.sandwich,
                        { transform: [{ translateY: sandwich1Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/sandwich.png')}
                    style={[
                        styles.sandwich,
                        { transform: [{ translateY: sandwich1Y }] },
                    ]}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    sandwich: {
        width: 35,
        borderRadius: 25,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default FloatingSandwich;
