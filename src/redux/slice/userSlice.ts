// src/store/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, UserSetAction } from "../../types/User";
import secureLocalStorage from "react-secure-storage";
import { clearAllCookies, setCookie } from "../../utils";

const initialState: AuthState = {
  user: (secureLocalStorage.getItem("user") as User) || null,
  isAuthenticated: !!(secureLocalStorage.getItem("user") as User),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserSetAction>) => {
      if (action.payload?.user) {
        state.user = action.payload?.user;
        secureLocalStorage.setItem("user", action.payload?.user);
        state.isAuthenticated = true;
      }
      if (action.payload?.token) {
        secureLocalStorage.setItem("token", action.payload?.token);
      }
      if (action.payload?.backupToken) {
        setCookie("backupToken", action.payload?.backupToken, 2);
      }
    },
    logout: (state) => {
      state.user = null;
      secureLocalStorage.clear();
      clearAllCookies();
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
