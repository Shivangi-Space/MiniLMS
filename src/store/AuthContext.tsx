import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage, TOKEN_KEY } from '../utils/storage';
import apiClient from '../api/client';
import { useRouter, useSegments } from 'expo-router';

interface AuthContextType {
  user: any;
  token: string | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup && segments.length > 0) {
      router.replace('/(auth)/login');
    } else if (token && inAuthGroup) {
      router.replace('/(tabs)/home'); // We'll create tabs next
    }
  }, [token, segments, isLoading]);

  const checkLogin = async () => {
    try {
      const savedToken = await Storage.getItem(TOKEN_KEY);
      if (savedToken) {
        const response = await apiClient.get('/users/current-user');
        setUser(response.data.data);
        setToken(savedToken);
      }
    } catch (e) {
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (authData: any) => {
    setUser(authData.user);
    setToken(authData.accessToken);
    await Storage.setItem(TOKEN_KEY, authData.accessToken);
  };

  const logout = async () => {
    await Storage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};