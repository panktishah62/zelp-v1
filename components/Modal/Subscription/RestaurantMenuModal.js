import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { fonts } from "../../../styles";
import { dynamicSize, normalizeFont } from "../../../utils/responsive";
import MenuModal from "./MenuModal";
import { colors } from "../../../styles/colors";

const RestaurantMenuModal = props => {

    const [active, setActive] = useState(false)



    const toggleModal = async () => {
        setActive(!active)
    }
    


    return (
        <View>
            <TouchableOpacity onPress={toggleModal}>
                <View style={styles.container}>
                    
                    <View style={styles.innerContainer}>
                        <Image style={styles.image} source={require('../../../assets/images/Subscription/menu.png')} />
                        <Text style={styles.text}>Menu</Text>
                    </View>

                </View>
            </TouchableOpacity>
            <MenuModal active={active} toggleModal={toggleModal} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        bottom: dynamicSize(20),
        right: dynamicSize(20),
        width: dynamicSize(69),

        height: 68,
        borderRadius: 64,
        backgroundColor: colors.BLACK,
    },
    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
    },
    image: {
        width: dynamicSize(20),
        height: dynamicSize(20)
    },
    text: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: normalizeFont(11),
        fontStyle: 'normal',
        fontWeight: '500',
        letterSpacing: 0.25,
        textTransform: 'capitalize',
    }
})

export default RestaurantMenuModal