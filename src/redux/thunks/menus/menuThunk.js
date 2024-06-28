import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../service/service';
import { getDefaultID, normalizeMenuItems } from './utils';

//Header menu
export const getMenuThunk = createAsyncThunk(
  'getMenu',
  async ({ normalizePath }) => {
    const url = `/menus/main-menu`;
    const config = {
      method: 'get',
      url: url,
    };
    const response = await apiRequest(config);
    return { data: response.data, normalizePath };
  }
);

const getMenuThunkPending = (state) => {
  state.skLoading = true;
};

const getMenuThunkFulfilled = (state, { payload }) => {
  const { menus = [] } = payload.data;
  let findMenu = null;
  state.main = menus;
  state.skLoading = false;
  state.menuData = normalizeMenuItems(menus);

  if (payload.normalizePath) {
    findMenu = menus.find((menu) => menu.url === payload.normalizePath);
  }

  if (!state.topMenuActiveID) {
    if (findMenu) {
      state.topMenuActiveID = findMenu.id;
    } else {
      state.topMenuActiveID = getDefaultID(menus);
    }
  }
};

const getMenuThunkRejected = (state) => {
  state.main = [];
};

export const getMenuExtraReducer = (builder) => {
  builder
    .addCase(getMenuThunk.pending, getMenuThunkPending)
    .addCase(getMenuThunk.fulfilled, getMenuThunkFulfilled)
    .addCase(getMenuThunk.rejected, getMenuThunkRejected);
};
//Header menu

//------------------Footer about menu-----------------------

export const getFooterAboutThunk = createAsyncThunk(
  'getFooterAbout',
  async () => {
    const url = `/menus/about-us`;
    const config = {
      method: 'get',
      url: url,
    };
    const response = await apiRequest(config);

    return response.data;
  }
);

const getFooterThunkPending = (state, { payload }) => {
  state.footer_about = [];
  state.skFooterAbout = true;
};

const getFooterThunkFulfilled = (state, { payload }) => {
  let about_info = {};
  if (payload.menus && payload.menus.length) {
    about_info = payload.menus[0];
  }
  state.footer_about = about_info;
  state.skFooterAbout = false;
};

const getFooterThunkRejected = (state) => {
  state.footer_about = [];
};

export const getFooterExtraReducer = (builder) => {
  builder
    .addCase(getFooterAboutThunk.pending, getFooterThunkPending)
    .addCase(getFooterAboutThunk.fulfilled, getFooterThunkFulfilled)
    .addCase(getFooterAboutThunk.rejected, getFooterThunkRejected);
};

//+++++++++++++Footer about menu+++++++++++++++++++++

//------------------socials list-----------------------

export const getSocialsListThunk = createAsyncThunk(
  'getSocialsList',
  async () => {
    const url = `/menus/social`;
    const config = {
      method: 'get',
      url: url,
    };
    const response = await apiRequest(config);

    return response.data;
  }
);

const getSocialsListThunkPending = (state, { payload }) => {
  state.socials_list = [];
  state.skSocials = true;
};

const getSocialsListThunkFulfilled = (state, { payload }) => {
  state.socials_list = payload;
  state.skSocials = false;
};

const getSocialsListThunkRejected = (state) => {
  state.socials_list = [];
};

export const getSocialsListExtraReducer = (builder) => {
  builder
    .addCase(getSocialsListThunk.pending, getSocialsListThunkPending)
    .addCase(getSocialsListThunk.fulfilled, getSocialsListThunkFulfilled)
    .addCase(getSocialsListThunk.rejected, getSocialsListThunkRejected);
};

//+++++++++++++socials list+++++++++++++++++++++

//------------------Footer Menus-----------------------

export const getFooterMenuThunk = createAsyncThunk(
  'getFooterMenu',
  async () => {
    const url = `/menus/footer`;
    const config = {
      method: 'get',
      url: url,
    };
    const response = await apiRequest(config);

    return response.data;
  }
);

const getFooterMenuThunkPending = (state, { payload }) => {
  state.footer_menu = [];
  state.skFooterMenu = true;
};

const getFooterMenuThunkFulfilled = (state, { payload }) => {
  state.footer_menu = payload;
  state.skFooterMenu = false
};

const getFooterMenuThunkRejected = (state) => {
  state.footer_menu = [];
};

export const getFooterMenuExtraReducer = (builder) => {
  builder
    .addCase(getFooterMenuThunk.pending, getFooterMenuThunkPending)
    .addCase(getFooterMenuThunk.fulfilled, getFooterMenuThunkFulfilled)
    .addCase(getFooterMenuThunk.rejected, getFooterMenuThunkRejected);
};

//+++++++++++++Footer Menus+++++++++++++++++++++

//------------------Partners Menus-----------------------

export const getPartnersListThunk = createAsyncThunk(
  'getPartnersList',
  async () => {
    const url = `/menus/partners`;
    const config = {
      method: 'get',
      url: url,
    };
    const response = await apiRequest(config);

    return response.data;
  }
);

const getPartnersListThunkPending = (state, { payload }) => {
  state.partners_list = [];
};

const getPartnersListThunkFulfilled = (state, { payload }) => {
  state.partners_list = payload;
};

const getPartnersListThunkRejected = (state) => {
  state.partners_list = [];
};

export const getPartnersListExtraReducer = (builder) => {
  builder
    .addCase(getPartnersListThunk.pending, getPartnersListThunkPending)
    .addCase(getPartnersListThunk.fulfilled, getPartnersListThunkFulfilled)
    .addCase(getPartnersListThunk.rejected, getPartnersListThunkRejected);
};

//+++++++++++++Partners block+++++++++++++++++++++

//text info footer

//text info footer
