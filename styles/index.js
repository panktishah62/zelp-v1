import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors } from './colors';
import { TAB_BAR_HEIGHT } from '../redux/constants';
import { dynamicSize } from '../utils/responsive';

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width,
};

export const fonts = StyleSheet.create({
    NUNITO_800_14: {
        fontFamily: 'Nunito-ExtraBold',
        fontWeight: '800',
        fontSize: 14,
    },
    NUNITO_800_12: {
        fontFamily: 'Nunito-ExtraBold',
        fontWeight: '800',
        fontSize: 12,
    },
    NUNITO_800_18: {
        fontFamily: 'Nunito-ExtraBold',
        fontWeight: '800',
        fontSize: 18,
    },
    NUNITO_800_10: {
        fontFamily: 'Nunito-ExtraBold',
        fontWeight: '800',
        fontSize: 10,
    },
    NUNITO_800_8: {
        fontFamily: 'Nunito-ExtraBold',
        fontWeight: '800',
        fontSize: 8,
    },
    NUNITO_800_6: {
        fontFamily: 'Nunito-ExtraBold',
        fontWeight: '800',
        fontSize: 6,
    },
    NUNITO_700_24: {
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
        fontSize: 24,
    },
    NUNITO_700_16: {
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
        fontSize: 16,
    },
    NUNITO_700_14: {
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
        fontSize: 14,
    },
    NUNITO_700_10: {
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
        fontSize: 10,
    },
    NUNITO_700_12: {
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
        fontSize: 12,
    },
    NUNITO_700_18: {
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
        fontSize: 18,
    },
    NUNITO_700_12_ITALIC: {
        fontFamily: 'Nunito-BoldItalic',
        fontWeight: '700',
        fontSize: 12,
    },
    NUNITO_700_8: {
        fontFamily: 'Nunito-Bold',
        fontWeight: '700',
        fontSize: 8,
    },
    NUNITO_600_20: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '800',
        fontSize: 20,
    },
    NUNITO_600_16: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '600',
        fontSize: 16,
    },
    NUNITO_600_14: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '600',
        fontSize: 14,
    },
    NUNITO_600_12: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '600',
        fontSize: 12,
    },
    NUNITO_600_10: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '600',
        fontSize: 10,
    },
    NUNITO_600_8: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '600',
        fontSize: 8,
    },
    NUNITO_600_6: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '600',
        fontSize: 6,
    },
    NUNITO_500_24: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '500',
        fontSize: 24,
    },
    NUNITO_800_28: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '800',
        fontSize: 28,
    },
    NUNITO_800_36: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '800',
        fontSize: 36,
    },
    NUNITO_500_16: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '500',
        fontSize: 16,
    },
    NUNITO_500_14: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '500',
        fontSize: 14,
    },
    NUNITO_500_12: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '500',
        fontSize: 12,
    },
    NUNITO_500_10: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '500',
        fontSize: 10,
    },
    NUNITO_500_8: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '500',
        fontSize: 8,
    },
    NUNITO_500_6: {
        fontFamily: 'Nunito-Medium',
        fontWeight: '500',
        fontSize: 6,
    },
    NUNITO_400_14: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 14,
    },
    NUNITO_400_8: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',
        fontSize: 8,
    },
    INTER_700_12: {
        fontFamily: 'Inter-Bold',
        fontWeight: '700',
        fontSize: 12,
    },
    INTER_700_16: {
        fontFamily: 'Inter-Bold',
        fontWeight: '700',
        fontSize: 16,
    },
    INTER_600_12: {
        fontFamily: 'Inter-SemiBold',
        fontWeight: '600',
        fontSize: 12,
    },
    INTER_600_10: {
        fontFamily: 'Inter-SemiBold',
        fontWeight: '600',
        fontSize: 10,
    },
    INTER_600_8: {
        fontFamily: 'Inter-SemiBold',
        fontWeight: '600',
        fontSize: 8,
    },
    INTER_500_16: {
        fontFamily: 'Inter-Regular',
        fontWeight: '500',
        fontSize: 16,
    },
    INTER_500_14: {
        fontFamily: 'Inter-Regular',
        fontWeight: '500',
        fontSize: 14,
    },
    INTER_400_12: {
        fontFamily: 'Inter-Regular',
        fontWeight: '400',
        fontSize: 12,
    },
    INTER_400_14: {
        fontFamily: 'Inter-Regular',
        fontWeight: '400',
        fontSize: 14,
    },
    POPPINS_500_11: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        fontSize: 11,
    },
    POPPINS_500_12: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        fontSize: 12,
    },
    POPPINS_500_18: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        fontSize: 18,
    },
    POPPINS_400_12: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 12,
    },
    POPPINS_400_16: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 16,
    },
    POPPINS_500_12: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        fontSize: 12,
    },
    POPPINS_500_14: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        fontSize: 14,
    },
    POPPINS_500_16: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        fontSize: 16,
    },
    POPPINS_600_12: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 12,
    },
    POPPINS_600_14: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 14,
    },
    POPPINS_600_16: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 16,
    },
    POPPINS_800_12: {
        fontFamily: 'Poppins-Medium',
        fontWeight: '500',
        fontSize: 16,
    },
    POPPINS_700_16: {
        fontFamily: 'Poppins-Bold',
        fontWeight: '700',
        fontSize: 16,
    },
    POPPINS_700_18: {
        fontFamily: 'Poppins-Bold',
        fontWeight: '700',
        fontSize: 18,
    },
});

export const Styles = StyleSheet.create({
    tabIconActive: {
        color: colors.ORANGE,
    },
    tabIconInActive: {
        color: colors.BLACK,
    },
    tabBarStyle: {
        height: TAB_BAR_HEIGHT,
        paddingTop: dynamicSize(15),
        borderTopWidth: 0,
        // color: colors.BLUE_DARK,
        // backgroundColor: colors.DARKER_GRAY
    },
    tabBarLabelStyle: {
        paddingVertical: dynamicSize(10),
        ...Platform.select({
            ios: {
                ...fonts.NUNITO_600_10,
            },
            android: {
                ...fonts.NUNITO_600_12,
            },
        }),
    },
    center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row_space_between: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row_space_around: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    row_flex_start: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    row_flex_end: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    row_space_evenly: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    margin_05: {
        margin: 5,
    },
    margin_10: {
        margin: 10,
    },
    margin_20: {
        margin: 20,
    },
    margin_30: {
        margin: 25,
    },
    margin_40: {
        margin: 25,
    },
    margin_50: {
        margin: 25,
    },
    margin_60: {
        margin: 25,
    },
    margin_70: {
        margin: 25,
    },
    height_01: {
        height: dimensions.fullHeight * 0.1,
    },
    height_015: {
        height: dimensions.fullHeight * 0.15,
    },
    height_02: {
        height: dimensions.fullHeight * 0.2,
    },
    height_03: {
        height: dimensions.fullHeight * 0.3,
    },
    height_04: {
        height: dimensions.fullHeight * 0.4,
    },
    height_05: {
        height: dimensions.fullHeight * 0.5,
    },
    height_06: {
        height: dimensions.fullHeight * 0.6,
    },
    height_07: {
        height: dimensions.fullHeight * 0.7,
    },
    height_08: {
        height: dimensions.fullHeight * 0.8,
    },
    height_09: {
        height: dimensions.fullHeight * 0.9,
    },
    height_full: {
        height: dimensions.fullHeight,
    },
    bottom_01: {
        position: 'absolute',
        bottom: 10,
    },
    bottom_02: {
        position: 'absolute',
        bottom: 20,
    },
    bottom_03: {
        position: 'absolute',
        bottom: 30,
    },
    width_full_02: {
        width: dimensions.fullWidth * 0.2,
    },
    width_full_03: {
        width: dimensions.fullWidth * 0.3,
    },
    width_full_04: {
        width: dimensions.fullWidth * 0.4,
    },
    width_full_05: {
        width: dimensions.fullWidth * 0.5,
    },
    width_full_06: {
        width: dimensions.fullWidth * 0.6,
    },
    width_full_07: {
        width: dimensions.fullWidth * 0.7,
    },
    width_full_08: {
        width: dimensions.fullWidth * 0.8,
    },
    width_full_09: {
        width: dimensions.fullWidth * 0.9,
    },
    width_full: {
        width: dimensions.fullWidth,
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    default_text_color: {
        color: colors.BLACK,
    },
    toggleSwitch: {
        ...Platform.select({
            ios: {
                transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
            },
        }),
    },
    textAlignCenter: {
        textAlign: 'center',
    },
});
