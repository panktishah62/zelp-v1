import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import SwitchBtn from '../../components/Buttons/Switch';
import { colors } from '../../styles/colors';
import FeaturedItem from '../../components/FeaturedItems/FeaturedItem';
import { likeShorts, unlikeShots } from '../../redux/services/short';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DialogTypes } from '../../utils';
import { buildLinkForShots } from '../../redux/linking/CreateLinks';
import Share from 'react-native-share';
import { hideDialog, showDialog } from '../../redux/actions/dialog';
import { useDispatch } from 'react-redux';
import remoteConfig from '@react-native-firebase/remote-config';

const ActionButtons = props => {
    const { item, navigation } = props;
    const dispatch = useDispatch();
    const [showItems, setShowItems] = useState(false);
    const [isLiked, setIsLiked] = useState(item.isLiked);
    const [token, setToken] = useState(null);
    const [likes, setLikes] = useState(item?.likes ? item?.likes : 0);

    const onPressLogin = () => {
        navigation.navigate('LogIn');
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
        const shareMessage = remoteConfig()
            .getValue('ShotShareMessage')
            ?.asString();
        const shareOptions = {
            message: `${shareMessage} ${link}`,
        };
        Share.open(shareOptions).catch(err => {
            // throw new Error(err);
        });
    };

    const onToggle = () => {
        setShowItems(!showItems);
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
        <View>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            onPressHeart();
                        }}
                        style={styles.iconButton}>
                        <Image
                            source={
                                isLiked === true
                                    ? require('../../assets/heartRed.png')
                                    : require('../../assets/Heart.png')
                            }
                            style={styles.likeButton}
                        />
                        <Text style={styles.subTitleText}>{likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            onPressShare();
                        }}
                        style={styles.iconButton}>
                        <Image
                            source={require('../../assets/send.png')}
                            style={styles.shareButton}
                        />
                        <Text style={styles.subTitleText}></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.featuredItemsText}>
                        Show Featured Items
                    </Text>
                    <SwitchBtn
                        onColor={colors.ORANGE}
                        offColor={colors.WHITE}
                        thumbColor={'rgba(208, 207, 206, 0.4)'}
                        toggleSwitch={onToggle}
                        value={showItems}
                    />
                </View>
            </View>
            {showItems && (
                <ScrollView horizontal={true}>
                    {item?.shot?.foodReferences?.length > 0 &&
                        item?.shot?.foodReferences.map((data, key) => {
                            return (
                                <FeaturedItem
                                    key={key}
                                    item={data}
                                    navigation={navigation}
                                />
                            );
                        })}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    likeButton: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        // borderRadius: dynamicSize(8),
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    shareButton: {
        width: dynamicSize(20),
        height: dynamicSize(20),
        // borderRadius: dynamicSize(8),
        // marginLeft: dynamicSize(12),
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    switch: {
        width: dynamicSize(39),
        height: dynamicSize(20),
        marginHorizontal: 5,
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    featuredItemsText: {
        color: colors.WHITE,
    },
    iconButton: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    subTitleText: {
        color: colors.WHITE,
        marginTop: 2,
    },
});

export default ActionButtons;
