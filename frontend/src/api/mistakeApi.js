// import api from "./axiosConfig";

// export const getAllMistakes = async () => {
//   const response = await api.get("/mistakes");

//   return response.data;
// };

// export const getMistakeById = async (id) => {
//   const response = await api.get(`/mistakes/${id}`);

//   return response.data;
// };

// export const createMistake = async (mistakeData) => {
//   const response = await api.post("/mistakes", mistakeData);

//   return response.data;
// };

// export const updateMistake = async (id, mistakeData) => {
//   const response = await api.put(`/mistakes/${id}`, mistakeData);

//   return response.data;
// };

// export const deleteMistake = async (id) => {
//   await api.delete(`/mistakes/${id}`);
// };




import api from "./axiosConfig";

export const getAllMistakes = async () => {
  const response = await api.get("/mistakes");
  return response.data;
};

export const getMistakeById = async (id) => {
  const response = await api.get(`/mistakes/${id}`);
  return response.data;
};

export const createMistake = async (mistakeData) => {
  const response = await api.post("/mistakes", mistakeData);
  return response.data;
};

export const updateMistake = async (id, mistakeData) => {
  const response = await api.put(`/mistakes/${id}`, mistakeData);
  return response.data;
};

export const deleteMistake = async (id) => {
  await api.delete(`/mistakes/${id}`);
};