import { axiosInstance } from "../../axiosInstance";

export const refreshToken = async () => {
  return await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`
  );
};

export const logout = async () => {
  return await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`
  );
};
