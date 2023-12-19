import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors } from '../../styles/colors';
import { dimensions } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { fonts } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const Winner = ({ username, status, profile }) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity activeOpacity={0.9}>
            <View style={styles.Innercontainer}>
                <Image
                    style={styles.image}
                    source={
                        profile?.profilePic
                            ? { uri: profile?.profilePic }
                            : require('../../assets/Avtar.png')
                    }
                />
                <Text style={styles.usernameStyle}>{username}</Text>
                <Text
                    style={
                        status === 0
                            ? [styles.statusStyle, { color: colors.BLUE_LIGHT }]
                            : [
                                  styles.statusStyle,
                                  { color: colors.GREEN_SHADE },
                              ]
                    }>
                    {status === 0 ? ' is winning!' : ' won!'}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    Innercontainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
        height: dynamicSize(25),
        width: 'fit-content',
        paddingRight: 14,
        paddingLeft: 1,
        alignSelf: 'flex-start',
        borderRadius: dynamicSize(42),
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',        
    },
    usernameStyle: {
        color: colors.WHITE,
        ...fonts.NUNITO_500_10,
    },
    statusStyle: {
        ...fonts.NUNITO_500_10,
    },
    image: {
        height: dynamicSize(20),
        width: dynamicSize(20),
        borderRadius: dynamicSize(10),
        marginRight: 5
    },
});

export default Winner;
