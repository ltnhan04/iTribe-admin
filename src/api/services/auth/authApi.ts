import axios from "axios";
import { LoginType } from "./authType";

export const login = async ({ email, password }: LoginType) => {
  return await axios.post(`${process.env.VITE_API_URL}/api/auth/login`, {
    email,
    password,
  });
};
