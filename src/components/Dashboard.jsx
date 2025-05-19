// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="container dashboard">
      <h1>Welcome to Your Dashboard</h1>
      
      <div className="user-info">
        <p><strong>Email:</strong> {currentUser?.email}</p>
      </div>
      
      <button 
        onClick={handleLogout} 
        className="btn btn-primary" 
        style={{ marginTop: '20px' }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;