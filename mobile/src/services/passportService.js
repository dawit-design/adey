import axiosInstance from "../utils/axiosInstance";

export const getPassport = async () => {
  const response = await axiosInstance.get(
    "/api/passport"
  );

  return response.data;
};

export const getPassportStats = async () => {
  const response = await axiosInstance.get(
    "/api/passport/stats"
  );

  return response.data;
};

export const getPassportEntries = async (
  status
) => {
  const response = await axiosInstance.get(
    "/api/passport/entries",
    {
      params: status ? { status } : {},
    }
  );

  return response.data;
};

export const getPassportEntry = async (
  placeId
) => {
  const response = await axiosInstance.get(
    `/api/passport/entries/${placeId}`
  );

  return response.data;
};

export const savePassportEntry = async (
  placeId,
  entryData
) => {
  const response = await axiosInstance.put(
    `/api/passport/entries/${placeId}`,
    entryData
  );

  return response.data;
};

export const deletePassportEntry = async (
  placeId
) => {
  const response = await axiosInstance.delete(
    `/api/passport/entries/${placeId}`
  );

  return response.data;
};

/*
  Legacy functions retained temporarily.
*/
export const addVisitedPlace = async (
  placeId
) => {
  const response = await axiosInstance.post(
    `/api/passport/visited/${placeId}`
  );

  return response.data;
};

export const removeVisitedPlace = async (
  placeId
) => {
  const response = await axiosInstance.delete(
    `/api/passport/visited/${placeId}`
  );

  return response.data;
};

export const addWantToVisitPlace = async (
  placeId
) => {
  const response = await axiosInstance.post(
    `/api/passport/want-to-visit/${placeId}`
  );

  return response.data;
};

export const removeWantToVisitPlace = async (
  placeId
) => {
  const response = await axiosInstance.delete(
    `/api/passport/want-to-visit/${placeId}`
  );

  return response.data;
};

export const uploadPassportImage = async (
  placeId,
  image,
  imageType
) => {
  const formData = new FormData();

  formData.append("image", {
    uri: image.uri,
    name:
      image.fileName ||
      `passport-${Date.now()}.jpg`,
    type: image.mimeType || "image/jpeg",
  });

  formData.append("imageType", imageType);

  const response = await axiosInstance.post(
    `/api/passport/entries/${placeId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deletePassportCover = async (
  placeId
) => {
  const response = await axiosInstance.delete(
    `/api/passport/entries/${placeId}/images/cover`
  );

  return response.data;
};

export const deletePassportPhoto = async (
  placeId,
  photoId
) => {
  const response = await axiosInstance.delete(
    `/api/passport/entries/${placeId}/images/${photoId}`
  );

  return response.data;
};