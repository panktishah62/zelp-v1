import { SUBSCRIPTION_SELECT_MENU_ITEM,SUBSCRIPTION_RESET_SELECT_MENU_ITEM } from "../constants";

export const selectMenu=(index,componentName)=>{
    console.log({index,componentName})
    return async dispatch=>{
        dispatch({
            type:SUBSCRIPTION_SELECT_MENU_ITEM,
            payload:{
                index:index,
                componentName:componentName
            }
        })
    }
}

export const resetSelectionButton=()=>{
    return async dispatch=>{
        dispatch({
            type:SUBSCRIPTION_RESET_SELECT_MENU_ITEM
        })
    }
}