import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  passwoord: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});
