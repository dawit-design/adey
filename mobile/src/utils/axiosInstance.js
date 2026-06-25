import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

const getExpoHost = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoClient?.hostUri ||
    Constants.manifest?.debuggerHost ||
    Constants.manifest?.hostUri;

  if (!hostUri) return null;

  return hostUri.split(":")[0];
};

const getBaseUrl = () => {
  const port = process.env.EXPO_PUBLIC_API_PORT || "5050";
  const envHost = process.env.EXPO_PUBLIC_API_HOST;

  if (Platform.OS === "web") {
    return `http://localhost:${port}`;
  }

  if (envHost && envHost !== "auto") {
    return `http://${envHost}:${port}`;
  }

  const expoHost = getExpoHost();

  if (expoHost) {
    return `http://${expoHost}:${port}`;
  }

  if (Platform.OS === "android") {
    return `http://10.0.2.2:${port}`;
  }

  return `http://localhost:${port}`;
};

console.log("API Base URL:", getBaseUrl());

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
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