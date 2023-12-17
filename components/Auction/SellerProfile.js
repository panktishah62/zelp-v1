import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import FollowUnfollowButton from '../Buttons/FollowUnfollow';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { sliceText } from '../../utils';
import { dynamicSize } from '../../utils/responsive';

const SellerProfile = props => {
    const { profile, isFollowing=2, followers=2, navigation } = props;
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image
                    style={styles.image}
                    source={
                        profile?.profilePic
                            ? { uri: profile?.profilePic }
                            : require('../../assets/Avtar.png')
                    }
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        {sliceText(profile.name, 25)}
                    </Text>
                    <Text style={styles.subtitle}>
                        {sliceText(profile.servingArea, 25)}
                    </Text>
                </View>
            </View>
            {/* <View style={styles.rightContainer}>
                <FollowUnfollowButton
                    profile={profile}
                    currentState={isFollowing}
                    followers={followers}
                    navigation={navigation}
                />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',        
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // width: '70%',
    },
    rightContainer: {
        paddingTop: dynamicSize(20)
        // width: '30%',
    },
    image: {
        height: dynamicSize(60),
        width: dynamicSize(60),
        borderRadius: dynamicSize(10),
    },
    textContainer: {
        marginHorizontal: dynamicSize(10),
    },
    title: {
        color: colors.WHITE,
        ...fonts.NUNITO_800_14,
    },
    subtitle: {
        color: colors.WHITE,
        ...fonts.NUNITO_600_12,
    },
});

export default SellerProfile;
