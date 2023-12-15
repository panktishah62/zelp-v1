import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Switch,
    SafeAreaView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import { dimensions, fonts, Styles } from '../../styles';
import { colors } from '../../styles/colors';
import DishesWithCategoryHeading from '../../components/Restaurant/DishWithCategory';
import RestaurantCardInfo from '../../components/Restaurant/RestaurantCardInfo';
import { useDispatch, useSelector } from 'react-redux';
import { LiveTrackingContainer } from '../../components/TrackOrder/LiveTrackingContainer';
import { useIsFocused } from '@react-navigation/native';
import { DialogTypes } from '../../utils';
import MenuButton from '../../components/Buttons/MenuButton';
import Menu from '../../components/Restaurant/Menu';
import { showDialog } from '../../redux/actions/dialog';
import { getAllFoodItems } from '../../redux/services/foodItemsService';
import MenuCategory from './MenuCategory';

const RestaurantWithMenuUpdated = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { restaurant } = route.params;
    const [query, setQuery] = useState('');
    const [vegOnly, setVegOnly] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryItems, setCategoryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const currentOrder = useSelector(state => state.currentOrder.currentOrder);
    const [showMenu, setShowMenu] = useState(false);
    // let menuData = [];
    const [menuData, setMenuData] = useState([]);
    const [renderMenu, setRenderMenu] = useState(false);
    const scrollViewRef = useRef();
    const flatListRef = useRef(null);

    const handleButtonPress = index => {
        flatListRef.current.scrollToIndex({ animated: true, index });
    };

    const toggleSwitch = () => {
        setVegOnly(previousState => !previousState);
        setIsLoading(true);
        getFoodItems();
        setMenuData([]);
    };

    const getFoodItems = async () => {
        await getAllFoodItems(restaurant?._id)
            .then(response => response?.data)
            .then(data => {
                const categories = new Set();
                const foodItemsWithCategory = [];
                // const updatedMenu=[];
                if (data && data?.foodItems) {
                    data?.foodItems?.forEach(dishes => {
                        const items = [];
                        dishes?.category.forEach(dishDetail => {
                            if (
                                dishDetail?.category &&
                                dishDetail?.category.name
                            ) {
                                categories.add(dishDetail.category.name);
                                items.push(dishDetail);
                            }
                        });
                        foodItemsWithCategory.push(items);
                    });
                }

                const updatedMenu = data?.foodItems.map((items, index) => {
                    return {
                        category:
                            items?.category?.length > 0 &&
                            items.category[0].category?.name,
                        count: items?.category?.length,
                        index: index,
                    };
                });
                setMenuData(updatedMenu);
                setCategories(Array.from(categories));
                setCategoryItems(foodItemsWithCategory);
                setIsLoading(false);
            })
            .catch(error =>
                dispatch(
                    showDialog({
                        isVisible: true,
                        titleText: 'Something Went Wrong!',
                        subTitleText: error?.message,
                        buttonText1: 'CLOSE',
                        type: DialogTypes.ERROR,
                    }),
                ),
            );
    };

    const isFocused = useIsFocused();

    useEffect(() => {
        setIsLoading(true);
        getFoodItems();
    }, [navigation, currentOrder, isFocused]);

    const _renderItem = (categoryItem, index) => {
        return (
            <MenuCategory
                categoryItem={categoryItem}
                categories={categories}
                restaurant={restaurant}
                vegOnly={vegOnly}
                setMenuData={setMenuData}
                index={index}
                menuData={menuData}
                key={index}
            />
        );
    };

    const ListHeaderComponent = () => {
        if (!restaurant) return null;
        return (
            <View>
                <RestaurantCardInfo
                    restaurant={restaurant}
                    navigation={navigation}
                />
                <View style={Styles.row_flex_start}>
                    <View style={Styles.row_flex_start}>
                        <Switch
                            trackColor={{
                                false: colors.GREY_DARK,
                                true: colors.VEG_GREEN,
                            }}
                            thumbColor={vegOnly ? colors.GREEN : colors.WHITE}
                            onValueChange={toggleSwitch}
                            value={vegOnly}
                            style={Styles.toggleSwitch}
                        />

                        <Text
                            style={[
                                fonts.NUNITO_800_12,
                                { color: colors.VEG_GREEN },
                            ]}>
                            Pure Veg
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <FlatList
                    ListHeaderComponent={ListHeaderComponent}
                    ref={flatListRef}
                    data={categoryItems}
                    renderItem={({ item, index }) => _renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    windowSize={3}
                    initialNumToRender={categoryItems?.length}
                />
            </View>

            {isLoading && (
                <View style={[Styles.center, { flex: 1 }]}>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            )}

            {renderMenu && (
                <TouchableWithoutFeedback
                    onPress={() => {
                        setShowMenu(false);
                    }}
                    style={styles.menu}>
                    <Menu
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        menuData={menuData}
                        handleButtonPress={handleButtonPress}
                    />
                </TouchableWithoutFeedback>
            )}
            <View style={styles.menubutton}>
                <MenuButton
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    setRenderMenu={setRenderMenu}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    container: {
        paddingBottom: 80,
    },
    shadowStyle: {
        shadowColor: colors.ORANGE,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        elevation: 15,
    },
    touchableOpacityStyle: {
        width: 113,
        height: 47,
        borderRadius: 10,
        backgroundColor: colors.ORANGE,
        position: 'absolute',
        bottom: 10,
        zIndex: 10,
    },
    closeBtnStyle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.WHITE,
    },
    imageContainer: {
        width: dimensions.fullWidth * 0.95,
        height: 141,
    },
    layer: {
        backgroundColor: colors.BLACK,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    image: {
        minHeight: 141,
        width: dimensions.fullWidth * 0.95,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    innerContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        width: dimensions.fullWidth * 0.95,
        padding: 5,
    },
    ratingContainer: {
        backgroundColor: colors.WHITE,
        borderRadius: 5,
        padding: 4,
    },
    cuisines: {
        backgroundColor: colors.WHITE,
        opacity: 0.5,
        borderRadius: 7,
        height: 19,
        minWidth: dimensions.fullWidth * 0.5,
        ...Styles.row_flex_start,
    },
    cuisinesText: {
        color: colors.BLACK,
        ...fonts.NUNITO_500_10,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 5,
        ...fonts.NUNITO_800_14,
        color: colors.WHITE,
    },
    bottomContainer: {
        padding: 15,
        ...Styles.row_space_between,
        height: 57,
        backgroundColor: colors.ORANGE_GRADIENT_LIGHT,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    menuContainer: {
        margin: 10,
    },
    menubutton: {
        position: 'absolute',
        bottom: 40,
        width: dimensions.fullWidth,
        alignItems: 'center',
    },
    menu: {
        width: dimensions.fullWidth,
        height: dimensions.fullHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RestaurantWithMenuUpdated;
