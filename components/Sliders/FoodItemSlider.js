import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { foodItemsData } from '../../assets/Data/testData';
import FoodItemCard from '../Restaurant/FoodItemCard';

export default FoodItemSlider = () => {
    return (
        <ScrollView
            style={styles.container}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {foodItemsData.map((item, index) => {
                return (
                    <FoodItemCard
                        description={item.description}
                        image={item.image}
                        views={item.views}
                        onClick={() => {}}
                        key={index}
                    />
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
});
