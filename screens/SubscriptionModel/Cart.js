import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import CartDetails from '../../components/Cards/Subscription/CartDetails';
import DeliveryInstruction from '../../components/Cards/Subscription/DeliveryInstruction';
import OrangeButton from '../../components/Buttons/Subscription/OrangeButton';
import SimpleHeading from '../../components/Heading/Subscription/SimpleHeading';
import MealCards from '../../components/Cards/Subscription/MealCards';
import { useDispatch, useSelector } from 'react-redux';
import { orderUsingSubscription } from '../../redux/services/subscriptionService';
import MealItemCard from '../../components/Cards/Subscription/MealItemCard';
import { colors } from '../../styles/colors';
import { dynamicSize } from '../../utils/responsive';
import {
    addItemToCart,
    removeItemFromCart,
} from '../../redux/actions/subscriptionCart';
import KnowMoreModal from '../../components/Modal/Subscription/KnowMoreModal';
import { dimensions } from '../../styles';
import { getRandomInt } from '../../utils';

const Cart = props => {
    const { navigation } = props;
    const { selectedItem, address } = useSelector(
        state => state.subscriptionCart,
    );
    const [infoData, setInfoData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const orderHandler = async () => {
        const response = await orderUsingSubscription({
            selectedItem: selectedItem,
            address: address,
            deliveryInstructions: text,
        });
        dispatch(removeItemFromCart());
        navigation.navigate('TrackOrder', {
            timeToDeliver: `${getRandomInt(30, 60)} mins`,
        });
    };

    const onSelectItem = item => {
        dispatch(addItemToCart(item));
    };
    const onUnSelectItem = item => {
        dispatch(removeItemFromCart());
        navigation.goBack();
    };

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

    return (
        <View style={{ height: dimensions.fullHeight }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
                <View style={styles.container}>
                    {address && selectedItem && (
                        <CartDetails
                            address={address}
                            subscriptionPlan={selectedItem}
                            navigation={navigation}
                        />
                    )}
                    <DeliveryInstruction text={text} setText={setText} />
                    <SimpleHeading text={'Food in your cart'} />
                    <MealItemCard
                        item={selectedItem}
                        isSelectable={false}
                        isRemovable={true}
                        handleKnowMore={handleKnowMore}
                        onSelectItem={onSelectItem}
                        onUnSelectItem={onUnSelectItem}
                    />
                    <OrangeButton
                        orderHandler={orderHandler}
                        text="Place Your Order"
                    />
                </View>
            </ScrollView>
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
        paddingVertical: dynamicSize(20),
        backgroundColor: colors.WHITE,
    },
    scrollView: {
        backgroundColor: colors.WHITE,
    },
});

export default Cart;
