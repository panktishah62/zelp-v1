import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MealItemCard from './MealItemCard';
import { colors } from '../../../styles/colors';
import { dynamicSize } from '../../../utils/responsive';
import { dimensions, fonts } from '../../../styles';
import { useDispatch } from 'react-redux';
import {
    addItemToCart,
    removeItemFromCart,
} from '../../../redux/actions/subscriptionCart';

const CategorisedMenu = props => {
    const categorisedMenu = props?.categorisedMenu;
    const handleKnowMore = props?.handleKnowMore;
    const isVeg = props?.isVeg;
    const setUpdatedMenu = props?.setUpdatedMenu;
    const isAvailable = props?.isAvailable;
    const availableAt = props?.availableAt;
    const [menuRenderData, setMenuRenderData] = useState({});
    const dispatch = useDispatch();
    const onSelectItem = item => {
        dispatch(addItemToCart(item));
    };
    const onUnSelectItem = item => {
        dispatch(removeItemFromCart());
    };

    useEffect(() => {
        // setUpdatedMenu(menuRenderData);
        setUpdatedMenu(menuRenderData);
    }, [menuRenderData]);

    const renderItems = items => {
        return items.map((item, index) => {
            return (
                <View key={index}>
                    {isVeg && item?.category === 'Veg' && (
                        <MealItemCard
                            item={item}
                            isSelectable={true}
                            isRemovable={false}
                            handleKnowMore={handleKnowMore}
                            onSelectItem={onSelectItem}
                            onUnSelectItem={onUnSelectItem}
                            isAvailable={isAvailable}
                            availableAt={availableAt}
                        />
                    )}
                    {!isVeg && (
                        <MealItemCard
                            item={item}
                            isSelectable={true}
                            isRemovable={false}
                            handleKnowMore={handleKnowMore}
                            onSelectItem={onSelectItem}
                            onUnSelectItem={onUnSelectItem}
                            isAvailable={isAvailable}
                            availableAt={availableAt}
                        />
                    )}
                </View>
            );
        });
    };
    return (
        // <View>
        Object.keys(categorisedMenu).map(key => {
            const items = categorisedMenu[key];
            if (items.length > 0) {
                return (
                    <View
                        key={key}
                        onLayout={event => {
                            const updateItem = menuRenderData;
                            updateItem[key] = event.nativeEvent.layout.y;
                            setMenuRenderData(updateItem);
                        }}
                        style={styles.container}>
                        <View style={styles.lineContainer}>
                            <View style={styles.line} />
                            <Text
                                style={styles.textStyle}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {key}
                            </Text>
                            <View style={styles.line} />
                        </View>
                        {renderItems(items)}
                    </View>
                );
            }
        })
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: dynamicSize(50),
    },
    line: {
        flex: 1,
        borderWidth: 1,
        height: 1,
        marginHorizontal: dynamicSize(10),
        borderColor: colors.DARKER_GRAY,
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: colors.DARKER_GRAY,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '500',
        maxWidth: dimensions.fullWidth * 0.7,
    },
});
export default CategorisedMenu;
