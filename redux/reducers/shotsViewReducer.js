import { IS_SWIPED, UPDATE_SHOTS_VIEW } from '../constants';

const initialState = {
    swiped: false,
};

const shotsViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_SWIPED:
            return {
                ...state,
                swiped: action?.payload?.swiped,
            };
        default:
            return state;
    }
};

export default shotsViewReducer;
