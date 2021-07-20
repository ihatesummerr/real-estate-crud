import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchEstate = (page) => API.get(`/estate?page=${page}`);
export const fetchEstateBySearch = (search) =>
    API.get(`/estate/search?t=${search || 'none'}`);
export const createEstate = (estate) => API.post('/estate', estate);
export const patchEstate = (id, estate) => API.patch(`/estate/${id}`, estate);
export const deleteEstate = (id) => API.delete(`/estate/${id}`);
