import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addItemToCart,
    removeItemFromCart,
} from '../../../redux/actions/subscriptionCart';
import ComboCard from './ComboCard';
import { View } from 'react-native';
import { showDialog } from '../../../redux/actions/dialog';
import { DialogTypes } from '../../../utils';

const ItemCard = props => {
    const { ItemCards, isVegButtonActive, isAvailable, handleKnowMore } = props;
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const dispatch = useDispatch();
    const onSelectItem = item => {
        if (currentOrder && currentOrder?._id) {
            dispatch(
                showDialog({
                    isVisible: true,
                    titleText: 'Order in Progress',
                    subTitleText:
                        'Your Current Order is in Progress, cannot add item to cart',
                    buttonText1: 'CLOSE',
                    type: DialogTypes.WARNING,
                }),
            );
        } else {
            dispatch(addItemToCart(item));
        }
    };
    const onUnSelectItem = item => {
        dispatch(removeItemFromCart());
    };

    return (
        ItemCards &&
        ItemCards?.map((item, index) => (
            <View key={index}>
                {isVegButtonActive && item?.category === 'Veg' && (
                    <ComboCard
                        item={item}
                        onSelectItem={onSelectItem}
                        onUnSelectItem={onUnSelectItem}
                        isAvailable={isAvailable}
                        handleKnowMore={handleKnowMore}
                    />
                )}
                {!isVegButtonActive && (
                    <ComboCard
                        item={item}
                        onSelectItem={onSelectItem}
                        onUnSelectItem={onUnSelectItem}
                        isAvailable={isAvailable}
                        handleKnowMore={handleKnowMore}
                    />
                )}
            </View>
        ))
    );
};

export default ItemCard;
