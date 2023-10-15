import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { Touchable } from 'react-native';
import { colors } from '../../../styles/colors';

const TextLogo = props => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        Froker Subscription Active
                    </Text>
                    <Image
                        style={styles.imageStyle}
                        source={require('../../../assets/images/Subscription/check.png')}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth - 7,
        marginTop: 10,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: 312,
        height: 40,
        padding: 10.094,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        backgroundColor: colors.ORANGE_WHITE,
        borderRadius: 20.189,
    },
    imageStyle: {
        width: 16,
        height: 16,
    },
    buttonText: {
        color: colors.WHITE,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 22.208,
        letterSpacing: 0.59,
    },
});

export default TextLogo;
