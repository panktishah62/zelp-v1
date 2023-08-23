import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';

const TimerButton = props => {
    const { text, Icon, isIcon } = props;
    return (
        <View style={styles.container}>
            {isIcon && <Icon />}
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 5,
    },
    text: {
        ...fonts.NUNITO_700_12,
        color: colors.WHITE,
    },
});

export default TimerButton;
