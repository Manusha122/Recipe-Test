// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://recipe-test-production.up.railway.app",
//   // withCredentials: true // send cookies
// });



import axios from "axios";

const API = axios.create({
  baseURL: "https://recipe-test-production.up.railway.app",
});

// Attach token to each request if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


