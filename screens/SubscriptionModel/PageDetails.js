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
import KnowMoreModal from '../../components/Modal/Subscription/KnowMoreModal';
import { colors } from '../../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubscriptionPlan } from '../../redux/actions/subscriptionActions';
import { calculateTotal } from '../../redux/services/subscriptionCartCalculations';
import VideoModal from '../../components/Modal/Subscription/VideoModal';

const PageDetails = props => {
    const { navigation, route } = props;
    const { itemId } = route.params;
    const [fetchedData, setFetchedData] = useState(null);
    const [bannerImagesArr, setBannerImagesArr] = useState([]);
    const [benifitComponentArray, setBenifitComponentArray] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddOnModalVisible, setIsAddOnModalVisible] = useState(false);
    const [infoData, setInfoData] = useState(null);
    const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
    const { config, selectedSubscription } = useSelector(
        state => state.subscriptionDetails,
    );

    // console.log('selectedSubscription', selectedSubscription);
    const dispatch = useDispatch();
    const toggleModal = item => {
        if (isModalVisible) {
            setInfoData(null);
        } else {
            setInfoData(item);
        }
        setModalVisible(!isModalVisible);
    };

    const toggleMealsModel = () => {
        setIsAddOnModalVisible(!isAddOnModalVisible);
    };

    const calculate = numOfMealsSelected => {
        if (fetchedData && numOfMealsSelected && config) {
            const resultData = calculateTotal(
                fetchedData,
                numOfMealsSelected,
                config,
            );
            dispatch(selectSubscriptionPlan(resultData));
        }
    };

    const fetchPlanDetails = async () => {
        if (itemId) {
            const response = await getOneSubscriptionPlanDetails(itemId);
            if (response.data.data) {
                setFetchedData(response.data.data);
                setBannerImagesArr(response.data.bannerImage);
                setBenifitComponentArray(response.data.benifitComponent);
                calculate(response.data.data.minimunNumOfMeals);
            }
        }
    };

    const navigationHandler = id => {
        navigation.navigate('SubscriptionPayment', {
            itemId,
            name: fetchedData?.name,
            data: fetchedData,
            numOfMealsSelected: selectedSubscription?.numOfMealsSelected,
            validityBasedOnMeals: selectedSubscription?.validityBasedOnMeals,
        });
    };

    const navigationToLogin = () => {
        navigation.navigate('LogIn');
    };

    const addMeals = () => {
        if (
            fetchedData &&
            fetchedData?.minimunNumOfMeals <=
                selectedSubscription?.numOfMealsSelected
        ) {
            calculate(selectedSubscription?.numOfMealsSelected + 1);
        }
    };

    const subtractMeals = () => {
        if (
            fetchedData &&
            fetchedData?.minimunNumOfMeals <
                selectedSubscription?.numOfMealsSelected
        ) {
            calculate(selectedSubscription?.numOfMealsSelected - 1);
        }
    };

    useEffect(() => {
        fetchPlanDetails();
    }, [itemId]);

    const toggleVideoModal = () => {
        setIsVideoModalVisible(!isVideoModalVisible);
    };

    return (
        selectedSubscription && (
            <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <SubscriptionPlanImage image={fetchedData?.image} />
                        <DetailsHeading item={fetchedData} />
                        <DescriptionOffer
                            data={selectedSubscription}
                            itemId={itemId}
                        />
                        <LineCircleSurroundedHeading
                            data={selectedSubscription}
                        />
                        <CarouselImageAtTop bannerImagesArr={bannerImagesArr} />
                        <BenifitHeadingComp />
                        <BenifitComponent
                            data={benifitComponentArray}
                            isDynamic={true}
                        />
                        <AddOnMeals
                            toggleModal={toggleMealsModel}
                            isModalVisible={isAddOnModalVisible}
                            navigation={navigation}
                        />

                        <HowToStart setIsVideoModalVisible={toggleVideoModal} />
                        <BestMealHeadingWithStars />

                        <View style={styles.mealCard}>
                            <MealCards
                                data={fetchedData}
                                toggleModal={toggleModal}
                                isDynamic={true}
                                isRatingTextVisible={true}
                                isHeadingVisible={true}
                                isButtonVisible={true}
                                showRatingNumber={true}
                                showInfoText={true}
                            />
                        </View>
                    </View>
                </ScrollView>
                <KnowMoreModal
                    isModalVisible={isModalVisible}
                    toggleModal={toggleModal}
                    data={infoData}
                />
                <AddOnMealModal
                    addMeals={addMeals}
                    subtractMeals={subtractMeals}
                    minimunNumOfMeals={fetchedData?.minimunNumOfMeals}
                    numOfMealsSelected={
                        selectedSubscription?.numOfMealsSelected
                    }
                    validityBasedOnMeals={
                        selectedSubscription?.validityBasedOnMeals
                    }
                    data={fetchedData}
                    itemId={itemId}
                    name={fetchedData?.name}
                    navigationHandler={navigationHandler}
                    navigationToLogin={navigationToLogin}
                    isModalVisible={isAddOnModalVisible}
                    setModalVisible={setIsAddOnModalVisible}
                />
                <VideoModal
                    visible={isVideoModalVisible}
                    hideModal={toggleVideoModal}
                />
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
    mealCard: {
        marginBottom: 100,
    },
});

export default PageDetails;
