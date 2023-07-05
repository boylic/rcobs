import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fname: "",
  lname: "",
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export default authSlice.reducer;
