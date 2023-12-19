import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar,
    View,
    Image,
} from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import { fonts, dimensions } from '../../styles';
import TextInput_ from '../Inputs/TextInput';
import ChatInput from './ChatInput';

const sprofile = {
    name: 'Pankti shah',
    message: 'What is the price and quantity available for this ?',
};

const MsgProfileContainer = props => {
    const { profile, isFollowing = 2, followers = 2, navigation } = props;

    return (
        <View style={stylesMsg.leftContainer}>
            <Image
                style={stylesMsg.image}
                source={
                    profile?.profilePic
                        ? { uri: profile?.profilePic }
                        : require('../../assets/Avtar.png')
                }
            />
            <View style={stylesMsg.textContainer}>
                <Text style={stylesMsg.userName}>{profile.name}</Text>
                <Text style={stylesMsg.message}>{profile.message}</Text>
            </View>
        </View>
    );
};

const ChatContainer = () => {
    const [textMsg, setTextMsg] = useState('');
    const [focus, setFocus] = useState(false);
    const [onSubmitText, setOnSubmitText] = useState('');

    console.log(textMsg);
    console.log(onSubmitText);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
                <MsgProfileContainer profile={sprofile} />
                <MsgProfileContainer profile={sprofile} />
                <MsgProfileContainer profile={sprofile} />
                <MsgProfileContainer profile={sprofile} />
                <MsgProfileContainer profile={sprofile} />
                <MsgProfileContainer profile={sprofile} />
            </ScrollView>
            <ChatInput
                text={textMsg}
                setText={value =>
                    setTextMsg({
                        ...textMsg,
                        value,
                    })
                }
                focused={focus}
                setFocus={() => setFocus(true)}
                // setBlur={() => setBlur()}
                placeholder={'Say something...'}
                onSubmitEditing={onSubmitText}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingTop: StatusBar.currentHeight,
        // paddingLeft: 20,
        height: 200,
        width: '70%',
        // backgroundColor: 'pink',
    },
    scrollView: {
        // backgroundColor: 'pink',
        // marginHorizontal: 10,
    },
});

const stylesMsg = StyleSheet.create({
    leftContainer: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        // padding: 10,
    },

    image: {
        height: dynamicSize(40),
        width: dynamicSize(40),
        borderRadius: dynamicSize(10),
        marginTop: dynamicSize(5),
    },
    textContainer: {
        marginHorizontal: dynamicSize(5),
        marginBottom: dynamicSize(5),
        marginTop: dynamicSize(2),
    },
    userName: {
        color: colors.WHITE,
        ...fonts.NUNITO_600_12,
    },
    message: {
        color: colors.WHITE,
        ...fonts.NUNITO_700_12,
        flexWrap: 'wrap',
        width: '80%',
    },
});

export default ChatContainer;
