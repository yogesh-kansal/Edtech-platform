import {  Navigate } from 'react-router-dom'
import auth from './auth-helper'


const ProtectedRoute = ({ children }) => {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default ProtectedRoute
