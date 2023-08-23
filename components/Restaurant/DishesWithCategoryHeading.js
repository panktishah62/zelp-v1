import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { fonts, Styles } from '../../styles';
import DishComponent from './DishComponent';
import ArrowUpIcon from '../../assets/icons/chevron-up.svg';
import ArrowDownIcon from '../../assets/icons/chevron-down.svg';

const DishesWithCategoryHeading = ({
    categoryHeading,
    categoryCount,
    dishData,
}) => {
    const [open, setOpen] = useState(true);

    return (
        <View>
            <View style={[Styles.row_space_between, { marginBottom: 2 }]}>
                <Text style={[fonts.NUNITO_800_14, Styles.default_text_color]}>
                    {categoryHeading} ({categoryCount})
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setOpen(current => !current);
                    }}>
                    {open ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </TouchableOpacity>
            </View>
            {open ? <DishComponent dishData={dishData} /> : null}
        </View>
    );
};

export default DishesWithCategoryHeading;
