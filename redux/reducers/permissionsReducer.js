import { DENIED, GRANTED } from '../../utils';
import { CHECK_LOCATION_PERMISSION, IS_LOCATION_ON } from '../constants';

const initialState = {
    locationPermission: DENIED,
    isLocationOn: true,
};

const permissionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_LOCATION_PERMISSION:
            return {
                ...state,
                locationPermission: action.payload,
            };
        case IS_LOCATION_ON:
            return {
                ...state,
                isLocationOn: action.payload,
            };
        default:
            return state;
    }
};

export default permissionsReducer;
