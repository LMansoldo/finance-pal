import React, { createContext, useContext, useState, useEffect } from 'react';
import { authRepository } from '@modules/auth/repositories/authRepository';
import { AuthContextData, User } from '@modules/auth/types/User.type';
import { Messages } from '@shared/constants/messages';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAndUpdateAuthStatus = () => {
    const isAuth = authRepository.isAuthenticated();
    
    if (!isAuth) {
      setUser(null);
      setIsAuthenticated(false);
    } else {
      const currentUser = authRepository.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
      authRepository.refreshSession();
    }
  };

  useEffect(() => {
    checkAndUpdateAuthStatus();
    setLoading(false);
    
    const interval = setInterval(() => {
      checkAndUpdateAuthStatus();
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
      console.error(Messages.REGISTER_ERROR_MESSAGE, error);
      return false;
    }
  };

  const logout = (): void => {
    authRepository.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};
