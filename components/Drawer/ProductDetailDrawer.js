import { useState } from 'react';
import {
    Image,
    Modal,
    View,
    Button,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { dimensions } from '../../styles';
import { colors } from '../../styles/colors';
import { Button_ } from '../Buttons/Button';
import { fonts } from '../../styles';
import CloseIcon from '../../assets/icons/closeIcon.svg';
import { dynamicSize } from '../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from '../../redux/actions/drawer';
import { useNavigation } from '@react-navigation/native';
import StickyBottomButton from '../Buttons/StickyBottomButton';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import TextInput_ from '../Inputs/TextInput';
import CrossIcon from '../../assets/ZelpIcons/CrossIcon.svg';

const buyerAgreement = [
    {
        guideline: 'Bids are binding and cannot be cancelled.',
    },
    {
        guideline:
            'Zelp will refund your amount if your purchase does not go as expected.',
    },
    {
        guideline:
            'You need to make the payment in 2 hours of the bid won, to confirm the order.',
    },
    {
        guideline: 'You agree to our community guidelines and terms of service',
    },
];

export const ProductDetailDrawer = props => {
    const { isvisible } = props;
    const navigation = useNavigation();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

    const _hideDrawer = () => {
        setIsBottomSheetOpen(false);
    };

    const onClick = () => {
        _hideDrawer();
        // navigation.navigate(drawer?.navigateTo);
    };

    const RenderGuidelines = ({ item, index }) => {
        return (
            <View style={styles.guidelineContainer}>
                <BouncyCheckbox
                    size={25}
                    fillColor={colors.GREY_DARK}
                    unfillColor={colors.WHITE}
                    innerIconStyle={{ borderWidth: 0 }}
                    // onPress={(isChecked: boolean) => {}}
                />
                <Text style={styles.guideDesc}>{item.guideline}</Text>
            </View>
        );
    };

    return (
        // drawer && (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isBottomSheetOpen}
            onRequestClose={_hideDrawer}
        >
            <View style={styles.bottomSheet}>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeading}>
                        Please enter details of the product you are about to
                        sell.
                    </Text>
                    <TouchableOpacity
                        onPress={_hideDrawer}
                        style={styles.closeDrawer}>
                        <CrossIcon height={12} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.header2}>
                    Please make sure the product to be sold belongs to the same
                    category as that of the auction.
                </Text>

                <TextInput_
                    // text={addressDetails.line1}
                    // setText={value =>
                    //     setAddressDetails({
                    //         ...addressDetails,
                    //         line1: value,
                    //     })
                    // }
                    focused={true}
                    setFocus={() => setFocus(1)}
                    setBlur={() => setBlur()}
                    placeholder={'Product name'}
                />
                <TextInput_
                    // text={addressDetails.line1}
                    // setText={value =>
                    //     setAddressDetails({
                    //         ...addressDetails,
                    //         line1: value,
                    //     })
                    // }
                    focused={true}
                    setFocus={() => setFocus(1)}
                    setBlur={() => setBlur()}
                    placeholder={'Minimum Selling Price'}
                />
                <Text style={styles.cautionText}>
                    Note that you will not able to change the selling price,
                    once the auction starts. We encourage you to keep the
                    selling price low to attract more bidders.
                </Text>

                {/* <View style={styles.innerGuideContainer}>
                    {buyerAgreement &&
                        buyerAgreement.map((guideline, index) => {
                            return (
                                <RenderGuidelines
                                    item={guideline}
                                    key={index}
                                />
                            );
                        })}
                </View> */}

                <View style={styles.buttonContainer}>
                    <StickyBottomButton
                        title={'Got it !'}
                        pressHandler={onClick}
                        buttonHeight={dynamicSize(40)}
                        buttonWidth={dimensions.fullWidth * 0.9}
                        buttonColorEnabled={colors.WHITE}
                        titileColor={colors.BLACK}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheet: {
        position: 'absolute',
        height: dimensions.fullHeight * 0.8,
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: colors.BLACK,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    closeDrawer: {
        position: 'absolute',
        right: dynamicSize(-20),
        top: dynamicSize(-10),
    },
    drawerHeader: {
        flex: 0,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    drawerHeading: {
        ...fonts.NUNITO_700_24,
        color: colors.WHITE,
        alignItems: 'flex-start',
    },
    header2: {
        ...fonts.NUNITO_500_16,
        color: colors.GRAY_30,
        marginTop: dynamicSize(30),
        marginBottom: dynamicSize(10),
    },
    cautionText: {
        ...fonts.NUNITO_500_14,
        color: colors.WHITE,
        // marginTop: dynamicSize(30),
        marginBottom: dynamicSize(30),
    },
    buttonContainer: {
        width: dimensions.fullWidth,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        shadowColor: colors.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 8,
        padding: 20,
    },

    guideDesc: {
        ...fonts.NUNITO_500_14,
        color: colors.WHITE,
    },
    guidelineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: dynamicSize(20),
    },
});
