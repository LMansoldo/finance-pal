import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthContext';
import { PrivateRoute } from './shared/components/PrivateRoute';

const LoginPage = lazy(() => import('./pages/login/LoginPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-xl text-gray-600">Carregando...</div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<></>} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <></>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/detail/:id" 
              element={
                <PrivateRoute>
                  <></>
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;