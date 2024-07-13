import { createSlice } from "@reduxjs/toolkit";
const ReduxSlice = createSlice({
  name: "ReduxSlice",
  initialState: {
    isActive: localStorage.getItem("isActive") ? localStorage.getItem("isActive") : false,
    profile: localStorage.getItem("profile") ? localStorage.getItem("isActive") : null,
    userName: localStorage.getItem("userName") ? localStorage.getItem("userName") : "",
    fullName: localStorage.getItem("fullName") ? localStorage.getItem("fullName") : "",
    role: localStorage.getItem("role") ? localStorage.getItem("role") : "",
  },
  reducers: {
    UserLoggedOut(state) {
      state.isActive = "";
      state.profile = "";
      state.userName = "";
      state.fullName = "";
      state.role = "";
      localStorage.removeItem("isActive");
      localStorage.removeItem("profile");
      localStorage.removeItem("userName");
      localStorage.removeItem("fullName");
      localStorage.removeItem("role");
    },
  },
});
export const {
  UserLoggedOut,
} = ReduxSlice.actions;
export default ReduxSlice.reducer;
