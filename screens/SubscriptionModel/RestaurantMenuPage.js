import React, { useRef } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import RestaurantMenuCardDetails from "../../components/Cards/Subscription/RestaurantMenuCardDetails";
import SearchBar from "../../components/Cards/Search/Subscription/SearchBar";
import MultipleButtonFoodType from "../../components/Buttons/Subscription/MultipleButtonFoodType";
import QuickCheckout from "../../components/Cards/Subscription/QuickCheckout";
import HeadingCardComp from "../../components/Cards/Subscription/HeadingCardComp";
import RestaurantMenuModal from "../../components/Modal/Subscription/RestaurantMenuModal";
import LeftSimple from "../../components/Heading/Subscription/LeftSimple";

const RestaurantMenuPage = props => {

    const data = ['menuContent']
    

    return (
        <View>
    <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, index) => (
            <View style={styles.container} key={index}>
                <RestaurantMenuCardDetails />
                <SearchBar />
                <MultipleButtonFoodType />
                <LeftSimple text={"Best Sellers"} />
                <QuickCheckout firstActive={true} secondActive={false} />
                <HeadingCardComp />
            </View>
        ))}
    </ScrollView>
    <RestaurantMenuModal />
</View>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    }
})


export default RestaurantMenuPage;