import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';
import { fonts } from '../../styles';
import PollIcon from '../../assets/ZelpIcons/PollIcon.svg';

const LiveCounter = ({ liveUsers }) => {
    return (
        <View style={styles.LiveCounter}>
            <PollIcon />
            <Text style={styles.LiveCountUsers}>{liveUsers}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    LiveCounter: {
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
        height: dynamicSize(29),
        width: dynamicSize(80),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    LiveCountUsers: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
        paddingLeft: 5,
    },
});

export default LiveCounter;
