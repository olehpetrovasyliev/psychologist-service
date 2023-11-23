import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalSignupOpen: false,
  isModalLoginOpen: false,
  isModalAppointmentOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalSignup(state) {
      state.isModalSignupOpen = true;
    },
    closeModalSignup(state) {
      state.isModalSignupOpen = false;
    },
    openModalLogin(state) {
      state.isModalLoginOpen = true;
    },
    closeModalLogin(state) {
      state.isModalLoginOpen = false;
    },
    openModalAppointment(state) {
      state.isModalAppointmentOpen = true;
    },
    closeModalAppointment(state) {
      state.isModalAppointmentOpen = false;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const {
  openModalSignup,
  closeModalSignup,
  openModalLogin,
  closeModalLogin,
  openModalAppointment,
  closeModalAppointment,
} = modalSlice.actions;
