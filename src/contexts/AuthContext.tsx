import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('jobsio_token');
    const userData = localStorage.getItem('jobsio_user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('jobsio_token');
        localStorage.removeItem('jobsio_user');
      }
    }
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name: email.includes('@') ? email.split('@')[0] : email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
      };
      
      const token = 'demo_jwt_token_' + Date.now();
      
      if (rememberMe) {
        localStorage.setItem('jobsio_token', token);
        localStorage.setItem('jobsio_user', JSON.stringify(user));
      }
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
      
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password.length >= 6) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
      };
      
      const token = 'demo_jwt_token_' + Date.now();
      
      localStorage.setItem('jobsio_token', token);
      localStorage.setItem('jobsio_user', JSON.stringify(user));
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
      });
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('jobsio_token');
    localStorage.removeItem('jobsio_user');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
