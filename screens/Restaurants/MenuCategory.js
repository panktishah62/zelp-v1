import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { fonts, Styles } from '../../styles';
import ArrowUpIcon from '../../assets/icons/chevron-up.svg';
import ArrowDownIcon from '../../assets/icons/chevron-down.svg';
import DishesWithCategoryHeading from '../../components/Restaurant/DishWithCategory';
import DishComponent from '../../components/Restaurant/DishComponent';
import { dynamicSize } from '../../utils/responsive';

const MenuCategory = props => {
    const {
        categoryItem,
        categories,
        restaurant,
        vegOnly,
        setMenuData,
        index,
        menuData,
    } = props;
    const dishItems = vegOnly
        ? categoryItem?.filter(dish => {
              return dish.isVeg;
          })
        : categoryItem;
    const [open, setOpen] = useState(true);
    const ListHeaderComponent = () => {
        return (
            <View
                style={[
                    Styles.row_space_between,
                    {
                        marginBottom: dynamicSize(2),
                        margin: dynamicSize(10),
                        padding: dynamicSize(5),
                    },
                ]}>
                <Text style={[fonts.NUNITO_800_14, Styles.default_text_color]}>
                    {categories[index]} ({dishItems?.length})
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setOpen(current => !current);
                    }}>
                    {open ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </TouchableOpacity>
            </View>
        );
    };

    const _renderItem = (dish, index) => {
        return open ? (
            <View key={index}>
                <DishComponent dishData={dish} restaurant={restaurant} />
            </View>
        ) : null;
    };

    return (
        <FlatList
            ListHeaderComponent={ListHeaderComponent}
            data={dishItems}
            renderItem={({ item, index }) => _renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default MenuCategory;
