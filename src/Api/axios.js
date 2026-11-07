import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://us-central1-clone-4e7f0.cloudfunctions.net/api",
});
export {axiosInstance};