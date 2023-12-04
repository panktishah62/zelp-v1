import { HIDE_DRAWER, SHOW_DRAWER } from '../constants';

const initialState = {
    isVisible: '',
    navigateTo: '',
    // isVisible: false,
    // titleText: '',
    // titleContainerStyles: {},
    // subTitleText: '',
    // subTitleTextLine2: '',
    // buttonText1: '',
    // buttonText2: '',
    // buttonFunction1: '',
    // buttonFunction2: '',
    // titleTextStyles: {},
    // subTitleTextStyles: {},
    // subTitleTextLine2Styles: {},
    // type: DialogTypes.DEFAULT,
    // iconAroundTitle: '',
    // iconAroundTitleStyles: {},
};

const drawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_DRAWER:
            return {
                ...action.payload,
            };
        case HIDE_DRAWER:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default drawerReducer;
