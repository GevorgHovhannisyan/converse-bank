import { createSlice } from "@reduxjs/toolkit";
import { getServiceExtraReducer } from "../../thunks/serviceThunk";


const initialState = {
    services: []
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServices: (state, { payload }) => {
      state.slider = payload;
    },
  },
  extraReducers: (builder) => {
    getServiceExtraReducer(builder);
  },
});

export const servicesSelector = (state) => state.service.services;

export const { setServices } = serviceSlice.actions;

export default serviceSlice.reducer;
