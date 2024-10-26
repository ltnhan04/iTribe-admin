import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginState, ErrorResponse } from "./authTypes";
import { login } from "../../api/services/auth/authApi";
import { LoginType } from "../../api/services/auth/authType";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    {
      user,
      navigate,
    }: {
      user: LoginType;
      navigate: (path: string) => void;
    },
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
  accessToken: string;
  name: string;
}

const initialState: AuthState = {
  login: {
    loginState: {
      message: "",
    },
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
      const newAccessToken = action.payload;
      state.accessToken = newAccessToken;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.login.isLoading = true;
      state.login.error = "";
    });
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<LoginState>) => {
        state.login.isLoading = false;
        const { accessToken, message, name } = action.payload;
        state.login.loginState.message = message;
        state.accessToken = accessToken;
        state.name = name;
        state.login.error = "";
      }
    );
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.login.isLoading = false;
      state.login.error = action.payload
        ? (action.payload as string)
        : action.error.message || "Có lỗi xảy ra!";
    });
  },
});
export const { clearMessage, clearError, updateAccessToken } =
  authSlice.actions;
export default authSlice.reducer;
