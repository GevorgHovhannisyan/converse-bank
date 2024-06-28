import { createSlice } from "@reduxjs/toolkit";
import { getHomeExtraReducer, getCurrencyExtraReducer,getHomePageExtraReducer } from "../../thunks/homeThunk";

const initialState = {
  slider: [],
  currencies: [],
  skTopSlider: false,
  currencyLastUpdate: null,
  currencyOptions: [],
  currencyData: {},
  homePage:{},
  currencyList: {
    iso1: { value: 'AMD', label: 'AMD' },
    iso2: { value: 'USD', label: 'USD' }
  }

};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setNavigation: (state, { payload }) => {
      state.slider = payload;
    },
    setCurrencyIso: (state, { payload }) => {
      state.currencyList = payload
    },
  },
  extraReducers: (builder) => {
    getHomeExtraReducer(builder);
    getCurrencyExtraReducer(builder);
    getHomePageExtraReducer(builder);
  },
});


export const homeSliderSelector = (state) => state.home.slider;
export const currencySelector = (state) => state.home.currencies;
export const topSliderSkLoading = (state) => state.home.skTopSlider;
export const currencyLastDateSelector = (state) => state.home.currencyLastUpdate;
export const currencyOptions = (state) => state.home.currencyOptions;
export const currencyInfo = (state) => state.home.currencyData;
export const currencyList = (state) => state.home.currencyList;
export const { setHomeSlider, setCurrencyIso } = homeSlice.actions;
export const home_page = (state) => state.home.homePage;

export default homeSlice.reducer;
