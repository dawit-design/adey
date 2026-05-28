import axios from "axios";
import { Platform } from "react-native";

const getBaseUrl = () => {
  const port = 5050;

  if (Platform.OS === "android") {
    return `http://10.0.2.2:${port}`;
  }

  if (Platform.OS === "ios" || Platform.OS === "web") {
    return `http://localhost:${port}`;
  }

  return `http://<YOUR_COMPUTER_IP>:${port}`;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export default axiosInstance;