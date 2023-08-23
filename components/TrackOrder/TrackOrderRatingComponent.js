import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';

const TrackOrderRatingComponent = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateText}>Rate Froker</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateText}>Rate Restaurant</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: dimensions.fullWidth,
    },
    rateText: {
        color: colors.ORANGE,
        ...fonts.NUNITO_500_16,
        alignSelf: 'center',
    },
    rateContainer: {
        height: dimensions.fullHeight * 0.07,
        width: dimensions.fullWidth * 0.45,
        borderWidth: 1,
        borderColor: colors.ORANGE,
        borderRadius: 5,
        justifyContent: 'center',
    },
});

export default TrackOrderRatingComponent;
