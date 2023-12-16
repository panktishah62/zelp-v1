import { DENIED, GRANTED } from '../../utils';
import {
    CHECK_LOCATION_PERMISSION,
    IS_GPS_ON,
    IS_LOCATION_ON,
} from '../constants';

const initialState = {
    locationPermission: DENIED,
    isLocationOn: true,
    isGPSOn: true,
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
        case IS_GPS_ON:
            return {
                ...state,
                isGPSOn: action.payload,
            };
        default:
            return state;
    }
};

export default permissionsReducer;
