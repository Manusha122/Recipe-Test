import axios from "axios";

const API = axios.create({
  baseURL: "https://recipe-app-demo-production.up.railway.app/",
  // withCredentials: true // send cookies
});

export default API;
