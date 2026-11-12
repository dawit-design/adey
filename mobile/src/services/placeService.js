import axiosInstance from "../utils/axiosInstance";

const cleanRequestParams = (params = {}) => {
  const cleanedParams = {};

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (Array.isArray(value)) {
      if (value.length > 0) {
        cleanedParams[key] = value.join(",");
      }
    } else if (value !== undefined && value !== null && value !== "") {
      cleanedParams[key] = value;
    }
  });

  return cleanedParams;
};

export const getAllPlaces = async (params = {}) => {
  const response = await axiosInstance.get("/api/places", {
    params: cleanRequestParams(params),
  });

  return response.data;
};

export const getFeaturedPlaces = async () => {
  const response = await axiosInstance.get("/api/places", {
    params: {
      featured: true,
    },
  });

  return response.data;
};

export const getPlacesByType = async (type) => {
  const response = await axiosInstance.get("/api/places", {
    params: {
      type,
    },
  });

  return response.data;
};

export const getPlacesByCategory = async (category) => {
  const response = await axiosInstance.get("/api/places", {
    params: {
      category,
    },
  });

  return response.data;
};

export const getPlacesByRegion = async (region) => {
  const response = await axiosInstance.get("/api/places", {
    params: {
      region,
    },
  });

  return response.data;
};

export const searchPlaces = async (query) => {
  const response = await axiosInstance.get("/api/places", {
    params: {
      q: query,
    },
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

    type: image.mimeType || image.type || "image/jpeg",
  });

  formData.append("imageType", imageType);

  const response = await axiosInstance.post(
    `/api/places/${id}/upload-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

/*
  Admin-only operation.

  It automatically adds coordinates to
  existing destinations that still have
  missing coordinates or [0, 0].

  The backend processes a small number
  at a time to respect the free
  geocoding service limit.
*/
export const backfillPlaceCoordinates = async (limit = 5) => {
  const response = await axiosInstance.post(
    "/api/places/backfill-coordinates",
    {
      limit,
    },
    {
      timeout: 120000,
    },
  );

  return response.data;
};
/*
  Admin-only operation.

  It resets destinations marked as
  needs-review so the improved geocoder
  can search for them again.
*/
export const retryMissingPlaceCoordinates =
  async () => {
    const response =
      await axiosInstance.post(
        "/api/places/retry-missing-coordinates",
        {},
        {
          timeout: 30000,
        }
      );

    return response.data;
  };