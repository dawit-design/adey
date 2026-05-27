import axios from "axios";
import { Platform } from "react-native";

// Choose host depending on platform / environment
const getBaseUrl = () => {
  // Default dev server port
  const port = 5050;

  // If running on Android emulator use 10.0.2.2
  if (Platform.OS === "android") return `http://10.0.2.2:${port}/auth`;

  // For iOS simulator and web use localhost
  if (Platform.OS === "ios" || Platform.OS === "web") return `http://localhost:${port}/auth`;

  // For real devices, try LAN address (you may set this to your machine IP)
  return `http://<YOUR_COMPUTER_IP>:${port}/auth`;
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