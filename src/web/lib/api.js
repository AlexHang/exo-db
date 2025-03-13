const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
};

// Get all exoplanets
export const getExoplanets = async () => {
  const response = await fetch(`${API_URL}/exoplanets`);
  return handleResponse(response);
};

export const getExoplanetById = async (id) => {
    const response = await fetch(`${API_URL}/exoplanets/${id}`);
    return handleResponse(response);
  };
  
  // Create new exoplanet
  export const createExoplanet = async (exoplanetData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/exoplanets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(exoplanetData)
    });
    
    return handleResponse(response);
  };
  
  // Update exoplanet
  export const updateExoplanet = async (id, exoplanetData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/exoplanets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(exoplanetData)
    });
    
    return handleResponse(response);
  };

  export const deleteExoplanet = async (id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/exoplanets/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete exoplanet');
    }
    
    return true;
  };