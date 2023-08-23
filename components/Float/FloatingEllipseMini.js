import React, { Component } from 'react';
import { View, Animated, Easing, Dimensions, AppState } from 'react-native';

const { height } = Dimensions.get('window');

class FloatingEllipseMini extends Component {
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
                duration: 25000,
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
        const ellipse1Y = this.animatedValue[0].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 50, -50],
        });
        const ellipse2Y = this.animatedValue[1].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 100, -100],
        });
        const ellipse3Y = this.animatedValue[2].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 150, -150],
        });
        const ellipse4Y = this.animatedValue[3].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 200, -200],
        });
        const ellipse5Y = this.animatedValue[4].interpolate({
            inputRange: [0, 1],
            outputRange: [height + 250, -250],
        });

        return (
            <View style={styles.container}>
                <Animated.Image
                    source={require('../../assets/icons/Ellipse4.png')}
                    style={[
                        styles.ellipse,
                        { transform: [{ translateY: ellipse1Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/Ellipse5.png')}
                    style={[
                        styles.ellipse,
                        { transform: [{ translateY: ellipse2Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/Ellipse6.png')}
                    style={[
                        styles.ellipse,
                        { transform: [{ translateY: ellipse3Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/Ellipse8.png')}
                    style={[
                        styles.ellipse,
                        { transform: [{ translateY: ellipse4Y }] },
                    ]}
                />
                <Animated.Image
                    source={require('../../assets/icons/Ellipse9.png')}
                    style={[
                        styles.ellipse,
                        { transform: [{ translateY: ellipse5Y }] },
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
    ellipse: {
        width: 5,
        borderRadius: 25,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default FloatingEllipseMini;
