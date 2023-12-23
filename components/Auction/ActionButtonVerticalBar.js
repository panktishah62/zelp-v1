import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';
import { likeShorts, unlikeShots } from '../../redux/services/short';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DialogTypes, getRandomInt } from '../../utils';
import { buildLinkForShots } from '../../redux/linking/CreateLinks';
import Share from 'react-native-share';
import { hideDialog, showDialog } from '../../redux/actions/dialog';
import { useDispatch } from 'react-redux';
import RemoteConfigService from '../../redux/services/remoteConfigService';
import ReportIcon from '../../assets/ZelpIcons/ReportIcon.svg';
import VolumeMuteIcon from '../../assets/ZelpIcons/VolumeMuteIcon.svg';
import VolumeUnmuteIcon from '../../assets/ZelpIcons/VolumeUnmuteIcon.svg';
import WalletIcon from '../../assets/ZelpIcons/WalletIcon.svg';
import ShareIcon from '../../assets/ZelpIcons/ShareIcon.svg';

const ActionButtonVerticalBar = props => {
    const { item, navigation } = props;
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(item?.isLiked);
    const [token, setToken] = useState(null);
    const minShotsLike =
        RemoteConfigService.getRemoteValue('minShotsLike')?.asNumber();
    const randomLikes =
        minShotsLike > 200 ? getRandomInt(minShotsLike - 200, minShotsLike) : 0;
    // console.log('randomLikes', randomLikes);
    const [likes, setLikes] = useState(
        item?.likes ? randomLikes + item?.likes : randomLikes,
    );

    const [isMute, setIsMute] = useState(false);

    const onPressLogin = () => {
        navigation.navigate('LogIn');
    };

    const onPressReport = () => {
        console.log('Report pressed.');
    };

    const onPressMute = () => {
        setIsMute(!isMute);
        console.log('Mute button pressed.');
    };

    const onPressHeart = async () => {
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
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
        let data = {
            shotsId: item?.shot?._id,
        };
        if (item?.isLiked !== true) {
            await likeShorts(data);
        } else {
            await unlikeShots(data);
        }
    };

    const onPressShare = async () => {
        const link = await buildLinkForShots(item?.shot?._id);
        const shareMessage =
            RemoteConfigService.getRemoteValue('ShotShareMessage')?.asString();
        const shareOptions = {
            message: `${shareMessage} ${link}`,
        };
        Share.open(shareOptions).catch(err => {
            // throw new Error(err);
        });
    };

    // const onToggle = () => {
    //     setShowItems(!showItems);
    // };

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
        <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        onPressReport();
                    }}
                    style={styles.iconButton}>
                    <ReportIcon height={35} />
                </TouchableOpacity>
                <Text style={styles.subTitleText}>Report</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        onPressMute();
                    }}
                    style={styles.iconButton}>
                    {isMute ? (
                        <VolumeMuteIcon height={24} />
                    ) : (
                        <VolumeUnmuteIcon height={20} />
                    )}
                </TouchableOpacity>
                <Text style={styles.subTitleText}>
                    {isMute ? 'Unmute' : 'Mute'}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        onPressShare();
                    }}
                    style={styles.iconButton}>
                    <ShareIcon height={25} />
                </TouchableOpacity>
                <Text style={styles.subTitleText}>Share</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        onPressWallet();
                    }}
                    style={styles.iconButton}>
                    <WalletIcon height={22} />
                </TouchableOpacity>
                <Text style={styles.subTitleText}>Wallet</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: dynamicSize(290),
        position: 'relative',
        bottom: dynamicSize(-40),
        alignItems: 'flex-end'
        // backgroundColor: colors.ORANGE
    },
    iconContainer: {
        margin: 5,
        alignContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: dynamicSize(45),
        width: dynamicSize(45),
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
        paddingBottom: 2,
    },
    subTitleText: {
        ...fonts.NUNITO_700_10,
        color: colors.WHITE,
        // marginTop: 2,
    },
});

export default ActionButtonVerticalBar;
