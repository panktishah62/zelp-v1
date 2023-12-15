import { DialogTypes } from '../../utils';
import {
    HIDE_DIALOG,
    IS_DIALOG_DISMISSABLE,
    SHOW_DIALOG,
    VIBRATE_DIALOG,
} from '../constants';

const initialState = {
    isVisible: false,
    titleText: '',
    titleContainerStyles: {},
    subTitleText: '',
    subTitleTextLine2: '',
    buttonText1: '',
    buttonText2: '',
    buttonFunction1: '',
    buttonFunction2: '',
    titleTextStyles: {},
    subTitleTextStyles: {},
    subTitleTextLine2Styles: {},
    type: DialogTypes.DEFAULT,
    iconAroundTitle: '',
    iconAroundTitleStyles: {},
    dismissable: true,
    vibrate: false,
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_DIALOG:
            return {
                dismissable: true,
                ...action.payload,
            };
        case HIDE_DIALOG:
            return {
                ...initialState,
            };
        case IS_DIALOG_DISMISSABLE:
            return {
                ...state,
                dismissable: action.payload,
                isVisible: false,
            };
        case VIBRATE_DIALOG:
            return {
                ...state,
                vibrate: action.payload,
            };
        default:
            return state;
    }
};

export default dialogReducer;
