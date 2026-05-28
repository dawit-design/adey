import axiosInstance from "../utils/axiosInstance";

// Get all saved places
export const getSavedPlaces = async () => {
  const response = await axiosInstance.get("/saved");
  return response.data;
};

// Get saved place IDs only
export const getSavedPlaceIds = async () => {
  const response = await axiosInstance.get("/saved/ids");
  return response.data;
};

// Save a place
export const savePlace = async (placeId) => {
  const response = await axiosInstance.post(`/saved/${placeId}`);
  return response.data;
};

// Unsave a place
export const unsavePlace = async (placeId) => {
  const response = await axiosInstance.delete(`/saved/${placeId}`);
  return response.data;
};