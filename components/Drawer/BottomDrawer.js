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

export const BottomDrawer = props => {
    const { drawer } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(
        drawer?.isVisible,
    );

    const _hideDrawer = () => {
        setIsBottomSheetOpen(false);
        dispatch(hideDrawer());
    };

    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    const onClick = () => {
        _hideDrawer();
        navigation.navigate(drawer?.navigateTo);
    };

    return (
        drawer && (
            <Modal
                animationType="slide"
                transparent={true}
                visible={drawer?.isVisible}
                onRequestClose={_hideDrawer}>
                <View style={styles.bottomSheet}>
                    {/* // First Section of Bottom sheet with Header and close
                    button */}
                    <View style={styles.drawerHeader}>
                        <Text style={styles.drawerHeading}>
                            Start selling on Zelp
                        </Text>
                        <TouchableOpacity onPress={_hideDrawer}>
                            <CloseIcon height={12} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineBreak} />

                    <View style={[styles.buttonContainer]}>
                        <Button_ text={'Start a show'} onClick={onClick} />
                    </View>
                </View>
            </Modal>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineBreak: {
        height: 1,
        borderWidth: 0.75,
        borderColor: colors.GRAY_30,
        width: dimensions.fullWidth - dynamicSize(45),
        alignItems: 'center',
        margin: 15,
    },
    bottomSheet: {
        position: 'absolute',
        height: dimensions.fullHeight * 0.22,
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'red',
    },
    drawerHeader: {
        flex: 0,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    drawerHeading: {
        ...fonts.NUNITO_600_16,
        color: colors.BLACK,
    },
    buttonContainer: {
        backgroundColor: colors.WHITE,
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
});
