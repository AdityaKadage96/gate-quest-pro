// import api from "./axiosConfig";

// export const getAllMocks = async () => {
//   const response = await api.get("/mocks");

//   return response.data;
// };

// export const getMockById = async (id) => {
//   const response = await api.get(`/mocks/${id}`);

//   return response.data;
// };

// export const createMock = async (mockData) => {
//   const response = await api.post("/mocks", mockData);

//   return response.data;
// };

// export const updateMock = async (id, mockData) => {
//   const response = await api.put(`/mocks/${id}`, mockData);

//   return response.data;
// };

// export const deleteMock = async (id) => {
//   await api.delete(`/mocks/${id}`);
// };

import api from "./axiosConfig";

export const getAllMocks = async () => {
  const response = await api.get("/mocks");
  return response.data;
};

export const getMockById = async (id) => {
  const response = await api.get(`/mocks/${id}`);
  return response.data;
};

export const createMock = async (mockData) => {
  const response = await api.post("/mocks", mockData);
  return response.data;
};

export const updateMock = async (id, mockData) => {
  const response = await api.put(`/mocks/${id}`, mockData);
  return response.data;
};

export const deleteMock = async (id) => {
  await api.delete(`/mocks/${id}`);
};