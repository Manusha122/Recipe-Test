import axios from "axios";

const API = axios.create({
  baseURL: "https://recipe-test-production.up.railway.app",
  withCredentials: true // send cookies
});






