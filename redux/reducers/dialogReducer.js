import { DialogTypes } from '../../utils';
import { HIDE_DIALOG, SHOW_DIALOG } from '../constants';

const initialState = {
    isVisible: false,
    titleText: '',
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
};

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_DIALOG:
            return {
                ...action.payload,
            };
        case HIDE_DIALOG:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default dialogReducer;
