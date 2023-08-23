import React, { Component } from 'react';
import { View, Animated, Easing, Dimensions, AppState } from 'react-native';

const { height } = Dimensions.get('window');

class FloatingBurgers extends Component {
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
                duration: 16000,
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
        const burger1Y = this.animatedValue[0].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 50, -50],
        });
        const burger2Y = this.animatedValue[1].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 50, -50],
        });
        const burger3Y = this.animatedValue[2].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 50, -50],
        });
        const burger4Y = this.animatedValue[3].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 50, -50],
        });
        const burger5Y = this.animatedValue[4].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 50, -50],
        });

        return (
            <View style={styles.container}>
                <Animated.Image
                    source={require('../../assets/icons/Frame.png')}
                    style={[
                        styles.burger,
                        { transform: [{ translateY: burger1Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/Frame.png')}
                    style={[
                        styles.burger,
                        { transform: [{ translateY: burger1Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/Frame.png')}
                    style={[
                        styles.burger,
                        { transform: [{ translateY: burger1Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/Frame.png')}
                    style={[
                        styles.burger,
                        { transform: [{ translateY: burger1Y }] },
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
    burger: {
        width: 50,
        borderRadius: 25,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default FloatingBurgers;
