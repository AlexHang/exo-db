const API_BASE_URL = 'https://exo-db-production.up.railway.app/api';

export const apiService = {
    getAllPlanets: async () => {
        const response = await fetch(`${API_BASE_URL}/exoplanets`);
        return response.json();
    },

    getPlanetById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/exoplanets/${id}`);
        return response.json();
    },

    createPlanet: async (planetData) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/exoplanets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(planetData),
        });
        return response.json();
    },

    // Auth
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    }
};
