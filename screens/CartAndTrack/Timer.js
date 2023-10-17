import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../styles/colors';

const TimerCircle = ({ minutes }) => {
    const initialTime = minutes * 60;
    const [remainingTime, setRemainingTime] = useState(initialTime);
    const [circleRadius, setCircleRadius] = useState(40);
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
        return (remainingTime / initialTime) * initialCircleLength;
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
                <Text style={styles.timeText}>{timeDisplay}</Text>
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
        borderRadius: 100,
        width: 90,
        height: 90,
    },
    timeContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 18,
        color: 'white',
    },
    minsText: {
        fontSize: 14,
        color: 'white',
    },
});

export default TimerCircle;
