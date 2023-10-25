import {  SUBSCRIPTION_VEG_MENU_ONLY_TRUE,SUBSCRIPTION_VEG_MENU_ONLY_FALSE } from '../constants';

const initialState = {
   isVegButtonActive:false,
    
};

const vegbuttonActiveReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SUBSCRIPTION_VEG_MENU_ONLY_TRUE:
        return{
            ...state,
           isVegButtonActive:true
        }
        case SUBSCRIPTION_VEG_MENU_ONLY_FALSE:
            return{
                ...state,
                isVegButtonActive:false
            }
        default:
            return state;
    }
}
export default vegbuttonActiveReducer;
