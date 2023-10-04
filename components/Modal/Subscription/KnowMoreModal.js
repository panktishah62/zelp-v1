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
import { dimensions } from '../../../styles';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { dynamicSize } from '../../../utils/responsive';
import SubscribeNowAddMeal from '../../Buttons/Subscription/SubscribeNowAddMeal';
import { useDispatch, useSelector } from 'react-redux';
import {
    finalPlanDetails,
    mealDetailsDecreased,
    mealDetailsIncreased,
} from '../../../redux/actions/subscriptionActions';
import { colors } from '../../../styles/colors';

const KnowMoreModal = props => {
    const dispatch = useDispatch();
    const { isModalVisible, toggleModal } = props;
    const itemId = props.itemId;
    const planID = itemId;
    const { mealCount } = useSelector(state => state.mealDetails);
    const [mealNo, setMealNo] = useState(5);
    const totalDays = mealCount + 5;

    const { navigationHandler } = props;

    const shadowOpt = {
        width: 200,
        height: 200,
        color: '#000000',
        border: 4,
        radius: 10,
        opacity: 0.25,
        x: 0,
        y: -2,
        style: { marginBottom: 20 },
    };

    const { finalPrice } = useSelector(state => state.finalSubscriptionPrice);

    const handleSubscribe = () => {
        dispatch(finalPlanDetails({ finalPrice, planID }));
        // toggleModal()
        navigationHandler();
    };

    return (
        <View >
            <Modal
                style={styles.wrapperModalContainer}
                animationType="slide"
                transparent={true}
                visible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            resizeMode="stretch"
                            source={require('../../../assets/images/combo.png')}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.firstTextContainer}>
                            <Image
                                source={require('../../../assets/images/Subscription/veg.png')}
                            />
                            <Text style={{ color: colors.BLACK }}>Veg</Text>
                        </View>
                        <View style={styles.secondTextContainer}>
                            <View style={styles.titleContainer}>
                                <Text
                                    style={[
                                        styles.titleText,
                                        { color: colors.BLACK },
                                    ]}>
                                    Ghee Rice, Paneer Butter Masala Combo
                                </Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Image
                                    source={require('../../../assets/images/Subscription/golden_star.png')}
                                />
                                <Text style={{color:colors.BLACK}}>4.0</Text>
                            </View>
                        </View>

                        <View style={styles.thirdTextContainer}>
                            <Text style={{ color: colors.BLACK }}>
                                Serves 1 | Ghee rice, Qtr paneer butter masala,
                                Complimentary Salad
                            </Text>
                        </View>
                    </View>
                </View>
           
                <View style={styles.svgContainer}>
                <TouchableOpacity onPress={toggleModal}>
                    <CrossWhite />
            </TouchableOpacity>

                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapperModalContainer: {
        position: 'absolute',
        bottom: -dynamicSize(30),
        height: 400,
        left: -18,
        elevation: 10,
        width: dimensions.fullWidth,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        gap: 10,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        marginTop: 24,
        width: dimensions.fullWidth - dynamicSize(80),
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

        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 20,
    },
    firstTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
        marginTop: 10,
    },
    image: {
        width: dimensions.fullWidth - dynamicSize(40),

        borderRadius: 20,
    },
    svgContainer: {
        position: 'absolute',
        top: -dynamicSize(-28),
        elevation: 10,
        right: 13,
    },
    ratingContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        gap:5
    
    }
});

export default KnowMoreModal;
