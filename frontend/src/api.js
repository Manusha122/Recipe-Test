// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://recipe-test-production.up.railway.app",
//   // withCredentials: true // send cookies
// });


import axios from "axios";

const api = axios.create({
  baseURL: "https://recipe-test-production.up.railway.app",
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or from context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;






