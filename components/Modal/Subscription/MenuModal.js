import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native'; // Update the import statement
import Modal from 'react-native-modal';
import { dimensions, fonts } from '../../../styles';
import { dynamicSize } from '../../../utils/responsive';
import { useDispatch } from 'react-redux';
import { menuModal } from '../../../redux/actions/menuModal';
import { colors } from '../../../styles/colors';

const MenuModal = props => {
    const { active, toggleModal, menuItems, handleScrollTo, updatedMenu } =
        props;

    const scrollHandler = (index, item) => {
        if (updatedMenu[item]) {
            handleScrollTo(updatedMenu[item]);
            toggleModal();
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => scrollHandler(index, item)}>
            <Text>{item}</Text>
            <View style={styles.firstContainer}>
                <Text style={styles.secondText}>{item}</Text>
                {menuItems[item] && (
                    <Text style={styles.thirdText}>
                        {menuItems[item].length}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Modal style={styles.wrapperModalContainer} visible={active}>
                <View style={styles1.headingWrapper}>
                    <View style={styles1.topHeading}>
                        <Text style={styles1.topHeadingText}>Menu</Text>
                    </View>
                </View>
                <FlatList
                    data={Object.keys(menuItems)}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.scroll}
                />
                <View style={styles1.crossButtonContainer}>
                    <TouchableOpacity onPress={toggleModal}>
                        <View>
                            <Image
                                source={require('../../../assets/images/Subscription/orange_cross.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        marginVertical: dynamicSize(20),
    },
    wrapperModalContainer: {
        position: 'absolute',
        bottom: dimensions.fullHeight / 2 - dynamicSize(300),
        left: -10,
        right: -10,
        borderRadius: 20,
        backgroundColor: 'rgba(50, 50, 50, 0.95)',
        marginVertical: dynamicSize(20),
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: dynamicSize(26),
    },
    firstText: {
        color: '#FD7A33',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
    },
    secondText: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
    },
    thirdText: {
        color: '#FFF',
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
    },
});

const styles1 = StyleSheet.create({
    topHeading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        width: 100,
        borderBottomWidth: 3,
        borderColor: colors.WHITE,
    },
    topHeadingText: {
        color: colors.WHITE,
        fontFamily: fonts.POPPINS_500_11.fontFamily,
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '700',
        paddingBottom: 8,
    },
    headingWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    crossButtonContainer: {
        position: 'absolute',
        top: dynamicSize(16),
        right: 0,
    },
});

export default MenuModal;
