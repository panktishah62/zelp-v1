import React,{useRef,useEffect} from "react";
import { StyleSheet, View,Text,Image, ScrollView } from "react-native";
import RestaurantMenuCardDetails from "../../components/Cards/Subscription/RestaurantMenuCardDetails";
import SearchBar from "../../components/Cards/Search/Subscription/SearchBar";
import MultipleButtonFoodType from "../../components/Buttons/Subscription/MultipleButtonFoodType";
import QuickCheckout from "../../components/Cards/Subscription/QuickCheckout";
import HeadingCardComp from "../../components/Cards/Subscription/HeadingCardComp";
import RestaurantMenuModal from "../../components/Modal/Subscription/RestaurantMenuModal";
import LeftSimple from "../../components/Heading/Subscription/LeftSimple";
import OrangeButton from "../../components/Buttons/Subscription/OrangeButton";
import AbsoluteOrangeButton from "../../components/Buttons/Subscription/AbsoluteOrangeButton";
import { useSelector } from "react-redux";

const RestaurantMenuPage = props => {
    const data = ['menuContent']
    const mealCardData= [
        {
            id:'1',
            image:require('../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../assets/images/Subscription/veg.png'),
            vegText:'Veg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },
        {
            id:'2',
            image:require('../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../assets/images/Subscription/veg.png'),
            vegText:'NonVeg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },

         {
            id:'3',
            image:require('../../assets/images/Subscription/golgappa.png'),
            vegImage:require('../../assets/images/Subscription/veg.png'),
            vegText:'NonVeg',
            boldText:'Golgappa 1 plate',
            lastText:'Made with cauliflower',
            starImage:require('../../assets/images/Subscription/golden_star.png'),
            rating:'4.0',
        },
        
    ]

    const {isSelectedAny}=useSelector(state=>state.subscriptionSelectMenu)
    const {itemName,itemId,itemType}=useSelector((state)=>state.subscriptionCart);
    console.log(itemName,itemId,itemType)

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
                <HeadingCardComp  mealCardData={mealCardData}/>
            </View>
        ))}
    </ScrollView>
    <RestaurantMenuModal />
       {isSelectedAny && <AbsoluteOrangeButton text={"Proceed to checkout"}/>}
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