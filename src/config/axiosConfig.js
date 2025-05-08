import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your backend URL
  withCredentials: true, // important: sends cookies with every request
});

export default axiosInstance;
