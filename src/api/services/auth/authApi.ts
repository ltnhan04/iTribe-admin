import { axiosInstance } from "../../../config/axiosInstance";

export const refreshToken = async () => {
  return await axiosInstance.post(`/api/auth/refresh-token`);
};

export const logout = async () => {
  console.log("gg")
  return await axiosInstance.post(`/api/auth/logout`);
};
