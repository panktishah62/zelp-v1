import React, { useRef, useState } from 'react';
// import {
//   MaterialIcons,
//   MaterialCommunityIcons,
//   FontAwesome,
// } from "@expo/vector-icons";
// import Animated from "react-native-reanimated";
import BottomSheet from 'reanimated-bottom-sheet';
import img01 from '../assets/produtos/01.png';
import img02 from '../assets/produtos/02.png';
import img03 from '../assets/produtos/03.png';
import Card from '../components/Card/CardNew';
import { dynamicSize } from '../../utils/responsive';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StyleSheet,
} from 'react-native';

const Catalogo = ({ navigation }) => {
    const products = [
        {
            key: String(Math.random()),
            image: img01,
            marca: 'Calvin Klein',
            produto: 'T-Shirt Sailing',
            preco: '10,00',
        },
        {
            key: String(Math.random()),
            image: img02,
            marca: 'Mango Boy',
            produto: 'T-Shirt',
            preco: '20,00',
        },
        {
            key: String(Math.random()),
            image: img03,
            marca: 'Dorothy Perkins',
            produto: 'T-Shirt Spanish',
            preco: '30,00',
        },
        {
            key: String(Math.random()),
            image: img03,
            marca: 'Dorothy Perkins',
            produto: 'T-Shirt Spanish',
            preco: '30,00',
        },
        {
            key: String(Math.random()),
            image: img03,
            marca: 'Dorothy Perkins',
            produto: 'T-Shirt Spanish',
            preco: '30,00',
        },
        {
            key: String(Math.random()),
            image: img02,
            marca: 'Mango Boy',
            produto: 'T-Shirt',
            preco: '20,00',
        },
    ];

    const [sort, setSort] = useState('Price: lowest to high');

    const renderItem = ({ item }) => (
        <Card
            image={item.image}
            marca={item.marca}
            produto={item.produto}
            preco={item.preco}
            navigation={navigation}
        />
    );

    const renderHeader = () => (
        <View style={styles.HeaderSort}>
            <View style={styles.HeaderDot} />
            <Text style={styles.HeaderTitle}>Sort by</Text>
        </View>
    );

    const renderContent = () => (
        <View style={styles.SortBy}>
            <TouchableOpacity
                style={styles.SortOption}
                onPress={() => {
                    sheetRef.current.snapTo(1);
                    setSort('Popular');
                }}>
                <Text style={styles.OptionText}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.SortOption}
                onPress={() => {
                    sheetRef.current.snapTo(1);
                    setSort('Newest');
                }}>
                <Text style={styles.OptionText}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.SortOption}
                onPress={() => {
                    sheetRef.current.snapTo(1);
                    setSort('Customer review');
                }}>
                <Text style={styles.OptionText}>Customer review</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.SortOption}
                onPress={() => {
                    sheetRef.current.snapTo(1);
                    setSort('Price: lowest to high');
                }}>
                <Text style={styles.OptionText}>Price: lowest to high</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.SortOption}
                onPress={() => {
                    sheetRef.current.snapTo(1);
                    setSort('Price: highest to low');
                }}>
                <Text style={styles.OptionText}>Price: highest to low</Text>
            </TouchableOpacity>
        </View>
    );

    const sheetRef = React.createRef();

    return (
        <View style={styles.Container}>
            <View style={styles.CategoryContainer}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.CategoryScrollView}>
                    <TouchableOpacity style={styles.CategoryChip}>
                        <Text style={styles.ChipName}>T-Shirts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CategoryChip}>
                        <Text style={styles.ChipName}>T-Shirts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CategoryChip}>
                        <Text style={styles.ChipName}>T-Shirts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CategoryChip}>
                        <Text style={styles.ChipName}>T-Shirts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CategoryChip}>
                        <Text style={styles.ChipName}>T-Shirts</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.ConfigContainer}>
                <TouchableOpacity style={styles.Filter}>
                    {/* <MaterialIcons name="filter-list" size={24} color="black" /> */}
                    <Text style={styles.Label}>Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Sort}
                    onPress={() => sheetRef.current.snapTo(0)}>
                    {/* <MaterialCommunityIcons
            name="swap-vertical"
            size={24}
            color="black"
          /> */}
                    <Text style={styles.Label}>{sort}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Exibition}>
                    {/* <FontAwesome name="th-list" size={24} color="black" /> */}
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.ProductList}
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                numColumns={2}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                    margin: 5,
                }}
            />
            {/* <BottomSheet
        ref={sheetRef}
        snapPoints={[210, 0]}
        enabledContentTapInteraction={false}
        initialSnap={1}
        borderRadius={0}
        renderContent={renderContent}
        renderHeader={renderHeader}
      /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    CategoryContainer: {
        height: dynamicSize(60),
    },
    CategoryScrollView: {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        contentContainerStyle: {
            alignItems: 'center',
            paddingLeft: 16,
        },
    },
    CategoryChip: {
        height: dynamicSize(40),
        minWidth: dynamicSize(100),
        borderRadius: 30,
        backgroundColor: colors.BLACK,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    ChipName: {
        color: colors.WHITE,
        ...fonts.NUNITO_500_14,
    },
    ConfigContainer: {
        height: dynamicSize(40),
        display: 'flex',
        flexDirection: 'row',
        marginLeft: dynamicSize(16),
        marginRight: dynamicSize(16),
    },
    Filter: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    Sort: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    Exibition: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    Label: {
        ...fonts.NUNITO_500_12,
    },
    ProductList: {
        padding: 15,
    },
    SortBy: {
        backgroundColor: colors.WHITE,
        height: dynamicSize(200),
        display: 'flex',
        flexDirection: 'column',
    },
    SortOption: {
        padding: 16,
        height: dynamicSize(35),
        justifyContent: 'center',
    },
    OptionText: {
        ...fonts.NUNITO_700_16,
    },
    HeaderSort: {
        display: 'flex',
        flexdirection: 'column',
        justifycontent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    HeaderTitle: {
        ...fonts.NUNITO_600_20,
    },
    HeaderDot: {
        height: 5,
        width: dynamicSize(70),
        margin: 3,
        backgroundColor: '#979797',
        borderRadius: 5,
    },
});

export default Catalogo;
