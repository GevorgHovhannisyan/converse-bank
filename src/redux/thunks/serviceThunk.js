import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../service/service";

export const getServices = createAsyncThunk("getService", async () => {
  const url = `/services`;
  const config = {
    method: "get",
    url: url,
  };

  const response = await apiRequest(config);

  return response.data;
});

const getServicePending = (state, { payload }) => {
  state.services = [];
};

const getServiceFulfilled = (state, { payload }) => {
  state.services = payload;
};

const getServiceRejected = (state) => {
  state.services = [];
};

export const getServiceExtraReducer = (builder) => {
  builder
    .addCase(getServices.pending, getServicePending)
    .addCase(getServices.fulfilled, getServiceFulfilled)
    .addCase(getServices.rejected, getServiceRejected);
};
