import React from 'react';
import { useAuth } from '@modules/auth/context/AuthContext';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-l bg-secondary-1000 shadow border-solid border-b-emerald-100 ">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary-500">{title}</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-4 text-primary-100">Olá, {user?.firstName}</span>
          <button
            onClick={logout}
            className=" text-primary-400 font-bold py-1 px-3 text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};