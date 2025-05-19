import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register, logout } from '../services/authService';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for saved user in localStorage when app loads
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const userLogin = async (email, password) => {
    setError('');
    try {
      const user = await login(email, password);
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Register function
  const userRegister = async (email, password) => {
    setError('');
    try {
      const user = await register(email, password);
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const userLogout = () => {
    logout();
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login: userLogin,
    register: userRegister,
    logout: userLogout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};