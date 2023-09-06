import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DialogTypes } from '../../utils';
import { follow, unfollowFroker } from '../../redux/services/short';
import { useDispatch, useSelector } from 'react-redux';
import {
    removeFollowedFrokers,
    setFollowedFrokers,
} from '../../redux/actions/froker';
import { dynamicSize } from '../../utils/responsive';
import { hideDialog, showDialog } from '../../redux/actions/dialog';

const FollowUnfollowButton = props => {
    const { profile, currentState, followers, onClick, navigation } = props;
    const [isFollowing, setIsFollowing] = useState(currentState);
    const [token, setToken] = useState(null);
    const [currentFollowers, setCurrentFollowers] = useState(followers);

    const dispatch = useDispatch();
    const followedFrokers = useSelector(state => state.followedFroker);

    useEffect(() => {
        const frokerId = profile?._id;
        if (currentState) {
            dispatch(setFollowedFrokers(frokerId));
        } else {
            dispatch(removeFollowedFrokers(frokerId));
        }
    }, []);

    useEffect(() => {
        const frokerId = profile?._id;
        if (followedFrokers.followedFrokers.has(frokerId)) {
            setIsFollowing(true);
            setStyles(styles.inactive);
        } else {
            setIsFollowing(false);
            setStyles(styles.active);
        }
    }, [followedFrokers]);

    const onPressLogin = () => {
        dispatch(hideDialog());
        navigation.navigate('LogIn');
    };

    const text = {
        0: 'Follow',
        1: 'UnFollow',
    };

    const [variableStyles, setStyles] = useState(
        isFollowing ? styles.inactive : styles.active,
    );
    const onPressFollow = async () => {
        if (token === null) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Please LogIn',
                    subTitleText: 'You are not Logged In!',
                    buttonText1: 'LOGIN',
                    buttonFunction1: () => {
                        onPressLogin();
                        dispatch(hideDialog());
                    },
                    type: DialogTypes.WARNING,
                }),
            );
            return;
        }
        let data = {
            frokerId: profile?._id,
        };
        const frokerId = profile?._id;
        if (isFollowing) {
            if (currentFollowers > 0) {
                setCurrentFollowers(currentFollowers - 1);
            }
            setStyles(styles.active);
            dispatch(removeFollowedFrokers(frokerId));
            await unfollowFroker(data);
        } else {
            setCurrentFollowers(currentFollowers + 1);
            setStyles(styles.inactive);
            dispatch(setFollowedFrokers(frokerId));
            await follow(data);
        }
        setIsFollowing(!isFollowing);
    };

    const isLoggedIn = async () => {
        try {
            const _token = await AsyncStorage.getItem('token');
            if (_token != null) {
                setToken(_token);
            }
        } catch (error) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Something Went Wrong!',
                    subTitleText: error?.message,
                    buttonText1: 'CLOSE',
                    type: DialogTypes.ERROR,
                }),
            );
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <TouchableOpacity
            style={[styles.container, variableStyles]}
            onPress={onPressFollow}>
            <Text style={styles.text}>
                {text[Number(isFollowing)]} ({currentFollowers})
            </Text>
        </TouchableOpacity>
    );
};

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: dynamicSize(30),
        width: dynamicSize(100),
        borderRadius: dynamicSize(10),
        borderWidth: 1,
        borderColor: colors.WHITE,
    },
    active: {
        backgroundColor: colors.RED,
    },
    inactive: {
        backgroundColor: 'transparent',
    },
    text: {
        color: colors.WHITE,
        ...fonts.NUNITO_700_12,
    },
});

export default FollowUnfollowButton;
