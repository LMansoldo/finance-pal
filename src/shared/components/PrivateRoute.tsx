import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@modules/auth/context/AuthContext';
import { Header } from '@shared/components/Header/Header';
import { Footer } from '@shared/components/Footer/Footer';
import { LoadingSpinner } from '@shared/components/LoadingSpinner/LoadingSpinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>
    <Header title="Finance Pal" />
    {children}
    <Footer />
  </>;
};