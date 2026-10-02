import api from "./axiosConfig";

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await api.get(
    `/users/email/${encodeURIComponent(email)}`
  );
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(
    `/users/${id}`,
    userData
  );
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};