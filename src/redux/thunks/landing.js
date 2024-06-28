import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../service/service";

export const getLandingInfoThunk = createAsyncThunk("getLanding", async (slug) => {
    const url = `/pages/${slug}`;
    const config = {
        method: "get",
        url: url,
    };

    const response = await apiRequest(config);
    return response.data;
});

const getLandingPending = (state, { payload }) => {
    state.pageNotFound = false
};

const getLandingFulfilled = (state, { payload }) => {
    if(payload === 404) {
        state.pageNotFound = true
    } else {
        state.landing_info = payload;
    }

};

const getLandingRejected = (state, payload) => {
    state.landing_info = {};
    state.pageNotFound = true;
};

export const getLandingExtraReducer = (builder) => {
    builder
        .addCase(getLandingInfoThunk.pending, getLandingPending)
        .addCase(getLandingInfoThunk.fulfilled, getLandingFulfilled)
        .addCase(getLandingInfoThunk.rejected, getLandingRejected);
};
