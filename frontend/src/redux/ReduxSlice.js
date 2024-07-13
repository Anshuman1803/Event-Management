import { createSlice } from "@reduxjs/toolkit";
const ReduxSlice = createSlice({
  name: "ReduxSlice",
  initialState: {
    isActive: localStorage.getItem("isActive") ? localStorage.getItem("isActive") : false,
    profile: localStorage.getItem("profile") ? localStorage.getItem("isActive") : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    fullName: localStorage.getItem("fullName") ? localStorage.getItem("fullName") : "",
    role: localStorage.getItem("role") ? localStorage.getItem("role") : "",
  },
  reducers: {
    updateUserData(state, action){
      state.isActive = true;
      state.profile = action.payload.profile;
      state.token = action.payload.token;
      state.fullName = action.payload.fullName;
      state.role = action.payload.role;
      localStorage.setItem("isActive", true);
      localStorage.setItem("profile", state.profile);
      localStorage.setItem("token", state.token);
      localStorage.setItem("fullName", state.fullName);
      localStorage.setItem("role", state.role);

    },
    UserLoggedOut(state) {
      state.isActive = "";
      state.profile = "";
      state.token = "";
      state.fullName = "";
      state.role = "";
      localStorage.removeItem("isActive");
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      localStorage.removeItem("fullName");
      localStorage.removeItem("role");
    },
  },
});
export const {
  UserLoggedOut,updateUserData
} = ReduxSlice.actions;
export default ReduxSlice.reducer;
