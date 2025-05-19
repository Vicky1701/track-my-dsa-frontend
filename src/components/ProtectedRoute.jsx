// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  
  // If there's no authenticated user, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Otherwise, render the protected component
  return children;
}

export default ProtectedRoute;