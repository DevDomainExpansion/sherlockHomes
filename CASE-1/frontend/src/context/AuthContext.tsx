import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, AuthResponse, LoginRequest, RegisterRequest } from '../api/client';

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'sherlock_token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setToken(stored);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [token]);

  const login = async (payload: LoginRequest) => {
    const res: AuthResponse = await api.login(payload);
    setToken(res.token);
  };

  const register = async (payload: RegisterRequest) => {
    const res: AuthResponse = await api.register(payload);
    setToken(res.token);
  };

  const logout = () => setToken(null);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

