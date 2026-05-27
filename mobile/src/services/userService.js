import axiosInstance, { setAuthToken } from "../utils/axiosInstance";

export const register = async (data) => {
  const response = await axiosInstance.post("/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await axiosInstance.post("/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/me");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await axiosInstance.post("/users", data);
  return response.data;
};

export const updateUserById = async (id, data) => {
  const response = await axiosInstance.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUserById = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.put("/update-profile", data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await axiosInstance.put("/change-password", data);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await axiosInstance.delete("/delete-account");
  return response.data;
};

export { setAuthToken };