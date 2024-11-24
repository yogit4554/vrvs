import axios from "axios";

const api = axios.create({
  baseURL: "https://vrvs-security.onrender.com/api/v1", // Backend URL
  withCredentials: true, // Allow cookies to be sent
});

export default api;
