import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../../api/services/auth/authApi";
import { LoginType } from "../../../api/services/auth/authType";
import { LoginState } from "./authTypes";
import axios from "axios";

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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message) {
          if (error.response.status === 403) {
            return rejectWithValue("Access denied");
          } else if (error.response.status === 401) {
            return rejectWithValue("Invalid email or password");
          } else {
            return rejectWithValue("Server Error!");
          }
        }
        return rejectWithValue(
          "No response from server. Please check your network connection."
        );
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

export interface AuthState {
  login: {
    loginState: { message: string };
    isLoading: boolean;
    error: string;
  };
  logout: {
    logoutState: { message: string };
    isLoading: boolean;
    error: string;
  };
  accessToken: string;
  name: string;
}

const initialState: AuthState = {
  login: {
    loginState: { message: "" },
    isLoading: false,
    error: "",
  },
  logout: {
    logoutState: { message: "" },
    isLoading: false,
    error: "",
  },
  accessToken: "",
  name: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.login.loginState.message = "";
    },
    clearError: (state) => {
      state.login.error = "";
    },
    clearMessageLogout: (state) => {
      state.logout.logoutState.message = "";
    },
    clearErrorLogout: (state) => {
      state.logout.error = "";
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.login.isLoading = true;
        state.login.error = "";
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<LoginState>) => {
          const { accessToken, message, name } = action.payload;
          state.login.isLoading = false;
          state.login.loginState.message = message;
          state.accessToken = accessToken;
          state.name = name;
          state.login.error = "";
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.login.isLoading = false;
        console.error("Login error:", action.payload);
        state.login.error = action.payload
          ? (action.payload as string)
          : action.error.message || "An error occurred!";
      });
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.logout.isLoading = true;
        state.logout.error = "";
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.logout.isLoading = false;
        state.logout.logoutState.message = action.payload as string;
        state.accessToken = "";
        state.name = "";
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.logout.isLoading = false;
        state.logout.error = (action.payload as string) || "An error occurred!";
      });
  },
});

export const {
  clearMessage,
  clearError,
  updateAccessToken,
  clearMessageLogout,
  clearErrorLogout,
} = authSlice.actions;
export default authSlice.reducer;
