import React, { createContext, useContext, useState, useEffect } from 'react';
import { authRepository } from '@modules/auth/repositories/authRepository';
import { User } from '@shared/types/User';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (user: User) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (authRepository.isAuthenticated()) {
      setUser(authRepository.getCurrentUser());
      setIsAuthenticated(true);
    }
    
    const interval = setInterval(() => {
      if (!authRepository.isAuthenticated()) {
        setUser(null);
        setIsAuthenticated(false);
      } else {
        authRepository.refreshSession();
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const login = (email: string, password: string): boolean => {
    const loggedUser = authRepository.login(email, password);
    if (loggedUser) {
      setUser(loggedUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = (newUser: User): boolean => {
    try {
      authRepository.register(newUser);
      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };

  const logout = (): void => {
    authRepository.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};