import {
    FETCH_ESTATE,
    CREATE_ESTATE,
    UPDATE_ESTATE,
    DELETE_ESTATE,
    FETCH_ESTATE_BY_SEARCH,
} from '../constants';
import * as api from '../api';

export const getEstate = (page) => async (dispatch) => {
    try {
        const { data } = await api.fetchEstate(page);
        dispatch({ type: FETCH_ESTATE, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const getEstateBySearch = (search) => async (dispatch) => {
    try {
        const { data } = await api.fetchEstateBySearch(search);
        dispatch({ type: FETCH_ESTATE_BY_SEARCH, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const createEstate = (estate) => async (dispatch) => {
    try {
        const { data } = await api.createEstate(estate);
        dispatch({ type: CREATE_ESTATE, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const updateEstate = (id, estate) => async (dispatch) => {
    try {
        const { data } = await api.patchEstate(id, estate);
        dispatch({ type: UPDATE_ESTATE, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const deleteEstate = (id) => async (dispatch) => {
    try {
        await api.deleteEstate(id);
        dispatch({ type: DELETE_ESTATE, payload: id });
    } catch (error) {
        console.error(error);
    }
};
