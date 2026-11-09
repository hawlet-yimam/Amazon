import axios from "axios";

const axiosInstance = axios.create({
  baseURL: " https://amazon-api-deploy-1-om8m.onrender.com",
});
export {axiosInstance};