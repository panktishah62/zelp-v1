import * as types from '../constants/index';

const initialState = {
    catagoryId: -1,
    catagoryName: "",
    foodItem: 0
};

const menuModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MENU_MODAL:
            return{
                catagoryId: action.payload.id,
                catagoryName: action.payload.text,
                foodItem: action.payload.number
            }
        default:
            return state;
    }
};

export default menuModalReducer;
