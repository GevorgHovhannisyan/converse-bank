import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../service/service';



export const subscribeMember = createAsyncThunk(
  'subscribeMember',
  async (payload) => {
    const url = `/subscribe`;

    const config = {
      method: 'post',
      url: url,
      data: payload,
    };

    const response = await apiRequest(config);
    return response.data;
  }
);

const subscribeMemberPending = (state) => {
  state.pendingSubscribed = true;
  state.subscribeTextMessage = ''
};

const subscribeMemberThunkFulfilled = (state, { payload }) => {
  state.userSubscribed = true;
  state.subscribeTextMessage = payload.Message?payload.Message:payload.message?payload.message:'';
  state.pendingSubscribed = false;
};

const subscribeMemberThunkRejected = (state) => {
  state.userSubscribed = false;
  state.pendingSubscribed = false;
  state.subscribeTextMessage = ''
};

export const subscribeMemberExtraReducer = (builder) => {
  builder
    .addCase(subscribeMember.pending, subscribeMemberPending)
    .addCase(subscribeMember.fulfilled, subscribeMemberThunkFulfilled)
    .addCase(subscribeMember.rejected, subscribeMemberThunkRejected)
};

export const becomeMember = createAsyncThunk(
  'becomeMember',
  async (payload) => {
    const url = `/new-member`;

    const config = {
      method: 'post',
      url: url,
      data: payload,
    };

    const response = await apiRequest(config);
    return response.data;
  }
);



const becomeMemberPending = (state) => {
  state.pendingCustomer = true;
};

const becomeMemberThunkFulfilled = (state, { payload }) => {
  state.customerSubscribed = true;
  state.becomeTextTitle = payload.message;
  state.pendingCustomer = false;
};

const becomeMemberThunkRejected = (state, payload) => {
  
  state.customerSubscribed = false;
  state.pendingCustomer = false;
  state.showErrorMessage = true;
  state.subscribeErrorMessage = true;
  state.becomeTextTitle = 'reCaptchaError';
};

export const becomeMemberExtraReducer = (builder) => {
  builder
    .addCase(becomeMember.pending, becomeMemberPending)
    .addCase(becomeMember.fulfilled, becomeMemberThunkFulfilled)
    .addCase(becomeMember.rejected, becomeMemberThunkRejected)
};