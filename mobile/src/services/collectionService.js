import axiosInstance from "../utils/axiosInstance";

export const getAllCollections = async (params = {}) => {
  const response = await axiosInstance.get("/api/collections", {
    params,
  });

  return response.data;
};

export const getFeaturedCollections = async () => {
  const response = await axiosInstance.get("/api/collections", {
    params: {
      featured: true,
    },
  });

  return response.data;
};

export const getCollectionsByAudience = async (audience) => {
  const response = await axiosInstance.get("/api/collections", {
    params: {
      audience,
    },
  });

  return response.data;
};

export const searchCollections = async (query) => {
  const response = await axiosInstance.get("/api/collections", {
    params: {
      q: query,
    },
  });

  return response.data;
};

export const getCollectionBySlug = async (slug) => {
  const response = await axiosInstance.get(`/api/collections/${slug}`);

  return response.data;
};

export const createCollection = async (data) => {
  const response = await axiosInstance.post("/api/collections", data);

  return response.data;
};

export const updateCollectionById = async (id, data) => {
  const response = await axiosInstance.put(
    `/api/collections/${id}`,
    data
  );

  return response.data;
};

export const deleteCollectionById = async (id) => {
  const response = await axiosInstance.delete(
    `/api/collections/${id}`
  );

  return response.data;
};