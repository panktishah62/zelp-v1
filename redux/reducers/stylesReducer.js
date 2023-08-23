import { SET_HEADER_WITH_LOCATION_HEIGHT } from '../constants';

const initialState = {
    headerWithLocationHeight: 0,
};

const stylesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HEADER_WITH_LOCATION_HEIGHT:
            return {
                headerWithLocationHeight: action.payload,
            };
        default:
            return state;
    }
};

export default stylesReducer;
