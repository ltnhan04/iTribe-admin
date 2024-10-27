import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../../api/services/auth/authApi";
import { LoginType } from "../../../api/services/auth/authType";
import { ErrorResponse } from "./authTypes";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { user, navigate }: { user: LoginType; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const response = await login(user);
      if (response.status === 200) {
        navigate("/dashboard");
        return response.data;
      }
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg =
        typedError.response?.data?.message ||
        "Đã xảy ra lỗi! Vui lòng thử lại.";
      return rejectWithValue(errorMsg);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      if (response.status === 200) {
        return response.data;
      }
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg =
        typedError.response.data.message || "Đã xảy ra lỗi! Vui lòng thử lại.";
      return rejectWithValue(errorMsg);
    }
  }
);
