import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDiffDays } from "../../../components/calculator/utils";
import { apiRequest } from "../../../service/service";
import { canEdit } from "../../slices/calculator/utils";
import {  getDefaultDurationsTypeID, normalizePredefined } from "./utils";

export const getCalcPredefined = createAsyncThunk("getCalcPredefined", async () => {
  const url = `/calculator/predefined`;
  const config = {
    method: "get",
    url: url,
  };
  const response = await apiRequest(config);
  return response.data;
});

const getCalcPredefinedPending = (state) => {
  state.UI.loadingPredefined = true;
  state.predefined = {};
  state.skCalculator = true
};

const getCalcPredefinedFullfilled = (state,  {payload}) => {
  const {currencies, predefined} = normalizePredefined(payload);

  if (!Object.keys(predefined).length) {
    return;
  }

  const [depositData] = payload;

  const {
    amountEditable,
    capitalizationEditable,
    currencyEditable,
    depositMoreEditable,
    durationEditable,
    partialWithdrawEditable,
    // durationButtons,
    isCustom,
  } = predefined[depositData.id];

  state.permissions = {
    withdraw: canEdit(partialWithdrawEditable),
    durations: canEdit(durationEditable),
    depositMore: canEdit(depositMoreEditable),
    interestEveryMonth: canEdit(capitalizationEditable),
    currency: canEdit(currencyEditable),
    amount: canEdit(amountEditable),
    isCustom: canEdit(isCustom)
  };

  state.currencies = currencies;

  const {
    id,
    amounts,
    duration,
    interestEveryMonth,
    partialWithdraw,
    depositMore,
    
  } = predefined[depositData.id];

  const { id: currencyID, iso } = currencies[id][0];

  const durationDays = getDiffDays(duration);


  const durationsTypeID = getDefaultDurationsTypeID(predefined);



  const temp = {
    depositTypeID: id,
    currencyID,
    iso,
    amount: amounts[currencyID],
    durationsTypeID,
    durationsDays: durationDays,
    interestEveryMonth: canEdit(interestEveryMonth),
    partialWithdraw: canEdit(partialWithdraw),
    depositMore: canEdit(depositMore),
    isCustom: canEdit(isCustom),
  };




  if(isCustom) {
    if(temp.interestEveryMonth) {
        state.permissions.withdraw = !temp.interestEveryMonth
        state.permissions.depositMore = !temp.interestEveryMonth
    } 

    if(temp.partialWithdraw){
      state.permissions.interestEveryMonth = !temp.partialWithdraw
    }
    if(temp.depositMore){
      state.permissions.interestEveryMonth = !temp.depositMore
    }


  }


  state.predefined = {
    ...predefined,
  };

  state.options = {
    ...state.options,
    ...temp,
  };
  state.UI.loadingPredefined = false;

  state.skCalculator = false


};

const getCalcPredefinedRejected = (state) => {
  state.predefined = {};
  state.UI.loadingPredefined = false;

};

export const getCalcPredefinedExtra = (builder) => {
  builder
    .addCase(getCalcPredefined.pending, getCalcPredefinedPending)
    .addCase(getCalcPredefined.fulfilled, getCalcPredefinedFullfilled)
    .addCase(getCalcPredefined.rejected, getCalcPredefinedRejected);
};
