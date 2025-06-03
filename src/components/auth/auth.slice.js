import { createSlice } from "@reduxjs/toolkit";

const AuthLoginState = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  userId: "",
  merchantInfo: null,
};

export const authLoginSlice = createSlice({
  name: "authLogin",
  initialState: AuthLoginState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setLogout: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setMerchantInfo: (state, action) => {
      state.merchantInfo = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setAccessToken,
  setRefreshToken,
  setUserId,
  setMerchantInfo,
} = authLoginSlice.actions;

// Selectors
export const loginSelector = (state) => state.authLogin.isAuthenticated;
export const logoutSelector = (state) => state.authLogin.isAuthenticated;
export const accessTokenSelector = (state) => state.authLogin.accessToken;
export const refreshTokenSelector = (state) => state.authLogin.refreshToken;
export const userIdSelector = (state) => state.authLogin.userId;

export default authLoginSlice.reducer;
