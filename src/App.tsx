import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthContext';
import { PrivateRoute } from './shared/components/PrivateRoute';
import { LoadingSpinner } from './shared/components/LoadingSpinner/LoadingSpinner';

const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/register/RegisterPage'));
const HomePage = lazy(() => import('./pages/home/HomePage'));
const DetailPage = lazy(() => import('./pages/detail/DetailPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-secondary-900">
    <div className="text-xl text-secondary-600"><LoadingSpinner /></div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/detail/:id" 
              element={
                <PrivateRoute>
                  <DetailPage />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;