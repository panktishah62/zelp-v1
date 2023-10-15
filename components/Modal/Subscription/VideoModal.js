import React, { useEffect, useRef, useState } from 'react';
import app from '../../../package.json';
import {
    ActivityIndicator,
    Image,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { dynamicSize } from '../../../utils/responsive';
import { Text } from 'react-native';
import { colors } from '../../../styles/colors';
import { Modal, Portal } from 'react-native-paper';
import { dimensions } from '../../../styles';
import CrossWhite from '../../../assets/images/Subscription/CrossWhite.svg';
import Video from 'react-native-video';
import { useSelector } from 'react-redux';
import muxReactNativeVideo from '@mux/mux-data-react-native-video';
import remoteConfig from '@react-native-firebase/remote-config';

// wrap the `Video` component with Mux functionality
const MuxVideo = muxReactNativeVideo(Video);

const VideoModal = props => {
    const MUX_ENV_KEY = remoteConfig().getValue('MUX_PROD_ENV_KEY').asString();
    const videoId = remoteConfig()
        .getValue('HowToSubscribeVideoPlaybackId')
        .asString();
    const videoUrl = remoteConfig()
        .getValue('HowToSubscribeVideoUrl')
        .asString();
    const { visible, hideModal } = props;
    const player = useRef(null);
    const [isBuffering, setIsBuffering] = useState(true);
    const [lastProgress, setLastProgress] = useState();
    const [currentTime, setCurrentTime] = useState();
    const userProfile = useSelector(state => state.user.userProfile);
    const posterUrl = `https://image.mux.com/${videoId}/thumbnail.png?width=${Math.round(
        dimensions.fullWidth - dynamicSize(40),
    )}&height=${Math.round(dimensions.fullHeight - dynamicSize(40))}&time=0`;

    const url = `https://stream.mux.com/${videoId}.m3u8`;

    const onBuffer = ({ isBuffering }) => {
        if (Platform.OS === 'android') {
            setIsBuffering(isBuffering);
        }
    };
    const onError = error => {
        return <View />;
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

    return (
        <View style={styles.mainContainer}>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.containerStyle}>
                    <View style={styles.videoContainer}>
                        <MuxVideo
                            source={{
                                uri: url,
                                headers: {
                                    range: 'bytes=0-',
                                },
                            }}
                            controls={true}
                            ref={player}
                            onLoad={() => {
                                player.current.seek(0); // this will set first frame of video as thumbnail
                            }}
                            style={[styles.video]}
                            resizeMode="none"
                            paused={false}
                            muted={false}
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
                                    video_id: 'HowToStartSubscriptionTest', // (required)
                                    video_title: 'HowToStartSubscriptionTest',
                                    viewer_user_id:
                                        userProfile && userProfile._id
                                            ? userProfile._id
                                            : null,
                                },
                            }}
                        />
                        {isBuffering && (
                            <ActivityIndicator
                                size="large"
                                color={colors.ORANGE}
                                style={styles.loaderStyle}
                            />
                        )}
                        <View style={styles.svgContainer}>
                            <View style={styles.innerSvgContainer}>
                                <TouchableOpacity onPress={hideModal}>
                                    <CrossWhite height={40} width={40} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(20),
    },
    containerStyle: {
        flex: 1,
        backgroundColor: colors.WHITE,
        margin: dynamicSize(20),
        borderRadius: dynamicSize(20),
    },
    svgContainer: {
        position: 'absolute',
        top: dynamicSize(10),
        elevation: 12,
        right: dynamicSize(13),
        borderRadius: dynamicSize(20),
        height: dynamicSize(40),
        width: dynamicSize(40),
    },
    innerSvgContainer: {},
    videoContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        borderRadius: dynamicSize(20),
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: dynamicSize(20),
        backgroundColor: colors.WHITE,
    },
    loaderStyle: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
});

export default VideoModal;
