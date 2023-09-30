import { SUBSCRIPTION_ADD_TO_CART, SUBSCRIPTION_REMOVE_FROM_CART } from "../constants";

const initialState = {
  itemName: "",
  itemImage:"",
  itemId:"",
  itemType:"",//veg or nonveg
  itemCategory:"",//breakfast,lunch,dinner  
  typePng:"",//veg or nonveg
};

const subscriptionCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIPTION_ADD_TO_CART:
            return {
                ...state,
              itemName: action.payload.itemName,
                itemId:action.payload.itemId,
                itemType:action.payload.itemType,
                itemImage:action.payload.itemImage,
               
            };
        case SUBSCRIPTION_REMOVE_FROM_CART:
            return {
                ...initialState
            }
        default:
            return state;
    }
};

export default subscriptionCartReducer;
