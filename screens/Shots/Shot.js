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
import { useSelector } from 'react-redux';
import remoteConfig from '@react-native-firebase/remote-config';
import axios from 'axios';
import RemoteConfigService from '../../redux/services/remoteConfigService';

// wrap the `Video` component with Mux functionality
const MuxVideo = muxReactNativeVideo(Video);

export default function VideoItem({
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
    const insets = useSafeAreaInsets();
    const screenHeight = windowHeight - insets.bottom;

    const [showIcon, setShowIcon] = useState(false);

    const [isBuffering, setIsBuffering] = useState(true);
    const [lastProgress, setLastProgress] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [videoDuration, setVideoDuration] = useState();

    const player = useRef(null);
    const LoadMuteUnmute = () => {
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

    return (
        <View
            style={[
                styles.container,
                {
                    height: screenHeight,
                    width: Dimensions.get('window').width,
                },
            ]}>
            <TouchableWithoutFeedback
                onPress={() => {
                    setShowIcon(true);
                    setMute(!mute);
                }}>
                <View
                    style={{
                        width: '100%',
                        height: screenHeight,
                        position: 'absolute',
                    }}>
                    {/* <View style={styles.loaderStyle}>
                        {!showIcon && (
                            <ActivityIndicator
                                size="large"
                                color={colors.ORANGE}
                                style={styles.loaderStyle}
                            />
                        )}
                    </View> */}
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
                            style={[styles.video, { height: screenHeight }]}
                            resizeMode="none"
                            paused={!(isActive && isFocused && appStateVisible)}
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
                    {/* {!isActive && (
                        // <Image
                        //     source={{ uri: data.shot.poster }}
                        //     style={[styles.loaderStyle, { zIndex: 10 }]}
                        // />
                        // <ShotsLoader />
                    )} */}
                </View>
            </TouchableWithoutFeedback>
            {showIcon && <LoadMuteUnmute />}
            <View style={styles.bottomSection}>
                <ProfileContainer
                    item={data}
                    navigation={navigation}
                    showItems={showItems}
                    setShowItems={setShowItems}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth,
        // height: screenHeight - TAB_BAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BLACK,
    },
    video: {
        position: 'absolute',
        width: '100%',
        // height: '100%',
        // height: '100%',
        // height: screenHeight - TAB_BAR_HEIGHT,
    },
    bottomSection: {
        position: 'absolute',
        width: dimensions.fullWidth,
        zIndex: 1,
        bottom: 0, //edited
    },
    muteUnmute: {
        justifyContent: 'center',
        alignItems: 'center',
        height: dynamicSize(88),
        width: dynamicSize(88),
        borderRadius: dynamicSize(44),
        backgroundColor: 'rgba(52,52,52,0.6)',
    },
    loaderStyle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: dimensions.fullWidth,
        resizeMode: 'cover',
    },
});
