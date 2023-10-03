import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealCards from '../../components/Cards/Subscription/MealCards';
import CarouselImageAtTop from '../../components/Cards/Subscription/CarouselImageAtTop';
import AddOnMeals from '../../components/Cards/Subscription/AddOnMeal';
import HowToStart from '../../components/Cards/Subscription/HowToStart';
import BestMealHeadingWithStars from '../../components/Cards/Subscription/BestMealHeadingWithStars';
import BenifitComponent from '../../components/Cards/Subscription/BenifitComponent';
import BenifitHeadingComp from '../../components/Cards/Subscription/BenifitHeadingComp';
import AddOnMealModal from '../../components/Modal/Subscription/AddOnMealModal';
import SubscriptionPlanImage from '../../components/Block/Subscription/SubscriptionPlanImage';
import DetailsHeading from '../../components/Heading/Subscription/DetailsHeading';
import DescriptionOffer from '../../components/Cards/Subscription/DescriptionOffer';
import LineCircleSurroundedHeading from '../../components/Heading/Subscription/LineCircleSurroundedHeading';
import {
    getCombos,
    getOneSubscriptionPlanDetails,
} from '../../redux/services/subscriptionService';
import { useSelector } from 'react-redux';

const PageDetails = props => {
    const { navigation, route } = props;
    const { itemId } = route.params;

    const { mealType } = useSelector(state => state.mealTypeForSubscription);

    const [fetchedData, setFetchedData] = useState(null);
    const [bannerImagesArr, setBannerImagesArr] = useState([]);
    const [combosArray, setCombosArray] = useState([]);
    const [benifitComponentArray, setBenifitComponentArray] = useState([]);

    const fetchPlanDetails = async () => {
        const response = await getOneSubscriptionPlanDetails(itemId);

        setFetchedData(response.data.data);
        setBannerImagesArr(response.data.bannerImage);
        setBenifitComponentArray(response.data.benifitComponent);
    };

    const fetchCombos = async () => {
        const response = await getCombos(itemId, mealType);
        setCombosArray(response?.data?.data);
    };
    useEffect(() => {
        fetchCombos();
    }, [setCombosArray, mealType]);

    useEffect(() => {
        fetchPlanDetails();
    }, [itemId, setBannerImagesArr]);

    const navigationHandler = id => {
        navigation.navigate('SubscriptionPayment', {
            itemId,
            name: fetchedData?.name,
        });
    };

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <SubscriptionPlanImage image={fetchedData?.image} />
                    <DetailsHeading name={fetchedData?.name} />
                    <DescriptionOffer
                        discount={fetchedData?.appliedDiscount}
                        price={fetchedData?.pricePerMeal}
                        itemId={itemId}
                    />
                    <LineCircleSurroundedHeading
                        discount={fetchedData?.appliedDiscount}
                        price={fetchedData?.pricePerMeal}
                        validity={fetchedData?.validityPerMeal}
                    />

                    <CarouselImageAtTop bannerImagesArr={bannerImagesArr} />
                    <BenifitHeadingComp />
                    <BenifitComponent
                        data={benifitComponentArray}
                        isDynamic={true}
                    />
                    <AddOnMeals />

                    <HowToStart />
                    <BestMealHeadingWithStars />

                    <View style={styles.mealCard}>
                        <MealCards
                            isDynamic={true}
                            isRatingTextVisible={true}
                            isHeadingVisible={true}
                            isButtonVisible={true}
                            showRatingNumber={true}
                            data={combosArray}
                            showInfoText={true}
                        />
                    </View>
                </View>
            </ScrollView>
            <AddOnMealModal
                itemId={itemId}
                name={fetchedData?.name}
                navigationHandler={navigationHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F8',
    },
    mealCard: {
        marginBottom: 100,
    },
});

export default PageDetails;
