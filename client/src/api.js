import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Backend URL
  withCredentials: true, // Allow cookies to be sent
});

export default api;
