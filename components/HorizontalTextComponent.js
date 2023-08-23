import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Styles } from '../styles';

const HorizontalTextComponent = ({
    pt,
    pb,
    pl,
    pr,
    paddingX,
    paddingY,
    leftText,
    leftTextStyle,
    rightText,
    rightTextStyle,
}) => {
    return (
        <View
            style={[
                Styles.row_space_between,
                {
                    paddingHorizontal: paddingX || 0,
                    paddingVertical: paddingY || 0,
                    paddingTop: pt,
                    paddingBottom: pb,
                    paddingLeft: pl,
                    paddingRight: pr,
                },
            ]}>
            <Text style={leftTextStyle}>{leftText}</Text>
            <Text style={rightTextStyle}>{rightText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default HorizontalTextComponent;
