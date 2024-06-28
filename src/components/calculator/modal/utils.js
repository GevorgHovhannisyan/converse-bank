

import moment from "moment";
import { DAYS_IN_MONTH } from "../../../constants/constants"
import {  replace, toFixedValue } from "../utils";

export const generateTableData = ({ days, rate, interestOverAll, langID, currencyIcon, percentSign, currencyID,  currencies = [], depositTypeID}) => {
    const months = Math.floor(days / DAYS_IN_MONTH);


    const m = moment(new Date())

    const toFixed = toFixedValue(currencyID)

    const currency = currencies[depositTypeID].find(item => item.id === currencyID)
    const excelData = []

    const today = new Date();

    let prevMonthCummulativeDays = 0
    const renderData =  new Array(months).fill('').map((item, index) => {

      const date = m.add(1, 'month');
      const diff = date.diff(today, 'days');


      const interestPerMonth = interestOverAll * (((diff - prevMonthCummulativeDays) / days) )

      prevMonthCummulativeDays = diff;

      const translations = {
        hy: {
          rate: 'Տոկոսադրույք',
          amount: 'Գումար',
          date: 'Ամսաթիվ',
        },

        en: {
          rate: 'Rate',
          amount: 'Amount',
          date: 'Date',
        },
        ru: {
          rate: 'Процентная ставка',
          amount: 'Сумма',
          date: 'Дата',
        },
      };


      const excelRow = {
        [translations[langID].rate]: rate,
        [translations[langID].amount]: (interestPerMonth).toFixed(toFixed),
        [translations[langID].date]: date.format('DD-MM-YYYY'),
      };

      excelData.push(excelRow);


      return {
        rate,
        amount: replace((interestPerMonth).toFixed(toFixed)),
        // month: MONTHS[monthID].name,
        month: date.format('DD-MM-YYYY'),
        year: "",
        percentSign,
        currencyIcon,
        currency: currency ? currency.icon : 'no Icon',
      };
    });





    return {
      renderData,
      excelData,
    };

}
