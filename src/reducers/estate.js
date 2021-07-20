import {
    FETCH_ESTATE,
    CREATE_ESTATE,
    UPDATE_ESTATE,
    DELETE_ESTATE,
    FETCH_ESTATE_BY_SEARCH,
} from '../constants';

export default (state = { data: [] }, action) => {
    switch (action.type) {
        case FETCH_ESTATE:
            return {
                ...state,
                data: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_ESTATE_BY_SEARCH:
            return {
                ...state,
                data: action.payload,
            };
        case CREATE_ESTATE:
            return { ...state, data: [...state.data, action.payload] };
        case UPDATE_ESTATE:
            return {
                ...state,
                data: state.data.map((estate) =>
                    estate._id === action.payload._id ? action.payload : estate
                ),
            };
        case DELETE_ESTATE:
            return {
                ...state,
                data: state.data.filter(
                    (estate) => estate._id !== action.payload
                ),
            };
        default:
            return state;
    }
};
