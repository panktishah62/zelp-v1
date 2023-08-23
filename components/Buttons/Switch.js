import React, { useState } from 'react';
import { View, Switch, StyleSheet, Platform } from 'react-native';
import { colors } from '../../styles/colors';

const SwitchBtn = props => {
    const { onColor, offColor, thumbColor, toggleSwitch, value } = props;
    const [isEnabled, setIsEnabled] = useState(isEnabled);

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: offColor, true: onColor }}
                thumbColor={isEnabled ? thumbColor : colors.WHITE}
                onValueChange={toggleSwitch}
                value={value}
                style={styles.toggleSwitch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    toggleSwitch: {
        ...Platform.select({
            ios: {
                transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
            },
        }),
    },
});

export default SwitchBtn;
