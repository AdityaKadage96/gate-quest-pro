import api from "./axiosConfig";

export const getAllTopics = async () => {
  const response = await api.get("/topics");

  return response.data;
};

export const getTopicById = async (id) => {
  const response = await api.get(`/topics/${id}`);

  return response.data;
};

export const createTopic = async (topicData) => {
  const response = await api.post("/topics", topicData);

  return response.data;
};

export const updateTopic = async (id, topicData) => {
  const response = await api.put(`/topics/${id}`, topicData);

  return response.data;
};

export const deleteTopic = async (id) => {
  await api.delete(`/topics/${id}`);
};