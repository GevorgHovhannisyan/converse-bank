import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../service/service';
import { sortCurrency } from '../../helpers/Utils';
import moment from 'moment';

export const getHomeSlider = createAsyncThunk('getSlider', async (pageId) => {
  const url = `/slides/${pageId}`;
  const config = {
    method: 'get',
    url: url,
  };

  const response = await apiRequest(config);

  return response.data;
});
const getHomeSliderPending = (state, { payload }) => {
  state.slider = [];
  state.skTopSlider = true;
};

const getHomeSliderFulfilled = (state, { payload }) => {
  state.slider = payload;
  state.skTopSlider = false;
};

const getHomeSliderRejected = (state) => {
  state.slider = [];
};

export const getHomeExtraReducer = (builder) => {
  builder
      .addCase(getHomeSlider.pending, getHomeSliderPending)
      .addCase(getHomeSlider.fulfilled, getHomeSliderFulfilled)
      .addCase(getHomeSlider.rejected, getHomeSliderRejected);
};

export const getHomePage = createAsyncThunk('getHomePage', async (pageId) => {
  const url = `/page/is-home/1`;
  const config = {
    method: 'get',
    url: url,
  };

  const response = await apiRequest(config);

  return response.data;
});


const getHomePagePending = (state, { payload }) => {
  state.homePage = {};
  state.skTopSlider = true;
};

const getHomePagerFulfilled = (state, { payload }) => {
  state.homePage = payload;
  state.skTopSlider = false;
};

const getHomePageRejected = (state) => {
  state.homePage = {};
};

export const getHomePageExtraReducer = (builder) => {
  builder
      .addCase(getHomePage.pending, getHomePagePending)
      .addCase(getHomePage.fulfilled, getHomePagerFulfilled)
      .addCase(getHomePage.rejected, getHomePageRejected);
};


export const getCurrencies = createAsyncThunk('getCurrencies', async () => {
  const url = `/currencyrates`;
  const config = {
    method: 'get',
    url: url,
  };

  const response = await apiRequest(config);

  return response.data;
});

// const getCurrencyPending = (state, { payload }) => {
//   state.currencies = [];
// };

const getCurrencyFulfilled = (state, { payload }) => {
  const { currencySort, maxLastUpdateArr } = sortCurrency(payload);
  state.currencyData = payload;
  let moments = maxLastUpdateArr.map((d) => moment(d.rate_date));
  const maxDate = moment.max(moments).format('DD.MM.YYYY HH:mm');
  state.currencyLastUpdate = maxDate;
  state.currencies = [...currencySort];

  const options = [];
  if (currencySort && currencySort.length) {
    const findCash = currencySort.find(currency => currency.title === 'Cash');

    if (findCash) {
      options.push({ value: "AMD", label: "AMD" })
      for (let i = 0; i < findCash.data.length; i++) {
        const iso = findCash.data[i].currency.iso
        options.push({ value: iso, label: iso })

      }

    }

  }
  state.currencyOptions = options
};

const getCurrencyRejected = (state) => {
  state.currencies = [];
};

export const getCurrencyExtraReducer = (builder) => {
  builder
    // .addCase(getCurrencies.pending, getCurrencyPending)
    .addCase(getCurrencies.fulfilled, getCurrencyFulfilled)
    .addCase(getCurrencies.rejected, getCurrencyRejected);
};
