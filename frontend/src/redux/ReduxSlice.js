import { createSlice } from "@reduxjs/toolkit";
const ReduxSlice = createSlice({
  name: "ReduxSlice",
  initialState: {
    isActive: localStorage.getItem("isActive") ? localStorage.getItem("isActive") : false,
    profile: localStorage.getItem("profile") ? localStorage.getItem("isActive") : null,
  },
  reducers: {
    UserLoggedOut(state) {
      state.isActive = "";
      localStorage.removeItem("isActive");
    },
  },
});
export const {
  UserLoggedOut,
} = ReduxSlice.actions;
export default ReduxSlice.reducer;
