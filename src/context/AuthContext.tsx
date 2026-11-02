import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  loginAsDemoUser: () => Promise<void>;
  loginAsDemoAdmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rentease_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('rentease_token');
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Sync session on mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('rentease_token');
      if (storedToken) {
        try {
          const res = await authService.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('rentease_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out.');
          localStorage.removeItem('rentease_token');
          localStorage.removeItem('rentease_user');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await authService.login({ email, password });
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('rentease_token', res.token);
        localStorage.setItem('rentease_user', JSON.stringify(res.user));
        return { success: true };
      }
      return { success: false, message: res.message || 'Login failed.' };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password.';
      return { success: false, message: msg };
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
  }) => {
    try {
      const res = await authService.register(data);
      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('rentease_token', res.token);
        localStorage.setItem('rentease_user', JSON.stringify(res.user));
        return { success: true };
      }
      return { success: false, message: res.message || 'Registration failed.' };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed.';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem('rentease_token');
    localStorage.removeItem('rentease_user');
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const res = await authService.updateProfile(data);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('rentease_user', JSON.stringify(res.user));
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  const loginAsDemoUser = async () => {
    await login('john@example.com', 'User@123');
  };

  const loginAsDemoAdmin = async () => {
    await login('admin@rentease.com', 'Admin@123');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        loginAsDemoUser,
        loginAsDemoAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
