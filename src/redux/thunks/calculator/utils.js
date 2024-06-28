// import { DAYS_IN_MONTH } from '../../../helpers/Constants';
import { normalizeList } from '../../../helpers/normalizer';
import { canEdit } from '../../slices/calculator/utils';

const settingsFields = {
  id: 'id',
  amount_from: 'amountFrom',
  amount_to: 'amountTo',
  capitalization: 'interestEveryMonth',
  created_at: 'createdAt',
  duration_from: 'durationFrom',
  duration_to: 'durationTo',
  percent: 'interestRate',
  status: 'status',
  updated_at: 'updatedAt',
  with_partial_withdrawal: 'partialWithdraw',
  with_replenishment: 'depositMore',
  currency: {
    normalizedName: 'currency',
    data: {
      id: 'id',
      use_for_deposites: 'useForDeposits',
      created_at: 'createdAt',
      iso: 'iso',
      position: 'position',
      sign: 'sign',
      status: 'status',
      updated_at: 'updatedAt',
      use_for_loand: 'useForLoans',
      use_for_rates: 'useForRates',
    },
  },
};


const currencyFields = {
  id: 'id',
  use_for_deposites: 'useForDeposits',
  created_at: 'createdAt',
  iso: 'iso',
  position: 'position',
  sign: 'sign',
  status: 'status',
  updated_at: 'updatedAt',
  use_for_loand: 'useForLoans',
  use_for_rates: 'useForRates',

}


const predefinedFields = {
  id: 'id',
  is_custom: 'isCustom',
  title: 'title',
  capitalization_editable: 'capitalizationEditable',
  with_replenishment_editable: 'depositMoreEditable',
  with_replenishment: 'depositMore',
  duration_editable: 'durationEditable',
  currency_editable: 'currencyEditable',
  amount_editable: 'amountEditable',
  with_partial_withdrawal_editable: 'partialWithdrawEditable',
  amount: 'amount',
  capitalization: 'interestEveryMonth',
  created_at: 'createdAt',
  duration: 'duration',
  status: 'status',
  updated_at: 'updatedAt',
  with_partial_withdrawal: 'partialWithdraw',
  duration_buttons: 'durationButtons',
  currencies: 'currencies',
  currency: {
    normalizedName: 'currency',
    data: {
      id: 'id',
      use_for_deposites: 'useForDeposits',
      created_at: 'createdAt',
      iso: 'iso',
      position: 'position',
      sign: 'sign',
      status: 'status',
      updated_at: 'updatedAt',
      use_for_loand: 'useForLoans',
      use_for_rates: 'useForRates',
    },
  },

  amounts: 'amounts'


};

export const normalizeSettings = (data = []) => {
  const limits = data.reduce((acc, item) => {

    if (!(item.currency.id in acc)) {
      acc[item.currency.id] = {};
      acc[item.currency.id].minimum = item.amount_from;
      acc[item.currency.id].maximum = item.amount_to;
      acc[item.currency.id].icon = item.currency.sign || item.currency.iso;
      acc[item.currency.id].id = item.currency.id;

    } else {
      if (acc[item.currency.id].minimum > item.amount_from) {
        acc[item.currency.id].minimum = item.amount_from;
      }

      if (acc[item.currency.id].maximum < item.amount_to) {
        acc[item.currency.id].maximum = item.amount_to;
      }

      acc[item.currency.id].icon = item.currency.sign;
      acc[item.currency.id].id = item.currency.id;

    }

    return acc;
  }, {});




  // const currencies = Object.values(limits).map(item => ({icon: item.icon, id: item.id}))

  const res = normalizeList(data, settingsFields);
  const adapted = res.map((item) => {
    item = {
      ...item,
      partialWithdraw: canEdit(item.partialWithdraw),
      interestEveryMonth: canEdit(item.interestEveryMonth),
      depositMore: canEdit(item.depositMore),
    };

    return item;
  });

  return {
    data: adapted,
    limits,
    // currencies
  };
};

export const normalizePredefined = (data = []) => {
  const res = normalizeList(data, predefinedFields);

  const currencies = {};

  const temp = res.reduce((acc, item) => {

    const normalizedCurrencies = normalizeList(item.currencies,currencyFields )
    currencies[item.id] = normalizedCurrencies.sort((first, next) => first.position - next.position)
    if (item.durationButtons) {
      item.durationButtons = item.durationButtons
        .split(',')
        .map((item) => Number(item));
    } else {
      item.durationButtons = [];
    }
    item.durationsTypeID =
      item.durationButtons.findIndex(
        (singleDurationItem) => Math.abs(singleDurationItem - item.duration) < 9
      ) + 1;

    acc[item.id] = item;
    return acc;
  }, {});

  return {
    currencies,
    predefined: temp,
  }
};

export const getDays = (durationButtons, isEditable, duration) => {
  if (!isEditable) {
    return duration || 0;
  }

  if (durationButtons && durationButtons.length) {
    return Math.floor(durationButtons[0]);
  }

  return 0;
};

export const getDefaultDurationsTypeID = (data) => {
  if (!Object.keys(data).length) {
    return 0;
  }

  return Object.values(data)[0].durationsTypeID;
};
