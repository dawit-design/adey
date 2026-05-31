import axiosInstance from "../utils/axiosInstance";

export const getAllPlaces = async (params = {}) => {
  const cleanedParams = {};

  Object.keys(params).forEach((key) => {
    if (Array.isArray(params[key])) {
      cleanedParams[key] = params[key].join(",");
    } else if (params[key] !== undefined && params[key] !== null) {
      cleanedParams[key] = params[key];
    }
  });

  const response = await axiosInstance.get("/api/places", {
    params: cleanedParams,
  });

  return response.data;
};
export const getFeaturedPlaces = async () => {
  const response = await axiosInstance.get("/api/places", {
    params: { featured: true },
  });
  return response.data;
};

export const getPlacesByType = async (type) => {
  const response = await axiosInstance.get("/api/places", {
    params: { type },
  });
  return response.data;
};

export const getPlacesByCategory = async (category) => {
  const response = await axiosInstance.get("/api/places", {
    params: { category },
  });
  return response.data;
};

export const getPlacesByRegion = async (region) => {
  const response = await axiosInstance.get("/api/places", {
    params: { region },
  });
  return response.data;
};

export const searchPlaces = async (query) => {
  const response = await axiosInstance.get("/api/places", {
    params: { q: query },
  });
  return response.data;
};

export const getPlaceBySlug = async (slug) => {
  const response = await axiosInstance.get(`/api/places/${slug}`);
  return response.data;
};

export const createPlace = async (data) => {
  const response = await axiosInstance.post("/api/places", data);
  return response.data;
};

export const updatePlaceById = async (id, data) => {
  const response = await axiosInstance.put(`/api/places/${id}`, data);
  return response.data;
};

export const deletePlaceById = async (id) => {
  const response = await axiosInstance.delete(`/api/places/${id}`);
  return response.data;
};

export const uploadPlaceImage = async (id, image, imageType = "cover") => {
  const formData = new FormData();

  formData.append("image", {
    uri: image.uri,
    name: image.fileName || `place-${Date.now()}.jpg`,
    type: image.mimeType || "image/jpeg",
  });

  formData.append("imageType", imageType);

  const response = await axiosInstance.post(
    `/api/places/${id}/upload-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};