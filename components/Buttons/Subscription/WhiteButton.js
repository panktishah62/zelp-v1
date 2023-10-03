import React from "react";
import { StyleSheet, View, Text,  TouchableOpacity } from "react-native";
import { dimensions, fonts } from "../../../styles";

const WhiteButton = props => {
    const {handleNavigation}=props
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Get in</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position:'absolute',
        bottom:53,
        left:dimensions.fullWidth/4
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        width: 200,     // Width in React Native
        height: 37.151, // Height in React Native
        backgroundColor: "#fff",
    },
    text: {
        color: '#E1740F',
        textAlign: 'center',
        fontFamily: fonts.NUNITO_500_16.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 23.84,
        fontFamily: fonts.NUNITO_400_14.fontFamily
    }
});

export default WhiteButton;