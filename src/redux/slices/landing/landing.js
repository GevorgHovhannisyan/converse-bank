import { createSlice } from "@reduxjs/toolkit";
import { getLandingExtraReducer } from "../../thunks/landing";


const initialState = {
    landing_info: {},
    pageNotFound: false
};

const landingSlice = createSlice({
    name: "landing",
    initialState,
    reducers: {
        setServices: (state, { payload }) => {
            state.slider = payload;
        },
    },
    extraReducers: (builder) => {
        getLandingExtraReducer(builder);
    },
});

export const landingSelector = (state) => state.landing.landing_info;
export const notFoundSelector = (state) => state.landing.pageNotFound;

export default landingSlice.reducer;
