import api from "./axiosConfig";
import {
  setToken,
  setStoredUser,
  clearAuthStorage,
} from "./authStorage";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  const data = response.data;

  if (data.token) {
    setToken(data.token);
  }

  if (data.user) {
    setStoredUser(data.user);
  }

  return data;
};

export const loginUser = async (credentials) => {
  clearAuthStorage();

  const response = await api.post("/auth/login", credentials);

  const data = response.data;

  if (data.token) {
    setToken(data.token);
  }

  if (data.user) {
    setStoredUser(data.user);
  }

  return data;
};

export const logoutUser = () => {
  clearAuthStorage();
};