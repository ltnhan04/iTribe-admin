import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState } from "./authTypes";
import { loginThunk } from "./authThunk";

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
