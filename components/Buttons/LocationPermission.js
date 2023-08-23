import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { DENIED, NEVER_ASK_AGAIN } from '../../utils';

const LocationPermission = props => {
    const { locationPermission, _style } = props;

    return (
        <View>
            {(locationPermission === DENIED ||
                locationPermission === NEVER_ASK_AGAIN) && (
                <View style={[_style ? _style : styles.container]}>
                    <Text
                        style={[
                            fonts.NUNITO_700_12,
                            Styles.default_text_color,
                        ]}>
                        Cannot Access Your Location
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: dimensions.fullWidth,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: dimensions.fullHeight * 0.3,
    },
});

export default LocationPermission;
