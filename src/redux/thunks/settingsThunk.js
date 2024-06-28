import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../service/service";
import { getRouteQrPage } from "../../constants/router";

export const getHomeBanner = createAsyncThunk("getBanner", async () => {
    const url = `/banner/1`;
    const config = {
        method: "get",
        url: url,
    };

    const response = await apiRequest(config);

    return response.data;
});

const getHomeBannerPending = (state) => {
    state.home_banner = [];
    state.skBanner = true
};

const getHomeBannerFulfilled = (state, {payload}) => {
    state.home_banner = payload;
    state.skBanner = false
};

const getHomeBannerRejected = (state) => {
    state.home_banner = [];
};

export const getHomeBannerExtraReducer = (builder) => {
    builder
        .addCase(getHomeBanner.pending, getHomeBannerPending)
        .addCase(getHomeBanner.fulfilled, getHomeBannerFulfilled)
        .addCase(getHomeBanner.rejected, getHomeBannerRejected);
};

export const getSettings = createAsyncThunk("getSettings", async () => {
    const url = `/settings`;
    const config = {
        method: "get",
        url: url,
    };
    const response = await apiRequest(config);

    return response.data;
});

// const getSettingsPending = (state, {payload}) => {
//   state.siteSettings = {};
// };


const getSettingsFulfilled = (state, {payload}) => {
    state.siteSettings = payload;
};

const getSettingsRejected = (state) => {
    state.siteSettings = {};
};

export const getSettingsExtraReducer = (builder) => {
    builder
        // .addCase(getSettings.pending, getSettingsPending)
        .addCase(getSettings.fulfilled, getSettingsFulfilled)
        .addCase(getSettings.rejected, getSettingsRejected);
};

export const getQrPage = createAsyncThunk("getQrPage", async () => {
    const url = `/pages/${getRouteQrPage()}`;
    const config = {
        method: "get",
        url: url,
    };
    const response = await apiRequest(config);

    return response.data;
});

const getQrPending = (state) => {
  state.qrPage = {};
  state.skQrLoading = true
};

const getQrFulfilled = (state, {payload}) => {
  state.qrPage = payload;
  state.skQrLoading = false

};

const getQrRejected = (state) => {
    state.qrPage = {};
};

export const getQrExtraReducer = (builder) => {
    builder
         .addCase(getQrPage.pending, getQrPending)
        .addCase(getQrPage.fulfilled, getQrFulfilled)
        .addCase(getQrPage.rejected, getQrRejected);
};


