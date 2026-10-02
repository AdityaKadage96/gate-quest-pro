import api from "./axiosConfig";

export const getAllGoals = async () => {
  const response = await api.get("/goals");

  return response.data;
};

export const getGoalById = async (id) => {
  const response = await api.get(`/goals/${id}`);

  return response.data;
};

export const createGoal = async (goalData) => {
  const response = await api.post("/goals", goalData);

  return response.data;
};

export const updateGoal = async (id, goalData) => {
  const response = await api.put(`/goals/${id}`, goalData);

  return response.data;
};

export const deleteGoal = async (id) => {
  await api.delete(`/goals/${id}`);
};