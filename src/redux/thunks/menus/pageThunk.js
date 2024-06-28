import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../service/service";
//------------------Helmet-----------------------

export const getHelmetThunk = createAsyncThunk("getHelmetThunk", async () => {
    const url = `/page/1`;
    const config = {
        method: "get",
        url: url,
    };
    const response = await apiRequest(config);

    return response.data;
});

const getHelmetThunkPending = (state, {payload}) => {
    state.page_data = {};
};

const getHelmetThunkFulfilled = (state, {payload}) => {
    state.page_data = payload;
};

const getHelmetThunkRejected = (state) => {
    state.page_data = {};
};

export const getHelmetExtraReducer = (builder) => {
    builder
        .addCase(getHelmetThunk.pending, getHelmetThunkPending)
        .addCase(getHelmetThunk.fulfilled, getHelmetThunkFulfilled)
        .addCase(getHelmetThunk.rejected, getHelmetThunkRejected);
};

//+++++++++++++Helmet+++++++++++++++++++++





