import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { dimensions } from "../../styles";
import { dynamicSize } from "../../utils/responsive";
import WhiteButton from "../../components/Buttons/Subscription/WhiteButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = props => {
    const {navigation}=props

    const handleNavigation = ()=>{
        navigation.navigate('SubscriptionPage')
    }

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.wrapper}>
                    <View style={styles.homeBanner}>
                        <Image
                            source={require('../../assets/images/Subscription/home.png')}
                        />
                    </View></View>
                <WhiteButton handleNavigation={handleNavigation}/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    homeBanner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        width: dimensions.fullWidth - dynamicSize(40)
    }
})

export default Home