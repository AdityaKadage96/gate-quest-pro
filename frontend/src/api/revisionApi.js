import api from "./axiosConfig";

export const getAllRevisions = async () => {
  const response = await api.get("/revisions");

  return response.data;
};

export const getRevisionById = async (id) => {
  const response = await api.get(`/revisions/${id}`);

  return response.data;
};

export const createRevision = async (revisionData) => {
  const response = await api.post("/revisions", revisionData);

  return response.data;
};

export const updateRevision = async (id, revisionData) => {
  const response = await api.put(`/revisions/${id}`, revisionData);

  return response.data;
};

export const deleteRevision = async (id) => {
  await api.delete(`/revisions/${id}`);
};