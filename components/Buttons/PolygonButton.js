import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import Polygon from '../../assets/icons/Polygon1.svg';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default PolygonButton = ({ Icon, title, onClick }) => {
    const insets = useSafeAreaInsets();
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                onClick();
            }}>
            <View style={styles.container}>
                <Polygon height={dimensions.fullWidth * 0.55} />
                <View style={styles.imageContainer}>
                    <Icon />
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        width: dimensions.fullWidth * 0.45,
    },
    content: {},
    imageContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    title: {
        ...fonts.NUNITO_700_16,
        color: colors.ORANGE,
    },
});
