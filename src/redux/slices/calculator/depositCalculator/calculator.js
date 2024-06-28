import { createSlice, current } from '@reduxjs/toolkit';
import {
  MAX_DEPOSIT,
  MIN_DEPOSIT,
} from '../../../../components/calculator/constant';
import { findInArray } from '../../../../components/calculator/utils';
import { getCalcPredefinedExtra } from '../../../thunks/calculator/calcPredefined';
import { getCalcSettingsExtra } from '../../../thunks/calculator/calculatorSettings';
import { fill } from '../utils';
import { debugMode } from '../../../../constants/constants';

const initialState = {
  settings: [],

  permissions: {
    withdraw: true,
    durations: true,
    depositMore: true,
    interestEveryMonth: true,
    currency: true,
    amount: true,
  },

  predefined: {},

  calculationResults: {
    depositRate: 1,
    depositRateAfterTax: 1,
    principalAtTheEndOfPeriod: 1,
    interestAtTheEndOfPeriod: 1,
    overallAmount: 1,
  },

  options: {
    depositTypeID: 1,
    currencyID: 1,
    iso: 'AMD',
    amount: MIN_DEPOSIT,
    durationsDays: 60,
    durationsTypeID: 1,
    interestEveryMonth: false,
    partialWithdraw: false,
    monthsTotal: 0,

    depositMore: false,
    step: 1,

    minAmount: MIN_DEPOSIT,
    maxAmount: MAX_DEPOSIT,
  },
  limits: {},
  currencies: [],

  UI: {
    loadingSettings: true,
    loadingPredefined: true,
    modalVisible: false,
  },

  skCalculator: false,
};

const calculator = createSlice({
  name: 'depositCalculator',
  initialState,
  reducers: {
    setOption: (state, { type, payload }) => {
      const target = Object.assign({}, state.options);
      const result = fill(payload, target);
      const res = findInArray(current(state).settings, result)
     
      if(!res && debugMode) {
        const {amount, currencyID, durationsDays, partialWithdraw, depositMore, interestEveryMonth } = result;
        
        console.group('There are no option for this params');
        console.table({
           Currency: currencyID,
           Amount: amount, 
           Days: durationsDays,
           'Partial withdraw': partialWithdraw,
           'Replenishment': depositMore,
           'Interest every month': interestEveryMonth     
          });
          console.groupEnd()
      }

         state.options = result;
     
    },
    setPermissions: (state, { payload }) => {
      const target = Object.assign({}, state.permissions);
      const result = fill(payload, target);
      state.permissions = result;
    },

    setCalcResults: (state, { payload }) => {
      const target = Object.assign({}, state.calculationResults);
      const result = fill(payload, target);
      state.calculationResults = result;
    },
    setUI: (state, { payload }) => {
      const target = Object.assign({}, state.UI);
      const result = fill(payload, target);
      state.UI = result;
    },
  },
  extraReducers: (builder) => {
    getCalcSettingsExtra(builder);
    getCalcPredefinedExtra(builder);
  },
});

export const limits = (state) => state;
export const skCalculatorSelector = (state) => {
  return state.calculator.depositCalculator.skCalculator;
};

export const calculatorUISelector = (state) => state.calculator.depositCalculator.UI;

export const { setOption, setPermissions, setCalcResults, setUI } =
  calculator.actions;

export default calculator.reducer;
