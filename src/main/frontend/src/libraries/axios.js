// Third-party components and modules
import axios from "axios";

//Server URL
const BASE_URL = "http://localhost:8080/api";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your actual base URL
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
