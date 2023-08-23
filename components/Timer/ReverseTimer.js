import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { dimensions, fonts } from '../../styles';
import { colors } from '../../styles/colors';

const ReverseTimer = props => {
    const { date, start, bufferTime, textStyle, textAfterBuffer } = props;
    const [startMinutes, setStartMinutes] = useState(start);
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const diffSeconds = Math.round(
                (new Date() - new Date(date)) / 1000,
            );
            if (bufferTime == 0 && diffSeconds > startMinutes * 60) {
                setSecondsLeft(0);
            } else if (diffSeconds > startMinutes * 60) {
                // setSecondsLeft(0);
                setStartMinutes(startMinutes + bufferTime);
                setSecondsLeft(startMinutes * 60 - diffSeconds);
            } else {
                setSecondsLeft(startMinutes * 60 - diffSeconds);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsLeft]);

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
        // return `${formattedMinutes} mins`;
    };

    return (
        <View>
            {secondsLeft > 0 && (
                <Text style={textStyle}>{formatTime(secondsLeft)}</Text>
            )}
            {secondsLeft <= 0 && (
                <Text style={[textStyle, styles.textStyle]}>
                    {textAfterBuffer}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dimensions.fullWidth,
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        padding: 10,
    },
    innerContainer: {
        width: dimensions.fullWidth * 0.5,
        flexDirection: 'row',
        padding: 5,
    },
    iconContainer: {},
    addressContainer: {},
    name: {
        ...fonts.NUNITO_700_14,
        color: colors.ORANGE,
        marginBottom: 5,
    },
    address: {
        marginBottom: 5,
        ...fonts.NUNITO_500_14,
        color: colors.GREY_MEDIUM,
        width: dimensions.fullWidth / 1.3,
    },
    phone: {
        ...fonts.NUNITO_500_14,
        color: colors.GREY_MEDIUM,
    },
    addressFound: {
        height: 130,
    },
    addressNotFound: {
        height: 60,
    },
    timerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        ...fonts.INTER_700_16,
        color: colors.RED,
    },
    timerText: {
        ...fonts.INTER_400_14,
        color: colors.RED,
    },
    textStyle: {
        width: dimensions.fullWidth * 0.2,
        ...fonts.INTER_600_8,
    },
});

export default ReverseTimer;
