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
import { hideDialogBox, showDialogBox } from '../../utils';
import { buildLinkForShots } from '../../redux/linking/CreateLinks';
import Share from 'react-native-share';

const ActionButtons = props => {
    const { item, navigation } = props;
    const [showItems, setShowItems] = useState(false);
    const [isLiked, setIsLiked] = useState(item.isLiked);
    const [token, setToken] = useState(null);

    const onPressLogin = () => {
        hideDialogBox();
        navigation.navigate('LogIn');
    };

    const onPressHeart = async () => {
        if (token === null) {
            showDialogBox(
                'Please LogIn',
                'You are not Logged In!',
                'warning',
                'Login',
                true,
                onPressLogin,
            );
            return;
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
        const shareOptions = {
            message: link,
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
            showDialogBox('', error.message, 'warning', 'OK', true);
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
                        }}>
                        <Image
                            source={
                                isLiked === true
                                    ? require('../../assets/heartRed.png')
                                    : require('../../assets/Heart.png')
                            }
                            style={styles.likeButton}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            onPressShare();
                        }}>
                        <Image
                            source={require('../../assets/send.png')}
                            style={styles.shareButton}
                        />
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
                            return <FeaturedItem key={key} item={data} />;
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
});

export default ActionButtons;
