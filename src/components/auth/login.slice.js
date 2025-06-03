import { createSlice } from "@reduxjs/toolkit";

// State ban đầu
const initialState = {
  showPassword: false,
  username: "",
  isExpired: false,
  policy: "",
  rules: [],
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setIsExpired: (state, action) => {
      state.isExpired = action.payload;
    },
    setPolicies: (state, action) => {
      state.policy = action.payload;
    },
    setRules: (state, action) => {
      state.rules = action.payload;
    },
  },
});

export const {
  setShowPassword,
  setUsername,
  setIsExpired,
  setPolicies,
  setRules,
} = loginSlice.actions;

// Các selector
export const showPasswordSelector = (state) => state.login.showPassword;
export const emailSelector = (state) => state.login.username;
export const isExpiredSelector = (state) => state.login.isExpired;
export const policySelector = (state) => state.login.policy;
export const rulesSelector = (state) => state.login.rules;

export default loginSlice.reducer;
