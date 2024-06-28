import { createSlice } from "@reduxjs/toolkit";

import { getHomeBannerExtraReducer, getSettingsExtraReducer,getQrExtraReducer } from "../../thunks/settingsThunk";

const initialState = {
  home_banner: {},
  siteSettings: {},
  skBanner: false,
  skQrLoading: false
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getHomeBannerExtraReducer(builder);
    getSettingsExtraReducer(builder);
    getQrExtraReducer(builder);
  },
});
export const homeBannerSelector = (state) => state.settings.home_banner;
export const siteSettingsSelector = (state) => state.settings.siteSettings;
export const skBannerLoading = (state) => state.skBanner;
export const skQrLoading = (state) => state.settings.skQrLoading;
export const qrPage = (state) => state.settings.qrPage;


export default settingsSlice.reducer;
