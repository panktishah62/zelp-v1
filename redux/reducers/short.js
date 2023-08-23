import { SHORTS, SHORTS_SUCCESS, SHORTS_FAIL } from '../constants';

const initState = {
    shorts_data: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        /**
         * Shorts
         */
        case SHORTS: {
            return {
                ...state,

                shorts_data: {},
            };
        }
        case SHORTS_FAIL: {
            return {
                ...state,

                shorts_data: '',
            };
        }
        case SHORTS_SUCCESS: {
            return {
                ...state,
                shorts_data: [],
            };
        }
        default:
            return state;
    }
};
