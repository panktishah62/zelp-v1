import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'; // Updated import statement
import { dimensions } from '../../../styles';
import TextSurroundedByLine from './TextSurroundedByLine';
import { dynamicSize } from '../../../utils/responsive';
import MealCards from './MealCards';
import { useSelector } from 'react-redux';
import { getCategorizedFoodItems } from '../../../redux/services/subscriptionService';

const HeadingCardComp = (props) => {
    const { mealCardData } = props;

    const { catagoryId } = useSelector((state) => state.menuModal)

    const { planID } = useSelector((state) => state.finalSubscriptionPrice);


    const [catagorizedData, setCatagorizedData] = useState([]);

    const fetchCatagorizedData = async () => {
        console.log(planID)
        const response = await getCategorizedFoodItems(planID, { type: "Lunch" });
        setCatagorizedData(response?.data[0].items)
        
    }

    console.log("CategorizedData",catagorizedData)

    useEffect(() => {
        fetchCatagorizedData()
    }, [])




    const data = [
        {
            id: 1,
            headingText: "Starters",
            dataArr: [],
        },
        {
            id: 2,
            headingText: "Rice Items",
            dataArr: [],
        },
        {
            id: 3,
            headingText: "Curries",
            dataArr: [],
        },
    ];
    const ITEM_HEIGHT = 50

    const flatListRef = useRef();
    const scrollToItem = (index) => {
        if (flatListRef.current) {
            // Replace 'item' with the item you want to scroll to


            if (index !== -1) {
                flatListRef.current.scrollToIndex({ index, animated: true });
            }
        }
    };
    useEffect(() => {
        console.log(catagoryId)
        scrollToItem(catagoryId);
    }, [catagoryId]);


    const renderItem = ({ item, index }) => (
        <View style={styles.container} key={index}>
            <TextSurroundedByLine text={item.headingText} />
            <MealCards data={mealCardData} heading={item.headingText} isDynamic={false} activeOrangeButton={true} orangeButtonText={"Select"} showRatingNumber={true} showInfoText={true} />
        </View>
    );

    return (
        <FlatList
            ref={flatListRef}
            data={data}

            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
        />
    );
};

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.fullWidth,
        marginTop: dynamicSize(20),
    },
    contentContainer: {
        paddingBottom: dynamicSize(20), // Adjust this value as needed
    },
});

export default HeadingCardComp;
