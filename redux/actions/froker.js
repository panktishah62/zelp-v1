import {
    REMOVE_FOLLOWED_FROKER,
    RESET_FOLLOWED_FROKER,
    SET_FOLLOWED_FROKER,
} from '../constants';

export const setFollowedFrokers = frokerId => {
    return {
        type: SET_FOLLOWED_FROKER,
        payload: frokerId,
    };
};

export const removeFollowedFrokers = frokerId => {
    return {
        type: REMOVE_FOLLOWED_FROKER,
        payload: frokerId,
    };
};

export const resetFollowedFroker = () => {
    return {
        type: RESET_FOLLOWED_FROKER,
    };
};
