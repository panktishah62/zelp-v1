import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../styles/colors';
import { dimensions } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { fonts } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setProgressBar } from '../../redux/actions/auction';
import { SCREEN_PROGRESS_CONSTANT } from '../../utils';

const StickyBottomButton = ({ title, pressHandler, disabled = false }) => {
    const dispatch = useDispatch();
    const existingProgress = useSelector(state => state.auction.progressBar);

    const onPressButton = () => {
        dispatch(setProgressBar(existingProgress + SCREEN_PROGRESS_CONSTANT));
        pressHandler();
    };
    return (
        <TouchableOpacity onPress={onPressButton} activeOpacity={0.6} disabled={disabled}>
            <View style={disabled ? styles.disabled : styles.Innercontainer}>
                <Text style={styles.titleInner}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    disabled: {
        backgroundColor: colors.ORANGE_GRADIENT_MEDIUM,
        height: dynamicSize(50),
        width: dimensions.fullWidth - dynamicSize(40),
        borderRadius: dynamicSize(42),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Innercontainer: {
        backgroundColor: colors.ORANGE,
        height: dynamicSize(50),
        width: dimensions.fullWidth - dynamicSize(40),
        borderRadius: dynamicSize(42),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleInner: {
        color: colors.WHITE,
        fontSize: normalizeFont(18),
        fontFamily: fonts.NUNITO_700_24.fontFamily,
    },
});

export default StickyBottomButton;
