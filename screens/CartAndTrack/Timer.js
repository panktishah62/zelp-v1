import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { dynamicSize, normalizeFont } from '../../utils/responsive';

const TimerCircle = ({ minutes, initialTimeToDeliver }) => {
    const [initialTime, setInitialTime] = useState(minutes);
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [circleRadius, setCircleRadius] = useState(38);
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [initialCircleLength, setInitialCircleLength] = useState(0);

    useEffect(() => {
        setInitialTime(minutes);
    }, [minutes]);

    useEffect(() => {
        setInitialCircleLength(2 * Math.PI * (circleRadius - strokeWidth));
    }, [circleRadius, strokeWidth]);

    useEffect(() => {
        let interval;
        if (remainingTime > 0) {
            interval = setInterval(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [remainingTime]);

    const calculateCircleLength = () => {
        if (minutes < 0) {
            return 0;
        }
        return (remainingTime / initialTimeToDeliver) * initialCircleLength;
    };

    const minutesDisplay = Math.floor(remainingTime / 60);
    const secondsDisplay = remainingTime % 60;
    const timeDisplay = `${minutesDisplay < 10 ? '0' : ''}${minutesDisplay}:${
        secondsDisplay < 10 ? '0' : ''
    }${secondsDisplay}`;

    return (
        <View style={styles.container}>
            <Svg height={circleRadius * 2} width={circleRadius * 2}>
                <Circle
                    cx={circleRadius}
                    cy={circleRadius}
                    r={circleRadius - strokeWidth}
                    fill="transparent"
                    stroke="lightgrey"
                    strokeWidth={strokeWidth}
                />
                <Circle
                    cx={circleRadius}
                    cy={circleRadius}
                    r={circleRadius - strokeWidth}
                    fill="transparent"
                    stroke="white"
                    strokeWidth={strokeWidth}
                    strokeDasharray={initialCircleLength}
                    strokeDashoffset={
                        initialCircleLength - calculateCircleLength()
                    }
                />
            </Svg>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                    {minutes > 0 ? timeDisplay : '00:00'}
                </Text>
                <Text style={styles.minsText}>Min</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.ORANGE,
        borderRadius: dynamicSize(100),
        width: dynamicSize(90),
        height: dynamicSize(90),
    },
    timeContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    timeText: {
        fontSize: normalizeFont(22),
        color: 'white',
    },
    minsText: {
        fontSize: normalizeFont(14),
        color: 'white',
    },
});

export default TimerCircle;
