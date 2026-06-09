import axios from "axios";
import { Platform } from "react-native";

const getBaseUrl = () => {
  const port = process.env.EXPO_PUBLIC_API_PORT || 5050;
  const host = process.env.EXPO_PUBLIC_API_HOST || "localhost";

  if (Platform.OS === "android") {
    return `http://10.0.2.2:${port}`;
  }

  if (Platform.OS === "web") {
    return `http://localhost:${port}`;
  }

  return `http://${host}:${port}`;
};

console.log("API Base URL:", getBaseUrl());

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