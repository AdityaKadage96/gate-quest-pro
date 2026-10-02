import axios from "axios";
import { getToken } from "./authStorage";

const api = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();

//     console.log(
//       "AXIOS REQUEST:",
//       config.method?.toUpperCase(),
//       config.url
//     );

//     console.log(
//       "AXIOS TOKEN EXISTS:",
//       Boolean(token)
//     );

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;

//       console.log(
//         "AXIOS AUTHORIZATION ADDED: YES"
//       );
//     } else {
//       console.log(
//         "AXIOS AUTHORIZATION ADDED: NO"
//       );
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;