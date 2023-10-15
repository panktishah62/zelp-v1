import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ParagraphComp from '../../components/Cards/Subscription/ParagraphComp';
import BenifitComponent from '../../components/Cards/Subscription/BenifitComponent';
import PartnersComponent from '../../components/Cards/Subscription/PartnersComponent';
import MealComponent from '../../components/Cards/Subscription/MealComponent';
import StarHeadingComponent from '../../components/Cards/Subscription/StarHeadinComponent';
import BenifitHeadingComp from '../../components/Cards/Subscription/BenifitHeadingComp';
import CarouselImageAtTop from '../../components/Cards/Subscription/CarouselImageAtTop';
import { getBannerImages } from '../../redux/services/subscriptionService';
import { useSelector } from 'react-redux';
import VideoModal from '../../components/Modal/Subscription/VideoModal';

const SubscriptionPage = props => {
    const { navigation } = props;

    const [bannerImagesArr, setBannerImagesArr] = useState([]);
    const [benifitItemArr, setBenifitItemArr] = useState([]);
    const [bestMealArr, setBestMealArr] = useState([]);
    const [minValidity, setMinValidity] = useState(null);
    const [specialOfferBanner, setSpecialOfferBanner] = useState(null);
    const { config, selectedSubscription } = useSelector(
        state => state.subscriptionDetails,
    );
    const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
    useEffect(() => {
        fetchBannerImages();
    }, [setBannerImagesArr]);

    const fetchBannerImages = async () => {
        const response = await getBannerImages();
        setBannerImagesArr(response?.data?.data);
        setBenifitItemArr(response?.data?.benifitComponent);
        setBestMealArr(response?.data?.bestMealArray);
        setMinValidity(response?.data?.minValidity);
        setSpecialOfferBanner(response?.data?.specialOfferBanner);
    };

    const toggleVideoModal = () => {
        setIsVideoModalVisible(!isVideoModalVisible);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {selectedSubscription && (
                <View>
                    <CarouselImageAtTop bannerImagesArr={bannerImagesArr} />
                    <StarHeadingComponent navigation={navigation} />
                    <ParagraphComp
                        minValidity={minValidity}
                        specialOfferBanner={specialOfferBanner}
                    />
                    <BenifitHeadingComp />
                    <BenifitComponent data={benifitItemArr} isDynamic={true} />

                    <PartnersComponent />

                    <MealComponent
                        bestMealArr={bestMealArr}
                        setIsVideoModalVisible={toggleVideoModal}
                    />
                </View>
            )}
            <VideoModal
                visible={isVideoModalVisible}
                hideModal={toggleVideoModal}
            />
        </ScrollView>
    );
};
const styles = StyleSheet.create({});

export default SubscriptionPage;
