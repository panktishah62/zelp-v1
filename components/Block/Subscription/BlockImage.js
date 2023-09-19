import React from "react";

import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { dimensions } from "../../../styles";

const BlockImage = props => {
    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <Image  source={require('../../../assets/images/Subscription/block.png')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image:{
        width:350,
        height:75.524

    },
    innerContainer:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width:dimensions.fullWidth-60,
    }
});

export default BlockImage;
