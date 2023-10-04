import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../../styles/colors";
import { dimensions } from "../../../styles";


const ParagraphComp = props => {
    const minValidity = props.minValidity
    return (
        <View>
            <View style={[styles.firstContainer, { marginTop: 10 }]}>
                <Text style={styles.firstText} >
                    (Minimun <Text style={styles.changeColor}>{minValidity?.meal} Meals</Text> with <Text style={styles.changeColor}>{minValidity?.validity} days </Text>Validity)
                </Text>
            </View>
            <View style={styles.imageContainer} >
                <Image style={styles.imageStyle} source={require('../../../assets/images/Subscription/offer.png')} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    firstContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imageContainer: {

        width: dimensions.fullWidth,
        backgroundColor: colors.WHITE,
        marginTop: 8,

    },
    imageStyle: {
        width: dimensions.fullWidth,
    },
    thirdContainer: {

        height: 40,
        padding: 10,
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        backgroundColor: colors.ORANGE
    },
    secondContainer: {

        width: 396,
        height: 30,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        backgroundColor: colors.ORANGE
    },

    firstText: {
        color: colors.BLACK,
        fontFamily: 'Nunito',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.6

    },
    secondText: {
        color: colors.WHITE,
        fontFamily: 'Nunito',
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: '900',
        letterSpacing: 0.7
    },
    changeColor: {
        color: colors.ORANGE
    }

})

export default ParagraphComp;