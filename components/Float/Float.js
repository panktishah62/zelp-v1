import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Landing from '../../screens/Home/Landing';
import { dimensions } from '../../styles';
import { GRANTED, getRandom } from '../../utils';
import FloatingApples from './FloatingApple';
import FloatingBaggle from './FloatingBaggle';
import FloatingBowls from './FloatingBowl';
import FloatingBurgers from './FloatingBurgers';
import FloatingCupcakes from './FloatingCupcakes';
import FloatingEllipseLarge from './FloatingEllipseLarge';
import FloatingEllipseMini from './FloatingEllipseMini';
import FloatingPinkApple from './FloatingPinkApple';
import FloatingSandwich from './FloatingSandwich';
import { colors } from '../../styles/colors';
import Explore from '../../screens/Home/Explore';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Float({
    navigation,
    locationPermission,
    latitude,
    longitude,
}) {
    const MIN = 0;
    const MAX = 10000;
    const insets = useSafeAreaInsets();
    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={['#FFFFFF', '#FD7A33']}>
            <View style={styles.container}>
                <View style={styles.column}>
                    <FloatingBurgers delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    <FloatingPinkApple delay={getRandom(MIN, MAX)} />
                    <FloatingCupcakes delay={getRandom(MIN, MAX)} />
                    <FloatingBaggle delay={getRandom(MIN, MAX)} />
                    <FloatingBowls delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    <FloatingApples delay={getRandom(MIN, MAX)} />
                </View>
                <View style={styles.column}>
                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
                    <FloatingSandwich delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    <FloatingBurgers delay={getRandom(MIN, MAX)} />
                    <FloatingCupcakes delay={getRandom(MIN, MAX)} />
                    <FloatingApples delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    <FloatingBaggle delay={getRandom(MIN, MAX)} />
                    <FloatingBowls delay={getRandom(MIN, MAX)} />
                </View>
                <View style={styles.column}>
                    <FloatingBowls delay={getRandom(MIN, MAX)} />
                    <FloatingCupcakes delay={getRandom(MIN, MAX)} />
                    <FloatingSandwich delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
                    <FloatingBaggle delay={getRandom(MIN, MAX)} />
                    <FloatingApples delay={getRandom(MIN, MAX)} />
                    <FloatingBurgers delay={getRandom(MIN, MAX)} />
                    <FloatingPinkApple delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                </View>
                <View style={styles.column}>
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    <FloatingApples delay={getRandom(MIN, MAX)} />
                    <FloatingSandwich delay={getRandom()} />
                    <FloatingBurgers delay={getRandom()} />
                    <FloatingEllipseLarge delay={getRandom()} />
                    <FloatingCupcakes delay={getRandom()} />
                    <FloatingPinkApple delay={getRandom()} />
                    <FloatingEllipseMini delay={getRandom()} />
                    <FloatingBaggle delay={getRandom()} />
                    <FloatingBowls delay={getRandom(MIN, MAX)} />
                </View>
                <View style={styles.column}>
                    <FloatingSandwich delay={getRandom(MIN, MAX)} />
                    <FloatingCupcakes delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    <FloatingBaggle delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    <FloatingBowls delay={getRandom(MIN, MAX)} />
                    <FloatingApples delay={getRandom(MIN, MAX)} />
                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
                    <FloatingBurgers delay={getRandom(MIN, MAX)} />
                    <FloatingPinkApple delay={getRandom(MIN, MAX)} />
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: dimensions.fullWidth,
        height: '100%',
        width: '100%',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        // position: 'absolute',
    },
    landingContainer: {
        // backgroundColor: "transparent",
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
});
