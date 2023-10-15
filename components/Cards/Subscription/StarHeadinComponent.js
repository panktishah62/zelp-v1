import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { colors } from '../../../styles/colors';
import { fonts } from '../../../styles';
import CaroselComponent from './CaroselComponent';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
const StarHeadingComponent = props => {
    const navigation = props.navigation;
    return (
        <View style={styles.wrapperMealText}>
            <View style={styles.bestMealContainer}>
                <Image
                    source={require('../../../assets/images/Subscription/star.png')}
                />

                <Text style={[styles.text]}>
                    <Text style={[styles.changeColor, styles.changeFont]}>
                        Froker
                    </Text>{' '}
                    Subscription
                </Text>
                <View style={styles.horizontalLine} />
            </View>
            <View style={styles.bestMealContainer}>
                <View style={[styles.horizontalLine, styles.changeLineColor]} />
                <Text style={styles.text}>
                    Our{' '}
                    <Text style={[styles.changeColor, styles.changeFont]}>
                        Offerings
                    </Text>{' '}
                    for <Text style={styles.changeColor}>you</Text>
                </Text>

                <Image
                    source={require('../../../assets/images/Subscription/star.png')}
                />
            </View>
            <CaroselComponent navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
    },
    text: {
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        paddingHorizontal: dynamicSize(14),
        fontSize: fonts.NUNITO_500_16.fontSize,
        fontWeight: fonts.NUNITO_600_16.fontWeight,
        color: 'black',
    },
    bestMealContainer: {
        display: 'flex',
        gap: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: dynamicSize(260),
    },
    wrapperMealText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: dynamicSize(15),
    },
    horizontalLine: {
        flex: 1,
        height: 1,

        backgroundColor: 'black',
    },
    changeColor: {
        color: colors.ORANGE_WHITE,
    },
    changeFont: {
        fontSize: normalizeFont(18),
        fontWeight: 'bold',
    },
    changeLineColor: {
        backgroundColor: colors.ORANGE,
    },
});

export default StarHeadingComponent;
