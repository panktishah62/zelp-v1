import React, { useCallback, useEffect, useRef, useState } from 'react';
import app from '../../package.json';
import {
    Animated,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Easing,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Platform,
    Dimensions,
    ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import muxReactNativeVideo from '@mux/mux-data-react-native-video';
import { memoize } from '../../utils/VideoCacheUtil';
import { dimensions } from '../../styles';
import ProfileContainer from './profileContainer';
import MuteIcon from '../../assets/icons/mute.svg';
import UnmuteIcon from '../../assets/icons/unmute.svg';
// import ShotsLoader from '../../components/Animations/ShotsLoader';
import { dynamicSize } from '../../utils/responsive';
import { height } from '../../utils/responsive';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import {
    initialWindowMetrics,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { debounce } from 'lodash'; // Using lodash for debouncing
import { updateShotsView } from '../../redux/services/short';
import { useDispatch, useSelector } from 'react-redux';
import remoteConfig from '@react-native-firebase/remote-config';
import axios from 'axios';
import RemoteConfigService from '../../redux/services/remoteConfigService';
import { getUserWallet } from '../../redux/actions/cartActions';
import SellerProfile from '../../components/Auction/SellerProfile';
import LiveCounter from '../../components/Auction/LiveCounter';
import { TouchableOpacity } from 'react-native';
import ChatContainer from '../../components/Auction/ChatContainer';
import MinimizeIcon from '../../assets/ZelpIcons/MinimizeIcon.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';
import ActionButtonVerticalBar from '../../components/Auction/ActionButtonVerticalBar';
import Winner from '../../components/Auction/Winner';
import ProductItemDetailText from '../../components/Auction/ProductItemDetailText';
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';
import SwitchBtn from '../../components/Buttons/Switch';
import FeaturedItem from '../../components/FeaturedItems/FeaturedItem';

// wrap the `Video` component with Mux functionality
const MuxVideo = muxReactNativeVideo(Video);

export default function VideoItem2({
    data,
    isActive,
    navigation,
    isFocused,
    appStateVisible,
    showItems,
    setShowItems,
    mute,
    setMute,
}) {
    const MUX_ENV_KEY =
        RemoteConfigService.getRemoteValue('MUX_PROD_ENV_KEY').asString();
    const windowDimensions = Dimensions.get('window');
    const windowHeight = windowDimensions.height;
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const screenHeight = windowHeight - insets.bottom;

    const [showIcon, setShowIcon] = useState(false);

    const [isBuffering, setIsBuffering] = useState(true);
    const [lastProgress, setLastProgress] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [videoDuration, setVideoDuration] = useState();

    const player = useRef(null);
    const LoadMuteUnmute = () => {
        console.log(showIcon);
        return showIcon ? (
            mute ? (
                <View style={styles.muteUnmute}>
                    <MuteIcon />
                </View>
            ) : (
                <View style={styles.muteUnmute}>
                    <UnmuteIcon />
                </View>
            )
        ) : (
            <View />
        );
    };

    const onBuffer = ({ isBuffering }) => {
        // console.log('buffering');
        if (Platform.OS === 'android') {
            setIsBuffering(isBuffering);
        }
    };
    const onError = error => {
        // console.log('error', error);
        return <View />;
        // throw new Error(error);
    };

    const onProgress = event => {
        if (Platform.OS === 'ios') {
            setLastProgress(currentTime);
            setCurrentTime(event.currentTime);
            if (lastProgress === currentTime) {
                setIsBuffering(true);
            } else {
                setIsBuffering(false);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setShowIcon(false);
        }, 200);
        return () => {
            clearInterval(interval);
        };
    }, [mute]);

    const sprofile = {
        name: 'Pankti shah',
        servingArea: 'Blr',
    };

    // useEffect(() => {
    //     getSource(data.shot.video);
    //     setVideoUrl(data.shot.video); // Set the videoUrl state
    // }, [data]);
    // useEffect(() => {
    //     if (!source && videoUrl) {
    //         getSource(videoUrl);
    //     }
    // }, [source, videoUrl]);

    // const getSource = useCallback(async url => {
    //     try {
    //         const path = await memoize(url);
    //         setSource({ uri: path });
    //         setIsSource(true);
    //     } catch (error) {
    //         console.error(error);
    //         setSource(null);
    //         setIsSource(false);
    //     }
    // }, []);
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('blur', () => {
                // Pause the video playback here
                // ...
                // Unmount the video component if needed
                // ...
                // Cleanup any other resources if necessary
                // ...
            });

            // Mute/unmute logic
            setMute(false);

            return () => {
                unsubscribe();
                // Pause or stop the video playback here
                setMute(true);
            };
        }, [navigation]),
    );

    const url = `https://stream.mux.com/${data.shot.fileLocation}.m3u8`;
    // console.log(url);
    const posterUrl = `https://image.mux.com/${
        data.shot.fileLocation
    }/thumbnail.png?width=${Math.round(
        dimensions.fullWidth,
    )}&height=${Math.round(dimensions.fullHeight)}&time=0`;

    const userProfile = useSelector(state => state.user.userProfile);
    const onUpdateShotsView = async data => {
        if (data && userProfile && isActive) {
            await updateShotsView({
                shotsId: data,
            })
                .then(response => response.data)
                .then(data => {
                    if (data?.userWallet) {
                        dispatch(getUserWallet(data?.userWallet));
                    }
                });
        }
    };

    // Debounced function to update wallet balance
    const debouncedUpdateWallet = debounce(onUpdateShotsView, 100);

    const getVideoLength = async () => {
        const MUX_TOKEN_ID =
            RemoteConfigService.getRemoteValue('MUX_TOKEN_ID').asString();
        const MUX_TOKEN_SECRET =
            RemoteConfigService.getRemoteValue('MUX_TOKEN_SECRET').asString();
        // Replace with the playback ID of your video asset
        const playbackId = data.shot.fileLocation;

        // Set up the authentication headers
        const authHeader = {
            Authorization: `Basic ${Buffer.from(
                `${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`,
            ).toString('base64')}`,
        };
        // Step 1: Get the asset ID associated with the playback ID
        await axios
            .get(
                // `https://api.mux.com/video/v1/assets?playback_ids=${playbackId}`,
                `https://api.mux.com/video/v1/playback-ids/${playbackId}`,
                { headers: authHeader },
            )
            .then(async response => {
                const assetId = response.data.data.object.id; // Assuming there is only one asset per playback ID
                // Step 2: Use the asset ID to fetch video information
                await axios
                    .get(`https://api.mux.com/video/v1/assets/${assetId}`, {
                        headers: authHeader,
                    })
                    .then(assetResponse => {
                        // Extract the video duration from the asset API response
                        const durationInSeconds =
                            assetResponse.data.data.duration;
                        const watchFullLengthToGetMoney =
                            RemoteConfigService.getRemoteValue(
                                'watchFullLengthToGetMoney',
                            ).asBoolean();
                        if (watchFullLengthToGetMoney) {
                            const marginToWatchShotsAndGetMoney =
                                RemoteConfigService.getRemoteValue(
                                    'marginToWatchShotsAndGetMoney',
                                ).asNumber();
                            const duration =
                                durationInSeconds -
                                (durationInSeconds *
                                    marginToWatchShotsAndGetMoney) /
                                    100;
                            // console.log('duration', duration, data?.shot?._id);
                            setVideoDuration(Math.round(duration * 1000));
                        } else {
                            const minTimeToAddToWallet =
                                RemoteConfigService.getRemoteValue(
                                    'minTimeToAddToWallet',
                                ).asNumber();
                            setVideoDuration(minTimeToAddToWallet);
                        }
                    })
                    .catch(error => {});
            })
            .catch(error => {});
    };

    useEffect(() => {
        if (isActive) {
            getVideoLength();
        }
        if (!isActive && Platform.OS === 'ios') {
            setIsBuffering(true);
        }
    }, [isActive]);

    let timeoutId;
    useEffect(() => {
        if (isActive && videoDuration && videoDuration > 0) {
            // console.log('in if', data?.shot?._id);
            // This code will run after 5 seconds
            const timeoutId = setTimeout(() => {
                // Your action here
                debouncedUpdateWallet(data?.shot?._id);
            }, videoDuration);

            // Clear the timeout if the component unmounts before the 5 seconds
            return () => clearTimeout(timeoutId);
        } else {
            // console.log('in else', data?.shot?._id);
            clearTimeout(timeoutId);
        }
    }, [isActive, videoDuration]);

    const onToggle = () => {
        setShowItems(!showItems);
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView styles={styles.container}>
                <ScrollView>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            console.log('pressed mute');
                            setShowIcon(true);
                            setMute(!mute);
                        }}>
                        <View style={styles.body}>
                            <View style={styles.topContainer}>
                                <SellerProfile profile={sprofile} />
                                <View style={styles.liveCounter}>
                                    <LiveCounter liveUsers={100} />
                                </View>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => {
                                            onPressReport();
                                        }}
                                        style={styles.iconButton}>
                                        <MinimizeIcon height={15} width={15} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.bottomSection}>
                                    <ProfileContainer
                                        item={data}
                                        navigation={navigation}
                                        showItems={showItems}
                                        setShowItems={setShowItems}
                                    />
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
                                {showItems && (
                                    <ScrollView horizontal={true}>
                                        {data?.shot?.foodReferences?.length >
                                            0 &&
                                            data?.shot?.foodReferences.map(
                                                (dataItem, key) => {
                                                    return (
                                                        <FeaturedItem
                                                            key={key}
                                                            item={dataItem}
                                                            navigation={
                                                                navigation
                                                            }
                                                            shotId={
                                                                data?.shot?._id
                                                            }
                                                        />
                                                    );
                                                },
                                            )}
                                    </ScrollView>
                                )}
                            </View>

                            {/* <TouchableOpacity
                            style={styles.trying}
                            onPress={onClickA}
                        >
                            <Text>Start Live</Text>
                        </TouchableOpacity> */}

                            {/* <ZegoTextureView
                            ref={zego_preview_view}
                            style={{ height: dimensions.fullHeight }}
                        /> */}

                            {isActive && (
                                <MuxVideo
                                    source={{
                                        uri: url,
                                        headers: {
                                            range: 'bytes=0-',
                                        },
                                    }}
                                    ref={player}
                                    onLoad={() => {
                                        player.current.seek(0); // this will set first frame of video as thumbnail
                                    }}
                                    // source={{
                                    //     uri: data.shot.video,
                                    // }}
                                    style={[
                                        styles.video,
                                        { height: screenHeight },
                                    ]}
                                    resizeMode="none"
                                    paused={
                                        !(
                                            isActive &&
                                            isFocused &&
                                            appStateVisible
                                        )
                                    }
                                    muted={mute}
                                    repeat
                                    onBuffer={onBuffer}
                                    onError={onError}
                                    minLoadRetryCount={3}
                                    playInBackground={false}
                                    playWhenInactive={false}
                                    poster={posterUrl}
                                    posterResizeMode="contain"
                                    onProgress={onProgress}
                                    muxOptions={{
                                        application_name: app.name, // (required) the name of your application
                                        application_version: app.version, // the version of your application (optional, but encouraged)
                                        data: {
                                            env_key: MUX_ENV_KEY, // (required)
                                            video_id: data?.shot?._id, // (required)
                                            video_title: data?.shot?._id,
                                            viewer_user_id:
                                                userProfile && userProfile._id
                                                    ? userProfile._id
                                                    : null,
                                        },
                                    }}
                                />
                            )}
                            {isBuffering && (
                                <ActivityIndicator
                                    size="large"
                                    color={colors.ORANGE}
                                    style={styles.loaderStyle}
                                />
                            )}

                            {/* <TouchableOpacity
                            style={styles.trying2}
                            onPress={() => {
                                console.log('clicked !');
                            }}>
                            <Text>Start Live</Text>
                        </TouchableOpacity> */}
                            {/* <TouchableOpacity
                            style={styles.trying3}
                            onPress={onClickC}>
                            <Text>IM</Text>
                        </TouchableOpacity> */}
                            <View style={styles.bottomContainer}>
                                {/* Positioning of Side Bar mentioned in component */}
                                <ActionButtonVerticalBar />
                                <View style={styles.winnerContainer}>
                                    <Winner
                                        username={'PanktiShah'}
                                        status={1}
                                    />
                                </View>

                                <View style={styles.productDetailsContainer}>
                                    <ProductItemDetailText
                                        ProductName={
                                            'Silver Spoon Set Silver Spoon SetSilver Spoon'
                                        }
                                        shippingStatus={0}
                                        listingPrice={20}
                                        Timer={30}
                                    />
                                </View>
                                <View style={styles.bidContainer}>
                                    <StickyBottomButton
                                        title={'Custom'}
                                        pressHandler={() =>
                                            console.log('pressed')
                                        }
                                        buttonHeight={dynamicSize(40)}
                                        buttonWidth={
                                            dimensions.fullWidth * 0.35
                                        }
                                        buttonColorEnabled={colors.FAILED_RED}
                                        disabled={true}
                                        buttonColorDisabled={
                                            colors.GREY_AUCTION_DISABLED
                                        }
                                    />
                                    <StickyBottomButton
                                        title={'Bid'}
                                        pressHandler={() =>
                                            console.log('pressed')
                                        }
                                        buttonHeight={dynamicSize(40)}
                                        buttonWidth={dimensions.fullWidth * 0.5}
                                        buttonColorEnabled={colors.FAILED_RED}
                                        disabled={true}
                                        buttonColorDisabled={colors.YELLOW}
                                        titileColor={colors.BLACK}
                                    />
                                </View>
                                {/* <View style={styles.stickyContainer}>
                                <StickyBottomButton
                                    title={'Awaiting next item'}
                                    pressHandler={() => console.log('pressed')}
                                    buttonHeight={dynamicSize(40)}
                                    buttonWidth={dimensions.fullWidth * 0.9}
                                    buttonColorEnabled={colors.FAILED_RED}
                                    disabled={true}
                                    buttonColorDisabled={
                                        colors.GREY_AUCTION_DISABLED
                                    }
                                />
                            </View> */}
                                {/* <View style={styles.stickyContainer}>
                                <StickyBottomButton
                                    title={'Auction ended'}
                                    pressHandler={() => console.log('pressed')}
                                    buttonHeight={dynamicSize(40)}
                                    buttonWidth={dimensions.fullWidth * 0.9}
                                    buttonColorEnabled={colors.FAILED_RED}
                                    disabled={true}
                                    buttonColorDisabled={
                                        colors.GREY_AUCTION_DISABLED
                                    }
                                />
                            </View> */}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {showIcon && <LoadMuteUnmute />}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        // flexDirection: 'column',
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
    },
    container: {
        flex: 1,
        // backgroundColor: colors.ORANGE,
        // flexDirection: 'column',
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
    },
    topContainer: {
        zIndex: 20,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: dynamicSize(10),
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        width: dimensions.fullWidth,
    },
    // middleContainer: {
    //     zIndex: 20,
    //     // position: 'absolute',
    //     flexDirection: 'row',
    //     // justifyContent: 'space-between',
    //     // padding: dynamicSize(20),
    //     width: dimensions.fullWidth,
    //     alignItems: 'flex-end',
    //     // paddingBottom: dynamicSize(20)
    // },
    bottomContainer: {
        // padding: 20,
        flex: 1,
        flexDirection: 'column',
        // height: dynamicSize(480),
        // backgroundColor: colors.GREEN,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        // justifyContent: 'flex-end',
        // alignContent: 'center',
        // alignItems: 'center',
    },
    liveCounter: {
        paddingTop: dynamicSize(10),
        paddingLeft: dynamicSize(40),
    },
    iconContainer: {
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: dynamicSize(30),
        width: dynamicSize(30),
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
    },
    body: {
        flex: 1,
        backgroundColor: colors.ORANGE,
        height: dimensions.fullHeight,
        width: dimensions.fullWidth,
        // padding: dynamicSize(20),
    },

    window: {
        // flex: 1,
        height: dimensions.fullHeight,
        // backgroundColor: colors.SUCCESS_GREEN
        // width: dimensions.fullWidth,
    },
    stickyContainer: {
        paddingTop: 10,
        flex: 1,
        height: dynamicSize(40),
        // backgroundColor: colors.YELLOW,
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        // justifyContent: 'center',
        // alignContent: 'center',
        alignItems: 'center',
    },
    bidContainer: {
        paddingTop: 10,
        flex: 1,
        height: dynamicSize(40),
        flexDirection: 'row',
        // backgroundColor: colors.YELLOW,
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        justifyContent: 'space-between',
        // justifyContent: 'center',
        // alignContent: 'center',
        alignItems: 'center',
    },
    winnerContainer: {
        paddingTop: dynamicSize(4),
        paddingBottom: dynamicSize(5),
    },
    productDetailsContainer: {
        // paddingTop: ,
        // flex: 1,
        // height: dynamicSize(100),
        // backgroundColor: colors.FAILED_RED,
        // position: 'absolute',
        // // bottom: 0,
        // width: '100%',
        // // justifyContent: 'center',
        // // alignContent: 'center',
        // alignItems: 'center',
    },

    trying: {
        position: 'absolute',
        height: 300,
        width: dimensions.fullWidth,
        // alignItems: 'center',
        // justifyContent: 'center',
        top: 140,
        bottom: -50,
        zIndex: 10,
    },
    trying2: {
        position: 'absolute',
        height: 300,
        width: dimensions.fullWidth,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // top: 100,
        color: colors.ORANGE,
        bottom: 40,
        zIndex: 10,
    },
    trying3: {
        position: 'absolute',
        height: 300,
        width: dimensions.fullWidth,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // top: 100,
        bottom: 100,
        zIndex: 10,
    },
    muteUnmute: {
        position: 'absolute',
        bottom: 500,
        justifyContent: 'center',
        alignItems: 'center',
        height: dynamicSize(88),
        width: dynamicSize(88),
        borderRadius: dynamicSize(44),
        backgroundColor: 'rgba(52,52,52,0.6)',
    },
    bottomSection: {
        position: 'absolute',
        width: dimensions.fullWidth,
        zIndex: 1,
        top: 100, //edited
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
