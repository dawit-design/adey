import axiosInstance from "../utils/axiosInstance";

export const getPassport = async () => {
  const response = await axiosInstance.get("/api/passport");
  return response.data;
};

export const getPassportStats = async () => {
  const response = await axiosInstance.get("/api/passport/stats");
  return response.data;
};

export const addVisitedPlace = async (placeId) => {
  const response = await axiosInstance.post(
    `/api/passport/visited/${placeId}`
  );

  return response.data;
};

export const removeVisitedPlace = async (placeId) => {
  const response = await axiosInstance.delete(
    `/api/passport/visited/${placeId}`
  );

  return response.data;
};

export const addWantToVisitPlace = async (placeId) => {
  const response = await axiosInstance.post(
    `/api/passport/want-to-visit/${placeId}`
  );

  return response.data;
};

export const removeWantToVisitPlace = async (placeId) => {
  const response = await axiosInstance.delete(
    `/api/passport/want-to-visit/${placeId}`
  );

  return response.data;
};