import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { dimensions, fonts } from '../../styles';
import { dynamicSize } from '../../utils/responsive';
import StickyBottomButton from '../../components/Buttons/StickyBottomButton';
import SellerCategoryCard from '../../components/Cards/SellerCategoryCard';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/actions/auction';

const SellerCategoryScreen = props => {
    const { navigation, route } = props;
    const catURI = 'https://reactnative.dev/img/tiny_logo.png';
    const [categoryType, setCategoryType] = useState([
        { name: 'Toys', categoryImage: catURI, selected: false },
        { name: 'Games', categoryImage: catURI, selected: false },
        { name: "Women's fashion", categoryImage: catURI, selected: false },
        { name: 'Collectibles', categoryImage: catURI, selected: false },
        { name: 'Chains', categoryImage: catURI, selected: false },
        { name: 'Sneakers', categoryImage: catURI, selected: false },
        { name: 'Accessories', categoryImage: catURI, selected: false },
        { name: 'Jackets', categoryImage: catURI, selected: false },
        { name: 'Accessories', categoryImage: catURI, selected: false },
        { name: 'Jackets', categoryImage: catURI, selected: false },
    ]);
    
    const [selectedCategory, setSelectedCategory] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const updatedCategoryType = categoryType.map(category => {
            return {
                ...category,
                selected: selectedCategory === category.name,
            };
        });
        setCategoryType(updatedCategoryType);
    }, [selectedCategory]);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView styles={styles.container}>
                <ScrollView>
                    <View styles={styles.mainCon}>
                        <Text style={styles.heading}>
                            What would you like to sell ?
                        </Text>
                        <Text style={styles.heading2}>
                            Select <Text style={styles.oneWord}>one</Text>{' '}
                            category so we can better recommend you to buyers !
                        </Text>

                        <View style={styles.categoryContainer}>
                            {categoryType.map((category, index) => {
                                return (
                                    <SellerCategoryCard
                                        key={index}
                                        categoryType={category.name}
                                        categoryImage={category.categoryImage}
                                        selected={category.selected}
                                        setSelectedCategory={
                                            setSelectedCategory
                                        }
                                    />
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.stickyContainer}>
                    <StickyBottomButton
                        title={'Next'}
                        pressHandler={() => {
                            dispatch(addCategory(selectedCategory));
                            navigation.navigate('ProductImageScreen');
                        }}
                        disabled={selectedCategory === ''}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BLACK,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    mainCon: {
        marginLeft: 30,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },

    heading: {
        ...fonts.NUNITO_800_28,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        paddingTop: dynamicSize(20),
        marginBottom: dynamicSize(30),
    },
    heading2: {
        ...fonts.NUNITO_500_16,
        color: colors.BLACK,
        paddingLeft: dynamicSize(20),
        paddingRight: dynamicSize(20),
        // paddingTop: dynamicSize(10),
        marginBottom: dynamicSize(20),
    },
    oneWord: {
        ...fonts.NUNITO_600_16,
        color: colors.ORANGE,
    },
    categoryContainer: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingLeft: dynamicSize(10),
        paddingRight: dynamicSize(10),
    },
    stickyContainer: {
        flex: 1,
        height: 100,
        backgroundColor: colors.WHITE,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
});

export default SellerCategoryScreen;
