"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

type User = {
  id: string;
  role: string;
  username: string;
  picture?: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<Boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [logeado, setLogeado] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/profile', {
          withCredentials: true,
        });
        setUser(response.data.validToken);
      } catch (error) {
        console.error('Error al verificar el usuario', error);
      }
    };

    if (logeado === true) {
      verifyUser();
    } else {
      setLogeado(false);
    }
  }, [logeado]);

  const login = async (username: string, password: string): Promise<Boolean> => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { username, password }, { withCredentials: true, });

      const { token } = response.data;

      if (token) {
        setUser(response.data.user);
        Cookies.set('token', token, { expires: 7 });
      }
      setLogeado(true);

    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
    return true;

  }

  async function logout() {
    setUser(null);
    setLogeado(false);
    await axios.post("http://localhost:3001/api/auth/logout", { withCredentials: true, });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe estar dentro del proveedor AuthProvider');
  }
  return context;
};