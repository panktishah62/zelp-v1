import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { dynamicSize, normalizeFont } from '../../utils/responsive';

const TimerCircle = ({ minutes, initialTimeToDeliver }) => {
    const [remainingTime, setRemainingTime] = useState(minutes);
    const [circleRadius, setCircleRadius] = useState(dynamicSize(38));
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [initialCircleLength, setInitialCircleLength] = useState(0);

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
                    stroke="rgba(255, 255, 255, 0.455) 0%"
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
    },
    timeContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    timeText: {
        ...Platform.select({
            android: {
                fontSize: normalizeFont(22),
            },
            ios: {
                fontSize: normalizeFont(18),
            },
        }),
        color: 'white',
    },
    minsText: {
        fontSize: normalizeFont(14),
        color: 'white',
    },
});

export default TimerCircle;
