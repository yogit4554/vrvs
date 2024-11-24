import axios from "axios";

const api = axios.create({
  baseURL: "https://vrvs-security.onrender.com", // Backend URL
  withCredentials: true, // Allow cookies to be sent
});

export default api;
