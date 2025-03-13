import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

export const fetchExoplanets = async () => {
  try {
    const response = await api.get('/exoplanets');
    return response.data;
  } catch (error) {
    console.error('Error fetching exoplanets:', error);
    throw error;
  }
};

export const fetchExoplanetById = async (id) => {
  try {
    const response = await api.get(`/exoplanets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exoplanet with id ${id}:`, error);
    throw error;
  }
};

export const createExoplanet = async (exoplanetData) => {
  try {
    const response = await api.post('/exoplanets', exoplanetData);
    return response.data;
  } catch (error) {
    console.error('Error creating exoplanet:', error);
    throw error;
  }
};

export const updateExoplanet = async (id, exoplanetData) => {
  try {
    const response = await api.put(`/exoplanets/${id}`, exoplanetData);
    return response.data;
  } catch (error) {
    console.error(`Error updating exoplanet with id ${id}:`, error);
    throw error;
  }
};

export const deleteExoplanet = async (id) => {
  try {
    const response = await api.delete(`/exoplanets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting exoplanet with id ${id}:`, error);
    throw error;
  }
};
