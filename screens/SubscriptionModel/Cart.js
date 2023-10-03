import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import CartDetails from '../../components/Cards/Subscription/CartDetails';
import DeliveryInstruction from '../../components/Cards/Subscription/DeliveryInstruction';
import OrangeButton from '../../components/Buttons/Subscription/OrangeButton';
import SimpleHeading from '../../components/Heading/Subscription/SimpleHeading';
import MealCards from '../../components/Cards/Subscription/MealCards';
import { useSelector } from 'react-redux';
import { orderUsingSubscription } from '../../redux/services/subscriptionService';

const Cart = props => {
    const { navigation } = props;
    const { itemName, itemId, itemImage, itemType, foodItemId } = useSelector(
        state => state.subscriptionCart,
    );
    const { mealPlanId: mealPlansId } = useSelector(
        state => state.mealTypeForSubscription,
    );
    const { id: subscriptionId } = useSelector(
        state => state.subscriptionDetails,
    );

    const mealCardData = [
        {
            id: itemId,
            image: itemImage,
            vegImage: require('../../assets/images/Subscription/veg.png'),
            vegText: itemType,
            boldText: itemName,
            lastText: 'Made with cauliflower',
            starImage: require('../../assets/images/Subscription/golden_star.png'),
            rating: '4.0',
        },
    ];
    const [isReorder, setIsReorder] = useState(false);
    const [orderData, setOrderData] = useState([]);
    //     let subscriptionId;
    //     if(route.params.subscriptionId){
    //      subscriptionId=route.params.subscriptionId
    // }

    // console.log(subscriptionId,"subscriptionId")

    //     const fetchOneOrder=async()=>{
    //         if(subscriptionId!==''){
    //         const response =await getOneSubscriptionOrder(subscriptionId)
    //         console.log(response.data,"response.data")
    //         setIsReorder(true)
    //       const data=
    //         {
    //             id:response.data.data.foodItem._id,
    //             image:response.data.data.foodItem.image,
    //             vegImage:require('../../assets/images/Subscription/veg.png'),
    //             vegText:response.data.data.foodItem.isVeg?'Veg':'NonVeg',
    //             boldText:response.data.data.foodItem.name,
    //             lastText:'Made with cauliflower',
    //             starImage:require('../../assets/images/Subscription/golden_star.png'),
    //             rating:'4.0',
    //         }
    //       orderData.push(data)
    //       setOrderData(orderData)
    //     }
    // }
    //     console.log(orderData,"orderData")
    //     if(route){
    //     useEffect(()=>{
    //         fetchOneOrder()
    //     },[subscriptionId])
    // }
    const { area, defaultAddress } = useSelector(state => state.address);
    const orderHandler = async () => {
        const response = await orderUsingSubscription(subscriptionId, {
            foodItemId,
            mealPlansId,
            addressId: defaultAddress._id,
            orderStatus: 'pending',
        });
        navigation.navigate('SubscribedUserHome');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <CartDetails address={area} />
                <DeliveryInstruction />
                <SimpleHeading text={'Food in your cart'} />
                {isReorder && (
                    <MealCards
                        navigation={navigation}
                        isCart={true}
                        isDynamic={true}
                        data={orderData}
                        orangeButtonText={'Change'}
                        showCrossButton={true}
                    />
                )}
                {!isReorder && (
                    <MealCards
                        navigation={navigation}
                        isCart={true}
                        isDynamic={true}
                        data={mealCardData}
                        orangeButtonText={'Change'}
                        showCrossButton={true}
                    />
                )}
                <OrangeButton
                    orderHandler={orderHandler}
                    text="Place Your Order"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
});

export default Cart;
