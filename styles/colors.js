import { DefaultTheme } from 'react-native-paper';

export const colors = {
    ORANGE: '#FD7A33',
    ORANGE_LIGHT: 'rgba(255, 162, 84, 0.2)',
    BACKGROUND_WHITE: '#D9D9D9',
    BORDER_GREY: '#D9D9D9',
    WHITE: '#FFFFFF',
    GREY_LIGHT: '#F7F7F7',
    GREY_MEDIUM: '#2E3138',
    GREY_ICON: '#595959',
    BLACK: '#000000',
    ORANGE_GRADIENT_DARK: '#FD7A33',
    ORANGE_GRADIENT_LIGHT: '#F6FAFB',
    ORANGE_GRADIENT_MEDIUM: 'rgba(253, 122, 51, 0.4)',
    GREY_MEDIUM: '#827C75',
    GREY_DARK: '#666666',
    GREY_BORDER: '#D0D5DD',
    BLUE_DARK: '#407AD1',
    BLUE_LIGHT: '#00BAF2',
    YELLOW: '#FCEA2B',
    YELLOW_MUSTARD: '#F4AA41',
    YELLOW_MEDIUM: '#ECD92D',
    GREEN: '#3F731D',
    RED: '#D22F27',
    VEG_GREEN: '#44AB18',
    NONVEG_RED: '#FE0700',
    SUCCESS_GREEN: '#5C9E31',
    FAILED_RED: '#DC3B30',
    WHATSAPP_GREEN: '#25D366',
    WARNING_YELLOW: '#FFCC00',
};

export const theme = {
    ...DefaultTheme,
    ...DefaultTheme.colors,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.ORANGE,
        secondary: colors.WHITE,
    },
};
