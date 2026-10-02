import api from "./axiosConfig";

export const getAllStudyLogs = async () => {
  const response = await api.get("/study-logs");

  return response.data;
};

export const getStudyLogById = async (id) => {
  const response = await api.get(`/study-logs/${id}`);

  return response.data;
};

export const createStudyLog = async (studyLogData) => {
  const response = await api.post("/study-logs", studyLogData);

  return response.data;
};

export const updateStudyLog = async (id, studyLogData) => {
  const response = await api.put(`/study-logs/${id}`, studyLogData);

  return response.data;
};

export const deleteStudyLog = async (id) => {
  await api.delete(`/study-logs/${id}`);
};