import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../styles/colors';
import { dimensions } from '../../styles';
import { dynamicSize, normalizeFont } from '../../utils/responsive';
import { fonts } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
// import { setProgressBar } from '../../redux/actions/auction';
import { SCREEN_PROGRESS_CONSTANT } from '../../utils';

const StickyBottomButton = ({
    title,
    pressHandler,
    disabled = false,
    buttonWidth,
    buttonHeight,
    buttonColorDisabled,
    buttonColorEnabled,
    titileColor = colors.WHITE,
}) => {
    const dispatch = useDispatch();
    // const existingProgress = useSelector(state => state.auction.progressBar);
    const defaultColorEnabled = colors.ORANGE;
    const defaultColorDisabled = colors.ORANGE_GRADIENT_MEDIUM;
    const defaultHeight = dynamicSize(50);
    const defaultWidth = dimensions.fullWidth - dynamicSize(40);

    const onPressButton = () => {
        // dispatch(setProgressBar(existingProgress + SCREEN_PROGRESS_CONSTANT));
        pressHandler();
    };
    return (
        <TouchableOpacity
            onPress={onPressButton}
            activeOpacity={0.6}
            disabled={disabled}>
            <View
                style={
                    disabled
                        ? [
                              styles.disabled,
                              {
                                  backgroundColor: buttonColorDisabled
                                      ? buttonColorDisabled
                                      : defaultColorDisabled,
                                  width: buttonWidth
                                      ? buttonWidth
                                      : defaultWidth,
                                  height: buttonHeight
                                      ? buttonHeight
                                      : defaultHeight,
                              },
                          ]
                        : [
                              styles.Innercontainer,
                              {
                                  backgroundColor: buttonColorEnabled
                                      ? buttonColorEnabled
                                      : defaultColorEnabled,
                                  width: buttonWidth
                                      ? buttonWidth
                                      : defaultWidth,
                                  height: buttonHeight
                                      ? buttonHeight
                                      : defaultHeight,
                              },
                          ]
                }>
                <Text style={[styles.titleInner, { color: titileColor }]}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    disabled: {
        borderRadius: dynamicSize(42),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Innercontainer: {
        borderRadius: dynamicSize(42),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleInner: {
        // color: colors.WHITE,
        fontSize: normalizeFont(18),
        fontFamily: fonts.NUNITO_700_24.fontFamily,
    },
});

export default StickyBottomButton;