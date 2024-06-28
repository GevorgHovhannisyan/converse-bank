import { combineReducers } from '@reduxjs/toolkit';

import headerNavSlice from "./slices/navigation/navigation";
import languageSlice from "./slices/language/language";
import homeSlice from "./slices/home/home";
import calculatorSlice from './slices/calculator/calculator';
import serviceSlice from "./slices/service/service";
import settingsSlice from "./slices/settings/settings";
import blogSlice from "./slices/blog/blog";
import formsSlice from "./slices/forms/forms";
import landing from "./slices/landing/landing";

export const rootReducer = combineReducers({
  navigation: headerNavSlice,
  language: languageSlice,
  home: homeSlice,
  calculator: calculatorSlice,
  service: serviceSlice,
  settings: settingsSlice,
  blog: blogSlice,
  forms: formsSlice,
  landing: landing
});
