// src/services/apiService.js
// This service handles all API calls to the backend other than authentication

// API base URL - replace with your actual backend URL
const API_URL = 'http://localhost:8080/api';

// Helper function to get auth header
const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.token) {
    return { 'Authorization': `Bearer ${user.token}` };
  } else {
    return {};
  }
};

// Helper function to handle responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // For 401 Unauthorized, clear local storage and trigger logout
    if (response.status === 401) {
      localStorage.removeItem('user');
      // You might want to redirect to login page or trigger some event
    }
    
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }
  
  return data;
};

// Generic GET request
export const get = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Generic POST request
export const post = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify(data)
    });
    
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Generic PUT request
export const put = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      },
      body: JSON.stringify(data)
    });
    
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Generic DELETE request
export const del = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });
    
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};