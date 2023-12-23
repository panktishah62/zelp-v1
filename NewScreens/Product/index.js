import React from 'react';
// import { MaterialIcons, AntDesign } from '@expo/vector-icons';
// import Animated from "react-native-reanimated";
// import BottomSheet from "reanimated-bottom-sheet";
import img15 from '../assets/produtos/15.png';
import img16 from '../assets/produtos/16.png';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { dynamicSize } from '../../utils/responsive';
import { fonts } from '../../styles';
import { colors } from '../../styles/colors';

const ProductNew = () => {
    const sheetRef = React.createRef();
    const renderHeader = () => (
        <View style={styles.HeaderSize}>
            <View style={styles.HeaderDot} />
            <Text style={styles.HeaderTitle}>Size</Text>
        </View>
    );
    const renderContent = () => (
        <View style={styles.Size}>
            <TouchableOpacity
                style={styles.SizeOption}
                onPress={() => {
                    sheetRef.current.snapTo(1);
                    setSort('Popular');
                }}>
                <Text style={styles.OptionText}>Popular</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.Container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.Slide}>
                <ImageBackground
                    style={styles.Image}
                    source={img15}
                    resizeMode="contain"
                />
                <ImageBackground
                    style={styles.Image}
                    source={img16}
                    resizeMode="contain"
                />
            </ScrollView>
            <View style={styles.Action}>
                <TouchableOpacity style={styles.SizePicker}>
                    <Text style={styles.Text}>Size</Text>
                    {/* <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color="black"
                    /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.ColorPicker}>
                    <Text style={styles.Text}>Black</Text>
                    {/* <MaterialIcons
                        name="keyboard-arrow-down"
                        size={24}
                        color="black"
                    /> */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.Favorite}>
                    {/* <MaterialIcons
                        name="favorite-border"
                        size={24}
                        color="black"
                    /> */}
                </TouchableOpacity>
            </View>
            <View style={styles.TitleContainer}>
                <View style={styles.TitleView}>
                    <Text style={styles.Title}>H&M</Text>
                    <Text style={styles.Price}>$19.99</Text>
                </View>
                <View style={styles.SubTitleView}>
                    <Text style={styles.SubTitle}>Short black dress</Text>
                    <View style={styles.Rate}>
                        <TouchableOpacity style={styles.RateStar}>
                            {/* <AntDesign name="staro" size={14} color="#FFBA49" />
                            <AntDesign name="staro" size={14} color="#FFBA49" />
                            <AntDesign name="staro" size={14} color="#FFBA49" />
                            <AntDesign name="staro" size={14} color="#FFBA49" />
                            <AntDesign name="staro" size={14} color="#FFBA49" /> */}
                        </TouchableOpacity>
                        <Text style={styles.RateCount}> (0)</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.Description}>
                Short dress in soft cotton jersey with decorative buttons down
                the front and a wide, frill-trimmed
            </Text>
            <View style={styles.ButtonView}>
                <TouchableOpacity style={styles.AddCart}>
                    <Text style={styles.AddCartText}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.Shipping}>
                <Text style={styles.ShippingText}>Shipping</Text>
                {/* <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.Support}>
                <Text style={styles.SupportText}>Support</Text>
                {/* <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                /> */}
            </TouchableOpacity>
            {/* <BottomSheet
                ref={sheetRef}
                snapPoints={[500, 0]}
                enabledContentTapInteraction={false}
                initialSnap={0}
                borderRadius={0}
                renderContent={renderContent}
                renderHeader={renderHeader}
            /> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    Slide: {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
    },
    Image: {
        width: dynamicSize(270),
        height: dynamicSize(400),
    },
    Text: {
        ...fonts.NUNITO_500_16,
    },
    Action: {
        width: '100%',
        height: dynamicSize(70),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    SizePicker: {
        height: dynamicSize(40),
        width: dynamicSize(120),
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderColor: colors.BLACK,
        borderWidth: 0.5,
    },
    ColorPicker: {
        height: dynamicSize(40),
        width: dynamicSize(120),
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        borderColor: colors.BLACK,
        borderWidth: 0.5,
    },
    Favorite: {
        height: dynamicSize(40),
        width: dynamicSize(40),
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TitleContainer: {
        width: '100%',
        display: 'flex',
    },
    TitleView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
    },
    Title: {
        ...fonts.NUNITO_700_24,
    },
    Price: {
        ...fonts.NUNITO_700_24,
    },
    SubTitleView: {
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    SubTitle: {
        ...fonts.NUNITO_500_12,
    },
    Rate: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    RateStar: {
        display: 'flex',
        flexDirection: 'row',
    },
    RateCount: {
        color: '#9b9b9b',
    },
    Description: {
        ...fonts.NUNITO_400_14,
        paddingLeft: 15,
        paddingRight: 15,
    },
    ButtonView: {
        width: '100%',
        height: dynamicSize(70),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddCart: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#db3022',
        width: '90%',
        height: dynamicSize(40),
        borderRadius: 40,
    },
    AddCartText: {
        color: colors.WHITE,
    },
    Shipping: {
        display: 'flex',
        flexDirection: 'row',
        height: dynamicSize(40),
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    ShippingText: {
        ...fonts.NUNITO_500_14,
    },
    Support: {
        display: 'flex',
        flexDirection: 'row',
        height: dynamicSize(40),
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    SupportText: {
        ...fonts.NUNITO_500_14,
    },
    HeaderSize: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    HeaderTitle: {
        ...fonts.NUNITO_500_16,
    },
    HeaderDot: {
        height: dynamicSize(5),
        width: dynamicSize(70),
        margin: 3,
        backgroundColor: '#979797',
        borderRadius: 5,
    },
    Size: {
        backgroundColor: colors.WHITE,
        height: dynamicSize(400),
        display: 'flex',
        flexDirection: 'column',
    },
    SizeOption: {
        padding: 16,
        height: dynamicSize(35),
        justifyContent: 'center',
    },
    OptionText: {
        ...fonts.NUNITO_500_16,
    },
});

export default ProductNew;
