import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { dimensions, fonts } from '../../../styles';
import { colors } from '../../../styles/colors';
import { dynamicSize } from '../../../utils/responsive';

const AddOnMeals = props => {
    const toggleModal = props?.toggleModal;
    const isModalVisible = props?.isModalVisible;
    const onAddOnMeal = () => {
        toggleModal();
    };
    return (
        <TouchableOpacity style={styles.wrapeer} onPress={onAddOnMeal}>
            <View style={styles.container}>
                <View style={styles.textSection}>
                    <Text style={styles.firstText}>ADD ON MEALS</Text>
                    <Text style={styles.secondText}>
                        (Every 1 extra meal - 1 day extra validity)
                    </Text>
                </View>
                <View style={styles.iconSection}>
                    <Image
                        source={require('../../../assets/images/Subscription/rightArrow.png')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapeer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginHorizontal: dynamicSize(10),
        marginVertical: 10,
        backgroundColor: colors.WHITE,
        borderRadius: 14,
        elevation: 5,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: dimensions.fullWidth - 34,
        borderRadius: 14,
        overflow: 'hidden',
    },
    textSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
        padding: 10,
    },
    firstText: {
        color: colors.ORANGE_WHITE,
        fontFamily: fonts.NUNITO_800_12.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '800',
        lineHeight: 18 * 1.408, // Calculated line height for 140.8%
        letterSpacing: 0.54,
    },
    secondText: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.NUNITO_600_12.fontFamily,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: 0.42,
    },
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 3, // This is for Android shadow
    },
    gradient: {
        borderWidth: 2,
        borderColor: colors.WHITE,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10, // This property adds shadow on Android
        borderRadius: 5,
        overflow: 'hidden',
    },
});

export default AddOnMeals;
