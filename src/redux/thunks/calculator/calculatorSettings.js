import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../../service/service';
import { normalizeSettings } from './utils';

export const getCalcSettings = createAsyncThunk('getCalcSettings', async () => {
  const url = `/calculator/settings`;
  const config = {
    method: 'get',
    url: url,
  };
  const response = await apiRequest(config);
  return response.data;
});

const getCalcSettingsPending = (state, { payload }) => {
  state.settings = [];
  state.UI.loadingSettings = true;
};

const getCalcSettingsFullfilled = (state, { payload }) => {
  const { data, limits } = normalizeSettings(payload);
  state.settings = data;
  state.limits = limits;
  state.UI.loadingSettings = false;
};

const getCalcSettingsRejected = (state) => {
  state.settings = [];
  state.UI.loadingSettings = false;
};

export const getCalcSettingsExtra = (builder) => {
  builder
    .addCase(getCalcSettings.pending, getCalcSettingsPending)
    .addCase(getCalcSettings.fulfilled, getCalcSettingsFullfilled)
    .addCase(getCalcSettings.rejected, getCalcSettingsRejected);
};
