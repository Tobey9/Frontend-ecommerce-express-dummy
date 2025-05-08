import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL, // your backend URL
  withCredentials: true, // important: sends cookies with every request
});

export default axiosInstance;
