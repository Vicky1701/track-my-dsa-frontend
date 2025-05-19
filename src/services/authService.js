// src/services/authService.js
// Real authentication service that makes API calls to Spring Boot backend

// API base URL - replace with your actual backend URL
const API_URL = 'http://localhost:8080/api/auth';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // If response is not 2xx, throw an error with the message from the backend
    const error = (data && data.message) || response.statusText;
    throw new Error(error);
  }
  
  return data;
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await handleResponse(response);
    
    // Data should contain user info and JWT token from backend
    return data;
  } catch (error) {
    throw error;
  }
};

// Register function
export const register = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await handleResponse(response);
    
    // Data should contain user info and JWT token from backend
    return data;
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    // If your backend requires a logout endpoint, use this:
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
    }
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Even if the API call fails, we still want to clear local storage
    return true;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  if (!user) return false;
  
  // Check if token is expired (if your JWT contains expiration)
  // This is a basic example - in a real app, you might want to decode the JWT
  // and check the expiration time
  
  return true;
};