import axios from "axios";
import { axiosInstance } from "../../axiosInstance";
import { LoginType } from "./authType";

export const login = async ({ email, password }: LoginType) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    email,
    password,
  });
};

export const refreshToken = async () => {
  return await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`
  );
};
