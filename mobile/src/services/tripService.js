import axiosInstance from "../utils/axiosInstance";

export const getMyTrips = async () => {
  const response = await axiosInstance.get("/api/trips");
  return response.data;
};

export const getTripById = async (id) => {
  const response = await axiosInstance.get(`/api/trips/${id}`);
  return response.data;
};

export const createTrip = async (data) => {
  const response = await axiosInstance.post("/api/trips", data);
  return response.data;
};

export const updateTrip = async (id, data) => {
  const response = await axiosInstance.put(`/api/trips/${id}`, data);
  return response.data;
};

export const deleteTrip = async (id) => {
  const response = await axiosInstance.delete(`/api/trips/${id}`);
  return response.data;
};

export const addPlaceToTrip = async (tripId, placeId, note = "") => {
  const response = await axiosInstance.post(`/api/trips/${tripId}/places`, {
    placeId,
    note,
  });

  return response.data;
};

export const removePlaceFromTrip = async (tripId, placeId) => {
  const response = await axiosInstance.delete(
    `/api/trips/${tripId}/places/${placeId}`
  );

  return response.data;
};