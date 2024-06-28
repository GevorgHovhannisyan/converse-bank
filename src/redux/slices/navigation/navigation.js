import { createSlice } from "@reduxjs/toolkit";
import { getMenuExtraReducer, getFooterExtraReducer,getSocialsListExtraReducer,getFooterMenuExtraReducer,getPartnersListExtraReducer} from "../../thunks/menus/menuThunk"
import { getHelmetExtraReducer} from "../../thunks/menus/pageThunk"

const initialState = {
  main: [],
  footer_about: {},
  socials_list: {},
  footer_menu: {},
  partners_list: {},
  menuData: {},
  topMenuActiveID: null,
  skLoading: false,
  skFooterMenu: false,
  skSocials: false,
  skFooterAbout: false,
  skPartners: false,
  helment_list: {},
  page_data: {},
};

const headerNavSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigation: (state, { payload }) => {
      state.headerNav = payload;
    },

    setTopMenuActiveID: (state, { payload }) => {
      state.topMenuActiveID = payload;
    }
  },
  extraReducers: (builder) => {
    getMenuExtraReducer(builder);
    getFooterExtraReducer(builder);
    getSocialsListExtraReducer(builder);
    getFooterMenuExtraReducer(builder);
    getPartnersListExtraReducer(builder);
    getHelmetExtraReducer(builder);
    // getFooterInfoExtraReducer(builder)
}
});

export const main_navigation = (state) => state.navigation.main;
export const footer_about = (state) => state.navigation.footer_about;
export const socialsList = (state) => state.navigation.socials_list;
export const footer_menu = (state) => state.navigation.footer_menu;
export const partners_list = (state) => state.navigation.partners_list;
export const topMenuID = (state) => state.navigation.topMenuActiveID;
export const headerMenu = (state) => state.navigation.menuData;
export const menuSkLoading = (state) => state.navigation.skLoading;
export const skFooterMenuLoading = (state) => state.navigation.skFooterMenu;
export const skSocialsLoading = (state) => state.navigation.skSocials;
export const skPartnersLoading = (state) => state.navigation.skPartners;
export const skFooterAboutLoading = (state) => state.navigation.skFooterAbout;
// export const individual = (state) => state.navigation.individual;
//export const helmentList = (state) => state.navigation.helment_list;
export const pageData = (state) => state.navigation.page_data;

export const { setTopMenuActiveID } = headerNavSlice.actions;

export default headerNavSlice.reducer;
