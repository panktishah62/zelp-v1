import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileCard from '../../components/Cards/ProfileCard';
import ScrollableText from '../../components/Cards/ScrollableText';
import ActionButtons from './ActionButtons';
import { dimensions } from '../../styles';
import { dynamicSize } from '../../utils/responsive';

const ProfileContainer = props => {
    const { item, showItems, setShowItems, navigation } = props;

    return (
        <View style={styles.container}>
            <ProfileCard
                profile={item.shot.frokerProfile}
                isFollowing={item.isFollowing}
                followers={item.followers ? item.followers : 0}
                navigation={navigation}
            />
            <ScrollableText text={item.shot.caption} />
            <ActionButtons
                item={item}
                navigation={navigation}
                showItems={showItems}
                setShowItems={setShowItems}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth,
        padding: dynamicSize(10),
        paddingVertical: dynamicSize(10),
    },
});

export default ProfileContainer;
