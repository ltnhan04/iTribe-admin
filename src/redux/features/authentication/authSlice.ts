import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../../api/services/auth/authApi";
import { LoginType } from "../../../api/services/auth/authType";
import { ErrorResponse, LoginState } from "./authTypes";

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
        state.login.error = action.payload
          ? (action.payload as string)
          : action.error.message || "Có lỗi xảy ra!";
      });
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.logout.isLoading = true;
        state.logout.error = "";
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        const message = action.payload as string;
        state.logout.isLoading = false;
        state.logout.logoutState.message = message;
        state.accessToken = "";
        state.name = "";
        state.logout.error = "";
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.logout.isLoading = false;
        state.logout.error = action.payload
          ? (action.payload as string)
          : action.error.message || "Có lỗi xảy ra!";
      });
  },
});

export const { clearMessage, clearError, updateAccessToken } =
  authSlice.actions;
export default authSlice.reducer;