import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../../api/services/auth/authApi";
import { LoginType } from "../../../api/services/auth/authType";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { user, navigate }: { user: LoginType; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const response = await login(user);

      if (response?.status === 200) {
        navigate("/dashboard");
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 403) {
            return rejectWithValue("Access denied");
          } else if (status === 401) {
            return rejectWithValue("Invalid email or password");
          } else {
            return rejectWithValue(data.message || "Server Error!");
          }
        }
        return rejectWithValue("No response from server. Check network.");
      }
      return rejectWithValue("Something went wrong!");
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
      if (response.status === 200) {
        return response.data.message;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Server Error!"
        );
      }
      return rejectWithValue("An unexpected error occurred!");
    }
  }
);
