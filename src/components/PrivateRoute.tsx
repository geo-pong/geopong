import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'

const PrivateRoute: React.FC = () => {
  const [{ jwt }] = useAuth();

  return jwt ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

