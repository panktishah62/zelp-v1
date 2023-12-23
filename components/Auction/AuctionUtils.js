import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';
import { fonts } from '../../styles';
import { Styles } from '../../styles';

export const ReverseTimer = ({
    startTime = 20,
    fontSize = fonts.NUNITO_800_14,
}) => {
    const [seconds, setSeconds] = useState(startTime);
    const [minutes, setMinutes] = useState(0);
    const [timerEnded, setTimerEnded] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                setMinutes(0);
                setSeconds(0);
                setTimerEnded(true);
                clearInterval(interval);
            } else if (seconds === 0 && minutes != 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, minutes]);

    const restartTimer = async () => {
        setSeconds(seconds + 20);
        setMinutes(0);
        setTimerEnded(false);
        console.log('restarted!');
    };

    return (
        <View>
            <Text style={[styles.timer, fontSize]}>
                {/* Resend OTP in{' '} */}
                {`${minutes.toString().padStart(2, '0')}:${seconds
                    .toString()
                    .padStart(2, '0')}`}
            </Text>

            {/* <TouchableOpacity onPress={() => restartTimer()}>
                <Text>Add seconds</Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    timer: {
        // ...fonts.NUNITO_800_14,
        alignItems: 'flex-end',
        color: colors.RED,
    },
});
