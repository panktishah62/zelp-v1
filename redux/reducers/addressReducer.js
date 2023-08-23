import {
    ADD_ADDRESS,
    EDIT_ADDRESS,
    GET_ALL_ADDRESS,
    SET_DEFAULT_ADDRESS,
    UNSET_DEFAULT_ADDRESS,
    GET_DEFAULT_ADDRESS,
    GET_LIVE_LOCATION,
    FETCH_DATA_FAILURE,
    GET_LOCATION_FAILURE,
    GET_LOCATION_REQUEST,
    GET_LOCATION_SUCCESS,
    DELETE_ADDRESS,
    RESET_ADDRESS,
    FETCH_DATA_FAILURE_ADDRESS,
    RESET_ADDRESS_ERROR,
} from '../constants';

const initialState = {
    addresses: [],
    defaultAddress: '',
    location: null,
    googleMapsLink: null,
    area: null,
    loading: false,
    error: '',
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return {
                ...state,
                addresses: action.payload,
                error: '',
            };
        case EDIT_ADDRESS:
            return {
                ...state,
                addresses: action.payload,
                error: '',
            };
        case GET_ALL_ADDRESS:
            return {
                ...state,
                addresses: action.payload,
                error: '',
            };
        case SET_DEFAULT_ADDRESS:
            return {
                ...state,
                loading: false,
                error: '',
                googleMapsLink: action.payload.googleMapsLink,
                area: action.payload.area,
                location: action.payload.location,
                defaultAddress: action.payload.defaultAddress,
                addresses: action.payload.addresses,
            };
        case UNSET_DEFAULT_ADDRESS:
            return {
                ...state,
                addresses: action.payload.addresses,
                defaultAddress: '',
                error: '',
            };
        case GET_LOCATION_SUCCESS:
            return {
                ...state,
                location: action.payload.location,
                googleMapsLink: action.payload.googleMapsLink,
                area: action.payload.area,
                loading: false,
                error: '',
            };
        case GET_DEFAULT_ADDRESS:
            return {
                ...state,
                defaultAddress: action.payload.defaultAddress,
                location: action.payload.location,
                googleMapsLink: action.payload.googleMapsLink,
                area: action.payload.area,
                loading: false,
                error: '',
            };
        case DELETE_ADDRESS:
            return {
                ...state,
                addresses: action.payload,
                error: '',
            };
        case GET_LIVE_LOCATION:
            return {
                ...state,
                defaultAddress: action.payload,
                error: '',
            };
        case GET_LOCATION_REQUEST:
            return { ...state, loading: true, error: '' };
        case GET_LOCATION_FAILURE:
            return {
                ...initialState,
                error: action.payload,
            };
        case FETCH_DATA_FAILURE_ADDRESS:
            return {
                ...initialState,
                error: action.payload,
            };
        case RESET_ADDRESS:
            return {
                ...initialState,
            };
        case RESET_ADDRESS_ERROR: {
            return {
                ...state,
                error: '',
            };
        }
        default:
            return state;
    }
};

export default addressReducer;
