import { SUBSCRIPTION_RESET_SELECT_MENU_ITEM, SUBSCRIPTION_SELECT_MENU_ITEM } from '../constants';

const initialState = {
    index:-1,
    componentName:"",
    isSelectedAny:false,
    
};

const selectSubscriptionMenuReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SUBSCRIPTION_SELECT_MENU_ITEM:
        return{
            ...state,
            index:action.payload.index,
            isSelectedAny:true,
            componentName:action.payload.componentName
        }
        case SUBSCRIPTION_RESET_SELECT_MENU_ITEM:
            return{
                ...initialState
            }

        default:
            return state;
    }
};

export default selectSubscriptionMenuReducer;
