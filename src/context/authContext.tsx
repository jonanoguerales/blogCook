"use client";
import React, { useState, createContext, useContext, useEffect, ReactNode } from "react";
import axios from "axios";

type User = {
  id: string,
  role: string,
  username: string,
};

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/profile", {
          withCredentials: true,
        });
        if (response.data.validToken) {
          setUser(response.data.validToken);
        } else {
          console.error("Error al obtener el perfil");
        }
      } catch (error) {
        console.error("Error al obtener el perfil del usuario", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};