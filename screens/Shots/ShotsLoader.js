import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { dimensions } from '../../styles';
import { TAB_BAR_HEIGHT } from '../../redux/constants';
import ContentLoader, { Rect, Facebook } from 'react-content-loader/native';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';

const MyFacebookLoader = () => (
    <Facebook
        backgroundColor={colors.GREY_BORDER}
        foregroundColor={colors.WHITE}
        style={styles.facebookContainer}
    />
);

const ActivityIndicator = () => {
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}></View>
            <View style={styles.bottomContainer}>
                {/* <MyFacebookLoader /> */}
                <ContentLoader
                    height={dimensions.fullHeight}
                    width={dimensions.fullWidth}
                    speed={1}
                    backgroundColor={colors.GREY_BORDER}
                    foregroundColor={colors.GREY_LIGHT}
                    style={styles.contentContainer}>
                    <Rect
                        x="25"
                        y="50"
                        rx="25"
                        ry="25"
                        width={dimensions.fullWidth - 50}
                        height={dimensions.fullHeight - 350}
                    />
                    <Rect
                        x="45"
                        y="75"
                        rx="25"
                        ry="25"
                        width="50"
                        height="50"
                    />
                    <Rect
                        x="100"
                        y="90"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth / 2}
                        height="5"
                    />
                    <Rect
                        x="100"
                        y="105"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth / 4}
                        height="5"
                    />
                    <Rect
                        x="45"
                        y="165"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth - 100}
                        height="5"
                    />
                    <Rect
                        x="45"
                        y="180"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth - 100}
                        height="5"
                    />
                    <Rect
                        x="45"
                        y="195"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth - 200}
                        height="5"
                    />
                </ContentLoader>
            </View>
        </View>
    );
};

const ShotsLoader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}></View>
            <View style={styles.bottomContainer}>
                {/* <MyFacebookLoader /> */}
                <ContentLoader
                    height={dimensions.fullHeight}
                    width={dimensions.fullWidth}
                    speed={1}
                    backgroundColor={colors.WHITE}
                    foregroundColor={colors.GREY_LIGHT}
                    style={styles.contentContainer}>
                    <Rect
                        x="0"
                        y="0"
                        rx="25"
                        ry="25"
                        width={dimensions.fullWidth}
                        height={dimensions.fullHeight}
                    />
                </ContentLoader>
                <ContentLoader
                    height={170}
                    width={dimensions.fullWidth}
                    speed={1}
                    backgroundColor={colors.GREY_BORDER}
                    foregroundColor={colors.WHITE}
                    style={styles.buttonContainer}>
                    <Rect x="0" y="0" rx="25" ry="25" width="50" height="50" />
                    <Rect
                        x="60"
                        y="15"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth / 2}
                        height="5"
                    />
                    <Rect
                        x="60"
                        y="30"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth / 4}
                        height="5"
                    />
                    {/* <Rect x="70" y="0" rx="25" ry="25" width="50" height="50" /> */}
                    <Rect
                        x={dimensions.fullWidth - 120}
                        y="0"
                        rx="15"
                        ry="15"
                        width="80"
                        height="30"
                    />
                    <Rect
                        x="0"
                        y="60"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth - 40}
                        height="5"
                    />
                    <Rect
                        x="0"
                        y="75"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth - 40}
                        height="5"
                    />
                    <Rect
                        x="0"
                        y="90"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth - 100}
                        height="5"
                    />
                    <Rect
                        x="0"
                        y="105"
                        rx="4"
                        ry="4"
                        width={dimensions.fullWidth - 150}
                        height="5"
                    />
                    <Rect
                        x="0"
                        y="120"
                        rx="15"
                        ry="15"
                        width="30"
                        height="30"
                    />
                    <Rect
                        x="40"
                        y="120"
                        rx="15"
                        ry="15"
                        width="30"
                        height="30"
                    />
                    <Rect
                        x={dimensions.fullWidth - 70}
                        y="120"
                        rx="15"
                        ry="15"
                        width="30"
                        height="30"
                    />
                </ContentLoader>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        // width: dimensions.fullWidth - 100,
        // alignItems: 'flex-end',
        height: dimensions.fullHeight,
    },
    upperContainer: {},
    bottomContainer: {
        // padding: 20,
    },
    facebookContainer: {
        margin: dynamicSize(20),
    },
    buttonContainer: {
        marginLeft: dynamicSize(20),
        marginRight: dynamicSize(20),
        width: dimensions.fullWidth - 100,
        position: 'absolute',
        bottom: TAB_BAR_HEIGHT,
    },
    contentContainer: {
        // marginLeft: 20,
        // margin: 20,
        // width: dimensions.fullWidth - 100,
    },
});

export { ShotsLoader, ActivityIndicator };
