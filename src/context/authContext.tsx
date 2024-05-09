"use client";
import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type User = {
  id: string;
  role: string;
  username: string;
  picture?: string;
};

type AuthTokens = {
  token: string | undefined;
  refresh_token: string;
  user: User | null;
};

type AuthTokensInLocalStorage = {
  token: string;
};

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

export const AuthContext = createContext({
  login: (authTokens: AuthTokens) => { },
  logout: () => { },
  isLoggedIn: false,
  cambioToken: false,
  authTokens: null as AuthTokens | null,
  user: null as User | null,
  setCambioToken: (value: boolean) => { },
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [cambioToken, setCambioToken] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const verifyUser = async () => {
      const authTokensInLocalStorage: AuthTokensInLocalStorage = {
        token: window.localStorage.getItem(AUTH_TOKENS_KEY) || "",
      };
      try {
        const response = await axios.get("https://apiblog-01g5.onrender.com/api/auth/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authTokensInLocalStorage.token}`,
          },
        });
        setUser(response.data.validToken);
        setLoggedIn(true);
      } catch (error: Error | any) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          console.error("El token de autenticación es inválido o ha expirado", error);
          setLoggedIn(false);
        } else {
          console.error("Error al verificar el usuario", error);
        }
      }
    };
    verifyUser();
  }, [isLoggedIn, cambioToken]);

  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);

  const login = useCallback(
    function (authTokens: AuthTokens) {
      if (isClient) {
        window.localStorage.setItem(
          AUTH_TOKENS_KEY,
          JSON.stringify(authTokens)
        );
      }
      setAuthTokens(authTokens);
      setLoggedIn(true);
    },
    [isClient]
  );

  const logout = useCallback(
    function () {
      if (isClient) {
        window.localStorage.removeItem(AUTH_TOKENS_KEY);
      }
      setAuthTokens(null);
      setUser(null);
      setLoggedIn(false);
    },
    [isClient]
  );

  const value = useMemo(
    () => ({
      login,
      logout,
      authTokens,
      isLoggedIn,
      cambioToken,
      setCambioToken,
      user,
    }),
    [authTokens, login, logout, user, isLoggedIn, cambioToken, setCambioToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};
