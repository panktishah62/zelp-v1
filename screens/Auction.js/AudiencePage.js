import React, { Component, useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    findNodeHandle,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

import ZegoExpressEngine, {
    ZegoTextureView,
    ZegoMixerTask,
    ZegoAudioConfig,
    ZegoAudioConfigPreset,
    ZegoMixerInputContentType,
    ZegoScenario,
    ZegoRoomConfig,
} from 'zego-express-engine-reactnative';
import { fonts, dimensions } from '../../styles';
import { colors } from '../../styles/colors';
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';
import { dynamicSize } from '../../utils/responsive';
import LiveCounter from '../../components/Auction/LiveCounter';
import SellerProfile from '../../components/Auction/SellerProfile';
import ActionButtonVerticalBar from '../../components/Auction/ActionButtonVerticalBar';
import ProductItemDetailText from '../../components/Auction/ProductItemDetailText';
import Winner from '../../components/Auction/Winner';
import ChatContainer from '../../components/Auction/ChatContainer';
import CrossIcon from '../../assets/ZelpIcons/CrossIcon.svg';
import { FirstShowGuidelines } from '../../components/Drawer/FirstShowGuidelines';
import { FirstShowDrawer } from '../../components/Drawer/FirstShowDrawer';
import { ProductDetailDrawer } from '../../components/Drawer/ProductDetailDrawer';
import SellerActionSideBar from '../../components/Auction/SellerActionSideBar';
import ProductDetailsSellerAuction from '../../components/Auction/ProductDetailsSellerAuction';
import { ReverseTimer } from '../../components/Auction/AuctionUtils';

export default function AudiencePage(props) {
    // const { route } = props;
    // const { params } = route;
    const { userID, userName } = props;
    const zego_preview_view = useRef(null);
    const [isFrontCam, setIsFrontCam] = useState(true);

    const onChangeCameraView = () => {
        setIsFrontCam(!isFrontCam);
        ZegoExpressEngine.instance().useFrontCamera(isFrontCam, 0);
    };

    const onClickA = () => {
        let roomConfig = new ZegoRoomConfig();
        roomConfig.isUserStatusNotify = true;

        ZegoExpressEngine.instance().loginRoom(
            '9999',
            { userID: userID, userName: 'zego' },
            roomConfig,
        );
        ZegoExpressEngine.instance().startPreview({
            reactTag: findNodeHandle(zego_preview_view?.current),
            viewMode: 1,
            backgroundColor: 0,
        });
        ZegoExpressEngine.instance().startPublishingStream('333');
        // ZegoExpressEngine.instance().useFrontCamera(false, 0);

        ZegoExpressEngine.instance().on(
            'roomStateUpdate',
            (roomID, state, errorCode, extendedData) => {
                console.log(
                    'JS onRoomStateUpdate: ' +
                        state +
                        ' roomID: ' +
                        roomID +
                        ' err: ' +
                        errorCode +
                        ' extendData: ' +
                        extendedData,
                );
            },
        );
        ZegoExpressEngine.instance().on(
            'roomUserUpdate',
            (roomID, updateType, userList) => {
                console.log(
                    'JS onRoomUserUpdate: ' +
                        state +
                        ' roomID: ' +
                        roomID +
                        ' err: ' +
                        errorCode +
                        ' extendData: ' +
                        extendedData,
                );
            },
        );

        ZegoExpressEngine.instance().on(
            'IMRecvBroadcastMessage',
            (roomID, messageList) => {
                console.log(
                    'JS onIMRecvBroadcastMessage: ' +
                        ' roomID: ' +
                        roomID +
                        ' messageList: ' +
                        messageList,
                );
                for (let msg of messageList) {
                    console.log(
                        'current broadcast msg: message: ' +
                            msg.message +
                            ' messageID' +
                            msg.messageID +
                            ' sendTime: ' +
                            msg.sendTime +
                            ' from user :' +
                            msg.fromUser.userID +
                            ' x ' +
                            msg.fromUser.userName,
                    ); // "0", "1", "2",
                }
            },
        );

        ZegoExpressEngine.instance().on(
            'publisherStateUpdate',
            (streamID, state, errorCode, extendedData) => {
                console.log(
                    'JS onPublisherStateUpdate: ' +
                        state +
                        ' streamID: ' +
                        streamID +
                        ' err: ' +
                        errorCode +
                        ' extendData: ' +
                        extendedData,
                );
            },
        );
    };

    const onClickC = () => {
        ZegoExpressEngine.instance().sendBroadcastMessage(
            '9999',
            'test-boardcast-msg!!!!!!',
        );
        ZegoExpressEngine.instance().on(
            'IMRecvBroadcastMessage',
            (roomID, messageList) => {
                console.log(
                    'JS onIMRecvBroadcastMessage: ' +
                        ' roomID: ' +
                        roomID +
                        ' messageList: ' +
                        messageList,
                );
                for (let msg of messageList) {
                    console.log(
                        'current broadcast msg: message: ' +
                            msg.message +
                            ' messageID' +
                            msg.messageID +
                            ' sendTime: ' +
                            msg.sendTime +
                            ' from user :' +
                            msg.fromUser.userID +
                            ' x ' +
                            msg.fromUser.userName,
                    ); // "0", "1", "2",
                }
            },
        );
        // ZegoExpressEngine.instance().sendBarrageMessage("9999", "test-danmaku-msg!!!!!!").then((ret) => {
        //   console.log("sendBarrageMessage: error: " + ret.errorCode + " message str: " + ret.messageID)
        // });
        // ZegoExpressEngine.instance().sendCustomCommand("9999", "testcommand?").then((ret) => {
        //   console.log("sendCustomCommand: error: " + ret.errorCode)
        // });
    };

    //   componentWillUnmount() {
    //     console.log('componentWillUnmount');
    //     //ZegoExpressEngine.instance().off('RoomStateUpdate');
    //     if(ZegoExpressEngine.instance()) {
    //       console.log('[LZP] destroyEngine')
    //       ZegoExpressEngine.destroyEngine();
    //     }
    //   }

    const sprofile = {
        name: 'Pankti shah',
        servingArea: 'Blr',
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView styles={styles.container}>
                <ScrollView>
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
                                    <CrossIcon height={12} width={12} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <FirstShowGuidelines/> */}
                        {/* <FirstShowDrawer/> */}
                        <ProductDetailDrawer />

                        <TouchableOpacity
                            style={styles.trying}
                            onPress={onClickA}>
                            <Text>Start Live</Text>
                        </TouchableOpacity>

                        <ZegoTextureView
                            ref={zego_preview_view}
                            style={{ height: dimensions.fullHeight }}
                        />
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
                            <View style={styles.middleContainer}>
                                <ChatContainer />
                                {/* Positioning of Side Bar mentioned in component */}
                                <SellerActionSideBar onChangeCameraView={onChangeCameraView}/>
                            </View>
                            <View style={styles.winnerContainer}>
                                <Winner username={'PanktiShah'} status={1} />
                            </View>

                            <View style={styles.productDetailsContainer}>
                                <ProductDetailsSellerAuction
                                    ProductName={
                                        'Silver Spoon Set Silver Spoon SetSilver Spoon'
                                    }
                                    shippingStatus={0}
                                    listingPrice={20}
                                    Timer={30}
                                />
                            </View>

                            {/* <View style={styles.stickyContainer}>
                                <StickyBottomButton
                                    title={'Start selling'}
                                    pressHandler={() => console.log('pressed')}
                                    buttonHeight={dynamicSize(40)}
                                    buttonWidth={dimensions.fullWidth * 0.9}
                                    buttonColorEnabled={colors.YELLOW}
                                    titileColor={colors.BLACK}
                                />
                            </View> */}

                            <View style={styles.bidContainer}>
                                <StickyBottomButton
                                    title={'Increase Timer (15 seconds)'}
                                    pressHandler={() => console.log('pressed')}
                                    buttonHeight={dynamicSize(40)}
                                    buttonWidth={dimensions.fullWidth * 0.6}
                                    buttonColorEnabled={colors.RED}
                                    buttonColorDisabled={
                                        colors.GREY_AUCTION_DISABLED
                                    }
                                />
                                <Text style={styles.timer}>
                                    <ReverseTimer
                                        startTime={30}
                                        fontSize={fonts.NUNITO_800_28}
                                    />
                                </Text>
                                {/* <StickyBottomButton
                                    title={'Bid'}
                                    pressHandler={() => console.log('pressed')}
                                    buttonHeight={dynamicSize(40)}
                                    buttonWidth={dimensions.fullWidth * 0.5}
                                    buttonColorEnabled={colors.FAILED_RED}
                                    disabled={true}
                                    buttonColorDisabled={colors.YELLOW}
                                    titileColor={colors.BLACK}
                                /> */}
                            </View>
                            {/* <View style={styles.stickyContainer}>
                                <StickyBottomButton
                                    title={'Sell next Product'}
                                    pressHandler={() => console.log('pressed')}
                                    buttonHeight={dynamicSize(40)}
                                    buttonWidth={dimensions.fullWidth * 0.9}
                                    buttonColorEnabled={colors.YELLOW}
                                    titileColor={colors.BLACK}
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
    middleContainer: {
        zIndex: 20,
        // position: 'absolute',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // padding: dynamicSize(20),
        width: dimensions.fullWidth,
        alignItems: 'flex-end',
        // paddingBottom: dynamicSize(20)
    },
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
        // backgroundColor: colors.ORANGE,
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
    timer: {
        alignItems: 'center',
        justifyContent: 'center',
        // position: 'absolute',
        bottom: dynamicSize(6),
    },
});
