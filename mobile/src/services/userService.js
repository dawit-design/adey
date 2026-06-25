import axiosInstance, { setAuthToken } from "../utils/axiosInstance";

export const register = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/auth/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/auth/users/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await axiosInstance.post("/auth/users", data);
  return response.data;
};

export const updateUserById = async (id, data) => {
  const response = await axiosInstance.put(`/auth/users/${id}`, data);
  return response.data;
};

export const deleteUserById = async (id) => {
  const response = await axiosInstance.delete(`/auth/users/${id}`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.put("/auth/update-profile", data);
  return response.data;
};

export const uploadProfilePhoto = async (image) => {
  const formData = new FormData();

  formData.append("image", {
    uri: image.uri,
    name: image.fileName || `profile-${Date.now()}.jpg`,
    type: image.type || "image/jpeg",
  });

  const response = await axiosInstance.put(
    "/auth/upload-profile-photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const changePassword = async (data) => {
  const response = await axiosInstance.put("/auth/change-password", data);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await axiosInstance.delete("/auth/delete-account");
  return response.data;
};

export { setAuthToken };