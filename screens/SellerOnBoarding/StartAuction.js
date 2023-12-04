import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';
import { useDispatch } from 'react-redux';
import { showDialog, hideDialog } from '../../redux/actions/dialog';
import { AuctionStatus, DialogTypes } from '../../utils';
import {
    addLiveStreamDetailsPreStream,
    resetAuction,
} from '../../redux/actions/auction';
import moment from 'moment';

const StartAuctionScreen = props => {
    const { navigation, route } = props;
    const dispatch = useDispatch();
    const [userID, setUserID] = useState('');
    const [liveID, setLiveID] = useState('');
    useEffect(() => {
        setUserID(String(Math.floor(Math.random() * 100000)));
        setLiveID(String(Math.floor(Math.random() * 10000)));
    }, []);

    const deleteAuctionHandle = () => {
        dispatch(
            showDialog({
                isVisible: true,
                titleText: 'Are you sure you want to delete the auction ?',
                buttonText1: 'YES',
                buttonFunction1: () => {
                    dispatch(resetAuction());
                    dispatch(hideDialog());
                    navigation.navigate('Home');
                },
                buttonText2: 'NO',
                buttonFunction2: () => {
                    dispatch(hideDialog());
                },
                type: DialogTypes.WARNING,
            }),
        );
    };

    const onJoinPress = isHost => {
        var startTime = moment()
            .utcOffset('+05:30')
            .format('YYYY-MM-DD hh:mm:ss a');
        console.log(startTime);
        const dataToPost = {
            userID: userID,
            liveID: liveID,
            startTime: startTime,
            status: AuctionStatus.STARTED,
        };
        if (isHost) {
            dispatch(addLiveStreamDetailsPreStream(dataToPost));
        }
        navigation.navigate(isHost ? 'HostPage' : 'AudiencePage', {
            userID: userID,
            userName: userID,
            liveID: liveID,
        });
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView styles={styles.container}>
                <ScrollView stickyHeaderIndices={[2]}>
                    <View styles={styles.mainCon}>
                        <Text style={styles.heading}>
                            You're all set to start the Auction !
                        </Text>

                        <View style={styles.imageUploadContainer}>
                            <Text style={styles.userID}>
                                Your User ID: {userID}
                            </Text>
                            <Text style={[styles.liveID, styles.leftPadding]}>
                                Live ID:
                            </Text>
                            <TextInput
                                placeholder="Enter the Live ID. e.g. 6666"
                                style={[styles.input]}
                                onChangeText={text =>
                                    setLiveID(
                                        text.replace(/[^0-9A-Za-z_]/g, ''),
                                    )
                                }
                                maxLength={4}
                                value={liveID}></TextInput>
                            <View
                                style={[styles.buttonLine, styles.leftPadding]}>
                                <Button
                                    disabled={liveID.length == 0}
                                    style={styles.button}
                                    title="Start a live"
                                    onPress={() => {
                                        onJoinPress(true);
                                    }}
                                />
                                <View style={styles.buttonSpacing} />
                                <Button
                                    disabled={liveID.length == 0}
                                    style={styles.button}
                                    title="Watch a live"
                                    onPress={() => {
                                        onJoinPress(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.stickyContainer}>
                    <StickyBottomButton
                        title={'Start Auction'}
                        pressHandler={() => {
                            onJoinPress(true);
                        }}
                    />
                    <TouchableOpacity
                        style={styles.secondaryButtonContainer}
                        onPress={deleteAuctionHandle}>
                        <Text style={styles.secondaryButtonText}>
                            delete Auction
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    mainCon: {
        marginLeft: 30,
    },
    safeAreaContainer: {
        flex: 1,
        // backgroundColor: colors.BLACK,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },

    heading: {
        ...fonts.NUNITO_800_28,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        paddingTop: dynamicSize(20),
        marginBottom: dynamicSize(30),
    },
    heading2: {
        ...fonts.NUNITO_500_16,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        // paddingTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
    },
    imageUploadContainer: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingLeft: dynamicSize(10),
        paddingRight: dynamicSize(10),
    },
    buttonLine: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 42,
    },
    buttonSpacing: {
        width: 13,
    },
    input: {
        height: 42,
        width: 305,
        borderWidth: 1,
        borderRadius: 9,
        borderColor: '#333333',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 35,
        marginBottom: 20,
    },
    userID: {
        fontSize: 14,
        color: '#2A2A2A',
        marginBottom: 27,
        paddingBottom: 12,
        paddingTop: 12,
        paddingLeft: 20,
    },
    liveID: {
        fontSize: 14,
        color: '#2A2A2A',
        marginBottom: 5,
    },
    simpleCallTitle: {
        color: '#2A2A2A',
        fontSize: 21,
        width: 330,
        fontWeight: 'bold',
        marginBottom: 27,
    },
    button: {
        height: 42,
        borderRadius: 9,
        backgroundColor: '#F4F7FB',
    },
    leftPadding: {
        paddingLeft: 35,
    },
    stickyContainer: {
        paddingTop: 20,
        flex: 1,
        height: dynamicSize(120),
        backgroundColor: colors.WHITE,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonContainer: {
        alignItems: 'center',
        alignContent: 'center',
    },
    secondaryButtonText: {
        ...fonts.NUNITO_700_16,
        padding: 15,
        alignItems: 'center',
        color: colors.ORANGE_GRADIENT_DARK,
    },
});

export default StartAuctionScreen;
