

import { createContext, useContext, useEffect, useState } from "react";

import {
  getToken,
  getStoredUser,
  setToken,
  setStoredUser,
  clearAuthStorage,
} from "../api/authStorage";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "../api/authApi";
//import { createContext, useEffect, useState } from "react";


const AuthContext = createContext(null);
//export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [token, setAuthToken] = useState(
    () => getToken()
  );

  const [user, setUser] = useState(
    () => getStoredUser()
  );

  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  useEffect(() => {

    if (!token) {
      setUser(null);
    }

  }, [token]);

  const buildUserFromAuthResponse = (data) => {

    if (!data) {
      return null;
    }

    return {
      id: data.userId,
      name: data.name,
      email: data.email,
      branch: data.branch,
    };
  };

  const login = async (credentials) => {

    setLoading(true);

    try {

      const data = await loginUser(credentials);

      if (data.token) {

        setToken(data.token);

        setAuthToken(data.token);
      }

      const authenticatedUser =
        buildUserFromAuthResponse(data);

      if (authenticatedUser) {

        setStoredUser(authenticatedUser);

        setUser(authenticatedUser);
      }

      return data;

    } finally {

      setLoading(false);
    }
  };

  const register = async (userData) => {

    setLoading(true);

    try {

      const data = await registerUser(userData);

      if (data.token) {

        setToken(data.token);

        setAuthToken(data.token);
      }

      const authenticatedUser =
        buildUserFromAuthResponse(data);

      if (authenticatedUser) {

        setStoredUser(authenticatedUser);

        setUser(authenticatedUser);
      }

      return data;

    } finally {

      setLoading(false);
    }
  };

  const logout = () => {

    logoutUser();

    clearAuthStorage();

    setAuthToken(null);

    setUser(null);
  };

  const updateAuthenticatedUser = (updatedUser) => {

    setStoredUser(updatedUser);

    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
};


