"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

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
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [logeado, setLogeado] = useState(false);
  console.log(logeado);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          "https://apiblog-01g5.onrender.com/api/auth/profile",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.validToken);
        setLogeado(true);
      } catch (error) {
        console.error("Error al verificar el usuario", error);
        setLogeado(false);
      }
    };
    verifyUser();
  }, [logeado]);

  const login = async (
    username: string,
    password: string
  ): Promise<Boolean> => {
    try {
      await axios.post(
        "https://apiblog-01g5.onrender.com/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      setLogeado(true);
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      return false;
    }
  };

  async function logout() {
    await axios.post("https://apiblog-01g5.onrender.com/api/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
    setLogeado(false);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};
