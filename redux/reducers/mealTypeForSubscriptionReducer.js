import { RESET_SUBSCRIPTION_MEAL_TYPE, SET_SUBSCRIPTION_MEAL_TYPE } from '../constants';

const initialState = {
 mealType:'Breakfast',
 mealPlanId:'',
 mealPlanTime:'',
};

const mealTypeForSubscriptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIPTION_MEAL_TYPE:
            return {
                ...state,
                mealType: action.payload.mealType,
                mealPlanId:action.payload.mealPlanId,
                mealPlanTime:action.payload.mealPlanTime,
            };
        case RESET_SUBSCRIPTION_MEAL_TYPE:
            return{
                ...initialState
            }
        default:
            return state;
    }
};

export default mealTypeForSubscriptionReducer;
