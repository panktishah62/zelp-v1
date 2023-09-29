import * as types from '../constants/index';

const initialState = {
    mealCount: 5
};

const menuDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SUBSCRIPTION_MEAL_NUMBER_INCREASED:
            return {
                mealCount: state.mealCount + 1
            }
        case types.SUBSCRIPTION_MEAL_NUMBER_DECREASED:
            return {
                mealCount: state.mealCount - 1
            }
        default:
            return state;
    }
};

export default menuDetailsReducer;
