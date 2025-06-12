import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Spinner from '../ui/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { userInfo, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <Spinner size="lg" />;
  }
  
  // If not logged in, redirect to login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  
  // If admin route but user is not admin, redirect to home
  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;