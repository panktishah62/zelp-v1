import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import CrossWhite from '../../../assets/images/Subscription/CrossWhite.svg';
import Modal from 'react-native-modal';
import { dimensions, fonts } from '../../../styles';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { dynamicSize, normalizeFont } from '../../../utils/responsive';
import SubscribeNowAddMeal from '../../Buttons/Subscription/SubscribeNowAddMeal';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../styles/colors';
import VEGICON from '../../../assets/icons/VegIcon.svg';
import NONVEGICON from '../../../assets/icons/nonveg.svg';
import { Surface } from 'react-native-paper';

const KnowMoreModal = props => {
    const dispatch = useDispatch();
    const { isModalVisible, toggleModal, data } = props;
    const itemId = props.itemId;
    const planID = itemId;
    const { mealCount } = useSelector(state => state.mealDetails);
    const [mealNo, setMealNo] = useState(5);
    const totalDays = mealCount + 5;

    return (
        <View>
            <Modal
                style={styles.wrapperModalContainer}
                animationType="slide"
                transparent={true}
                visible={isModalVisible}>
                <Surface
                    style={styles.modalContainer}
                    elevation={14}
                    mode="elevated">
                    {data?.image && (
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: data.image }}
                            />
                        </View>
                    )}
                    <View style={styles.textContainer}>
                        {data?.category === 'Veg' && (
                            <View style={styles.firstTextContainer}>
                                <VEGICON />
                                <Text style={styles.categoryStyles}>
                                    {data?.category}
                                </Text>
                            </View>
                        )}
                        {data?.category != 'Veg' && (
                            <View style={styles.firstTextContainer}>
                                <NONVEGICON />
                                <Text style={{ color: colors.BLACK }}>
                                    {data?.category}
                                </Text>
                            </View>
                        )}
                        <View style={styles.secondTextContainer}>
                            {data?.title && (
                                <View style={styles.titleContainer}>
                                    <Text
                                        style={[
                                            styles.titleText,
                                            { color: colors.BLACK },
                                        ]}>
                                        {data.title}
                                    </Text>
                                </View>
                            )}
                            {data?.rating && (
                                <View style={styles.ratingContainer}>
                                    <Image
                                        source={require('../../../assets/images/Subscription/golden_star.png')}
                                    />
                                    <Text style={styles.ratings}>
                                        {data.rating?.value} Rating
                                    </Text>
                                </View>
                            )}
                        </View>

                        {data?.description && (
                            <View style={styles.thirdTextContainer}>
                                <Text style={styles.description}>
                                    {data.description}
                                </Text>
                            </View>
                        )}
                    </View>
                </Surface>

                <View style={styles.svgContainer}>
                    <View style={styles.innerSvgContainer}>
                        <TouchableOpacity onPress={toggleModal}>
                            <CrossWhite height={40} width={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperModalContainer: {
        position: 'absolute',
        bottom: dynamicSize(0),
        height: dynamicSize(400),
        elevation: 10,
        margin: 0,
        width: dimensions.fullWidth,
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: dynamicSize(20),
        borderTopRightRadius: dynamicSize(20),
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.WHITE,
        margin: 0,
    },
    secondTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

        marginTop: 10,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: dynamicSize(24),
        width: dimensions.fullWidth - dynamicSize(30),
        height: dynamicSize(200),
        borderRadius: dynamicSize(20),
    },
    thirdTextContainer: {
        width: dimensions.fullWidth - dynamicSize(40),
        marginTop: 10,
    },
    titleContainer: {
        width: dynamicSize(200),
    },
    textContainer: {
        width: dimensions.fullWidth - dynamicSize(50),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: dynamicSize(5),
        height: dynamicSize(140),
    },
    firstTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
        marginTop: dynamicSize(10),
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: dynamicSize(20),
    },
    svgContainer: {
        position: 'absolute',
        top: dynamicSize(10),
        elevation: 12,
        right: dynamicSize(13),
        borderRadius: dynamicSize(20),
        height: dynamicSize(40),
        width: dynamicSize(40),
    },
    innerSvgContainer: {},
    ratingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
    },
    titleText: {
        color: colors.DARKER_GRAY,
        ...fonts.POPPINS_500_18,
    },
    categoryStyles: {
        color: colors.DARKER_GRAY,
        ...fonts.POPPINS_400_16,
    },
    description: {
        color: colors.DARKER_GRAY,
        ...fonts.POPPINS_400_16,
    },
    ratings: {
        color: colors.DARKER_GRAY,
        ...fonts.POPPINS_400_16,
    },
});

export default KnowMoreModal;
