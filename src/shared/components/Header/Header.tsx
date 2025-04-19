// src/components/layout/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@modules/auth/context/AuthContext';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-primary-900 shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={() => navigate('/')}
              className="mr-4 bg-secondary-200 hover:bg-secondary-300 text-secondary-800 font-bold py-1 px-3 rounded text-sm"
            >
              ← Voltar
            </button>
          )}
          <h1 className="text-2xl font-bold text-secondary-100">{title}</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-secondary-200">Olá, {user?.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};