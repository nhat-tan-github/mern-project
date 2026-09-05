import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "http://localhost:5001/api"
});

export default axiosAPI;
