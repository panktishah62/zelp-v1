import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import RestaurantMenuCardDetails from '../../components/Cards/Subscription/RestaurantMenuCardDetails';
import SearchBar from '../../components/Cards/Search/Subscription/SearchBar';
import MultipleButtonFoodType from '../../components/Buttons/Subscription/MultipleButtonFoodType';
import QuickCheckout from '../../components/Cards/Subscription/QuickCheckout';
import HeadingCardComp from '../../components/Cards/Subscription/HeadingCardComp';
import RestaurantMenuModal from '../../components/Modal/Subscription/RestaurantMenuModal';
import LeftSimple from '../../components/Heading/Subscription/LeftSimple';
import AbsoluteOrangeButton from '../../components/Buttons/Subscription/AbsoluteOrangeButton';
import { useSelector } from 'react-redux';
import { getBestSellerFoodItems } from '../../redux/services/subscriptionService';
import SubscriptionMeal from '../../components/Cards/Subscription/SubscriptionMeal';
import KnowMoreModal from '../../components/Modal/Subscription/KnowMoreModal';
import CategorisedMenu from '../../components/Cards/Subscription/CategorisedMenu';
import { dimensions } from '../../styles';
import { dynamicSize } from '../../utils/responsive';

const RestaurantMenuPage = props => {
    const { navigation, route } = props;
    const { subscriptionDetails } = route?.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [infoData, setInfoData] = useState(null);
    const [bestSellerItemArray, setBestSellerItemArray] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [updatedMenu, setUpdatedMenu] = useState({});
    const [isVeg, setIsVeg] = useState(false);
    const scrollViewRef = useRef();

    const { selectedItem } = useSelector(state => state.subscriptionCart);
    useEffect(() => {}, []);

    const toggleModal = item => {
        if (isModalVisible) {
            setInfoData(null);
        } else {
            setInfoData(item);
        }
        setModalVisible(!isModalVisible);
    };

    const handleKnowMore = item => {
        toggleModal(item);
    };

    const handleScrollTo = index => {
        scrollViewRef?.current?.scrollTo({
            y: index,
            animated: true,
        });
    };

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}>
                <View style={styles.container} key={1}>
                    <RestaurantMenuCardDetails
                        subscriptionPlan={subscriptionDetails?.subscriptionPlan}
                    />
                    {/* <SearchBar /> */}
                    <MultipleButtonFoodType
                        subscriptionPlan={subscriptionDetails?.subscriptionPlan}
                        handleKnowMore={handleKnowMore}
                        setMenuItems={setMenuItems}
                        setIsVeg={setIsVeg}
                        setUpdatedMenu={setUpdatedMenu}
                    />
                </View>
            </ScrollView>
            {menuItems && updatedMenu && (
                <RestaurantMenuModal
                    menuItems={menuItems}
                    handleScrollTo={handleScrollTo}
                    updatedMenu={updatedMenu}
                    bottomSpace={
                        selectedItem ? dynamicSize(80) : dynamicSize(20)
                    }
                />
            )}
            {selectedItem && (
                <AbsoluteOrangeButton
                    navigation={navigation}
                    text={'Proceed to checkout'}
                />
            )}
            <KnowMoreModal
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                data={infoData}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: dimensions.fullHeight,
        // marginVertical: 20,
    },
});

export default RestaurantMenuPage;
