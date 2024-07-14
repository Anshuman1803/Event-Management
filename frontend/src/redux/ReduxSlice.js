import { createSlice } from "@reduxjs/toolkit";
const ReduxSlice = createSlice({
  name: "ReduxSlice",
  initialState: {
    isActive: localStorage.getItem("isActive") ? localStorage.getItem("isActive") : false,
    profile: localStorage.getItem("profile") ? localStorage.getItem("isActive") : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    fullName: localStorage.getItem("fullName") ? localStorage.getItem("fullName") : "",
    role: localStorage.getItem("role") ? localStorage.getItem("role") : "",
    userID: localStorage.getItem("userID") ? localStorage.getItem("userID") : "",
  },
  reducers: {
    updateUserData(state, action){
      state.isActive = true;
      state.profile = action.payload.profile;
      state.token = action.payload.token;
      state.fullName = action.payload.fullName;
      state.role = action.payload.role;
      state.userID = action.payload.userID;
      localStorage.setItem("isActive", true);
      localStorage.setItem("profile", state.profile);
      localStorage.setItem("token", state.token);
      localStorage.setItem("fullName", state.fullName);
      localStorage.setItem("role", state.role);
      localStorage.setItem("userID", state.userID);
    },
    UserLoggedOut(state) {
      state.isActive = "";
      state.profile = "";
      state.token = "";
      state.fullName = "";
      state.role = "";
      state.userID = "";
      localStorage.removeItem("isActive");
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      localStorage.removeItem("fullName");
      localStorage.removeItem("role");
      localStorage.removeItem("userID");
    },
  },
});
export const {
  UserLoggedOut,updateUserData
} = ReduxSlice.actions;
export default ReduxSlice.reducer;
