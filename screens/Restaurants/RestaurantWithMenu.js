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

const RestaurantWithMenu = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { restaurant, distance, time } = route.params;
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

    const handleButtonPress = index => {
        scrollViewRef?.current?.scrollTo({
            y: index,
            animated: true,
        });
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

    return (
        <SafeAreaView style={styles.mainContainer}>
            {!isLoading && (
                <ScrollView
                    contentContainerStyle={styles.container}
                    ref={scrollViewRef}>
                    {restaurant && (
                        <RestaurantCardInfo
                            restaurant={restaurant}
                            distance={distance}
                            time={time}
                            navigation={navigation}
                        />
                    )}
                    <View style={Styles.row_flex_start}>
                        <View style={Styles.row_flex_start}>
                            <Switch
                                trackColor={{
                                    false: colors.GREY_DARK,
                                    true: colors.VEG_GREEN,
                                }}
                                thumbColor={
                                    vegOnly ? colors.GREEN : colors.WHITE
                                }
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

                    <View style={styles.menuContainer}>
                        {categoryItems.map((categoryItem, index) => {
                            const dishItems = vegOnly
                                ? categoryItem?.filter(dish => {
                                      return dish.isVeg;
                                  })
                                : categoryItem;
                            return (
                                <View
                                    key={index}
                                    onLayout={event => {
                                        setMenuData([
                                            ...menuData,
                                            {
                                                category: categories[index],
                                                count: dishItems.length,
                                                y: event.nativeEvent.layout.y,
                                            },
                                        ]);
                                    }}>
                                    <DishesWithCategoryHeading
                                        categoryHeading={categories[index]}
                                        categoryCount={dishItems?.length}
                                        dishData={dishItems}
                                        restaurant={restaurant}
                                    />
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            )}
            {isLoading && (
                <View style={[Styles.center, { flex: 1 }]}>
                    <ActivityIndicator size="large" color={colors.ORANGE} />
                </View>
            )}
            {/* <LiveTrackingContainer navigation={navigation} /> */}
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
        justifyContent: 'flex-end',
        height: dimensions.fullHeight,
        backgroundColor: colors.WHITE,
    },
    container: {
        // alignItems: 'center',
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

export default RestaurantWithMenu;
