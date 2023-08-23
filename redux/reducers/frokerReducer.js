import {
    SET_FOLLOWED_FROKER,
    REMOVE_FOLLOWED_FROKER,
    RESET_FOLLOWED_FROKER,
} from '../constants';

const initState = {
    followedFrokers: new Set(),
};

const followedFrokerReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_FOLLOWED_FROKER: {
            const updatedSet = state.followedFrokers;
            updatedSet.add(action.payload);
            return {
                ...state,

                followedFrokers: updatedSet,
            };
        }
        case REMOVE_FOLLOWED_FROKER: {
            const updatedSet = state.followedFrokers;
            updatedSet.delete(action.payload);
            return {
                ...state,

                followedFrokers: updatedSet,
            };
        }
        case RESET_FOLLOWED_FROKER:
            return {
                ...initState,
            };
        default:
            return state;
    }
};

export default followedFrokerReducer;
