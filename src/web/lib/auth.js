const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Authentication failed');
  }
  return response.json();
};

// Login user
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await handleResponse(response);
  
  if (data.token) {
    localStorage.setItem('token', data.token);
    return data;
  }
  
  throw new Error('Authentication failed');
};

// Register new user
export const register = async (email, password, name) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  });
  
  return handleResponse(response);
};

// Get current user from token
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return null;
  }
  
  try {
    // This is a simplified approach. In a real app, you might have a /me endpoint
    // or use JWT decode to extract user info from the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    localStorage.removeItem('token');
    return null;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
};