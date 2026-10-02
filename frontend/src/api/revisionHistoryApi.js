import api from "./axiosConfig";

export const getAllRevisionHistory = async () => {
  const response = await api.get("/revision-history");

  return response.data;
};

export const getRevisionHistoryById = async (id) => {
  const response = await api.get(`/revision-history/${id}`);

  return response.data;
};

export const createRevisionHistory = async (historyData) => {
  const response = await api.post("/revision-history", historyData);

  return response.data;
};

export const updateRevisionHistory = async (id, historyData) => {
  const response = await api.put(`/revision-history/${id}`, historyData);

  return response.data;
};

export const deleteRevisionHistory = async (id) => {
  await api.delete(`/revision-history/${id}`);
};