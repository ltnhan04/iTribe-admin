import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginType } from "./authTypes";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { user, navigate }: { user: LoginType; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const role = "admin";
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email: user.email,
          password: user.password,
          role,
        }
      );
      if (response.status === 200) {
        navigate("/dashboard");
        return response.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data || "Invalid email or password"
      );
    }
  }
);
