import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Landing from '../../screens/Home/Landing';
import { dimensions } from '../../styles';
import { getRandom, getRandomInt } from '../../utils';
import FloatingEllipseLarge from './FloatingEllipseLarge';
import FloatingEllipseMini from './FloatingEllipseMini';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';
import FloatingItems from './FloatingItems';

export default function Float({}) {
    const MIN = 0;
    const MAX = 10000;
    const insets = useSafeAreaInsets();
    const [floatingIcons, setFloatingIcons] = useState({});

    useEffect(() => {
        const icons = remoteConfig()?.getValue('FloatingIcons')
            ? JSON.parse(remoteConfig().getValue('FloatingIcons').asString())
            : {};
        setFloatingIcons(icons);
    }, []);

    return (
        <LinearGradient
            style={styles.mainContainer}
            colors={['#FFFFFF', '#FD7A33']}>
            <View style={styles.container}>
                <View style={styles.column}>
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    {floatingIcons?.floatingIcons?.length > 0 &&
                        floatingIcons.floatingIcons.map((item, index) => {
                            return (
                                <FloatingItems
                                    key={index}
                                    delay={getRandom(MIN, MAX)}
                                    icon={
                                        floatingIcons?.floatingIcons[
                                            getRandomInt(
                                                MIN,
                                                floatingIcons.floatingIcons
                                                    .length,
                                            )
                                        ]
                                    }
                                />
                            );
                        })}
                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
                </View>
                <View style={styles.column}>
                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
                    {floatingIcons?.floatingIcons?.length > 0 &&
                        floatingIcons.floatingIcons.map((item, index) => {
                            return (
                                <FloatingItems
                                    key={index}
                                    delay={getRandom(MIN, MAX)}
                                    icon={
                                        floatingIcons?.floatingIcons[
                                            getRandomInt(
                                                MIN,
                                                floatingIcons.floatingIcons
                                                    .length,
                                            )
                                        ]
                                    }
                                />
                            );
                        })}

                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                </View>
                <View style={styles.column}>
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    {floatingIcons?.floatingIcons?.length > 0 &&
                        floatingIcons.floatingIcons.map((item, index) => {
                            return (
                                <FloatingItems
                                    key={index}
                                    delay={getRandom(MIN, MAX)}
                                    icon={
                                        floatingIcons?.floatingIcons[
                                            getRandomInt(
                                                MIN,
                                                floatingIcons.floatingIcons
                                                    .length,
                                            )
                                        ]
                                    }
                                />
                            );
                        })}

                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
                </View>
                <View style={styles.column}>
                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
                    {floatingIcons?.floatingIcons?.length > 0 &&
                        floatingIcons.floatingIcons.map((item, index) => {
                            return (
                                <FloatingItems
                                    key={index}
                                    delay={getRandom(MIN, MAX)}
                                    icon={
                                        floatingIcons?.floatingIcons[
                                            getRandomInt(
                                                MIN,
                                                floatingIcons.floatingIcons
                                                    .length,
                                            )
                                        ]
                                    }
                                />
                            );
                        })}

                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                </View>
                <View style={styles.column}>
                    <FloatingEllipseMini delay={getRandom(MIN, MAX)} />
                    {floatingIcons?.floatingIcons?.length > 0 &&
                        floatingIcons.floatingIcons.map((item, index) => {
                            return (
                                <FloatingItems
                                    key={index}
                                    delay={getRandom(MIN, MAX)}
                                    icon={
                                        floatingIcons?.floatingIcons[
                                            getRandomInt(
                                                MIN,
                                                floatingIcons.floatingIcons
                                                    .length,
                                            )
                                        ]
                                    }
                                />
                            );
                        })}

                    <FloatingEllipseLarge delay={getRandom(MIN, MAX)} />
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
