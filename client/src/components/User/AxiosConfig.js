import axios from "axios";

const axiosConfig = axios.create({
  baseURL: 'https://localhost:8008/',
  timeout: 1000,
});

export default axiosConfig;