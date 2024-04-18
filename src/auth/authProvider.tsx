"use client"
import React, { createContext, useContext } from 'react'
import { Context } from '../context/Context'
import { AuthContextProps } from '../lib/interfaces';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { user } = useContext(Context);

  const isLogged = (): boolean => !!user;
  const hasRole = (role: string): boolean => user?.role === role;

  const contextValue: AuthContextProps = {
    user,
    isLogged,
    hasRole
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
