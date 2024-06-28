import { createSlice } from '@reduxjs/toolkit';
import {
  subscribeMemberExtraReducer,
  becomeMemberExtraReducer,
} from '../../thunks/forms/becomeMemberThunk';

const initialState = {
  userSubscribed: false,
  pendingSubscribed: false,
  becomeTextTitle: '',
  pendingCustomer: false,
  customerSubscribed: false,
  subscribeErrorMessage: null,
  showErrorMessage: false,
  subscribeTextMessage: '',
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setSubscribeUser: (state, { payload }) => {
      state.userSubscribed = payload;
    },
    setCustomerSubscribed: (state, { payload }) => {
      state.customerSubscribed = payload;
    },
    setSubscribeErrorMessage: (state, { payload }) => {
      state.showErrorMessage = payload;
    },
    
  },
  extraReducers: (builder) => {
    subscribeMemberExtraReducer(builder);
    becomeMemberExtraReducer(builder);
  },
});

export const userSubscribedSelector = (state) => state.forms.userSubscribed;
export const subscribeTextSelector = (state) => state.forms.subscribeTextMessage;
export const pendingSubscribedSelector = (state) =>
  state.forms.pendingSubscribed;
export const pendingCustomerSelector = (state) => state.forms.pendingCustomer;
export const customerSubscribedSelector = (state) => state.forms.customerSubscribed;
export const becomeTextTitleSelector = (state) => state.forms.becomeTextTitle;
export const showErrorMessageSelector = (state) => state.forms.showErrorMessage;
export const subscribeErrorMessageSelector = (state) => state.forms.subscribeErrorMessage;


export const { setSubscribeUser, setCustomerSubscribed, setSubscribeErrorMessage } = formsSlice.actions;

export default formsSlice.reducer;
