import {  Navigate, Outlet } from 'react-router-dom'
import auth from './auth-helper'


const ProtectedRoute = () => {
  console.log(auth.isAuthenticated())
  if (!auth.isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet/>
};

export default ProtectedRoute
