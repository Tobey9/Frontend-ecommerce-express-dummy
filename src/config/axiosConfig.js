import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
  withCredentials: true, // important: sends cookies with every request
});

export default axiosInstance;
