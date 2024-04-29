"use client";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

type User = {
  id: string;
  role: string;
  username: string;
  picture?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Inicializar user como null

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/auth/profile",
          {
            withCredentials: true,
          }
        );
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
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
