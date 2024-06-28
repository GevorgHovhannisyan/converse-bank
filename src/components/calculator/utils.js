import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import {
  DAYS_IN_MONTH,
  DAYS_IN_YEAR,
  DEPOSIT_TAX_RATE,
  MIN_SAFE_POSITIVE,
  MONTHS_IN_YEAR,
  debugMode,
} from '../../constants/constants';
import { MIN_DEPOSIT } from './constant';

export const isEmpty = (referenceTypeData) => {
  if (typeof referenceTypeData !== 'object' || !referenceTypeData) {
    return true;
  } else if (Array.isArray(referenceTypeData) && !referenceTypeData.length) {
    return true;
  }
  return !Object.keys(referenceTypeData).length;
};

export const compoundInterest = (p, r, t, n = 1) => {
  return p * (1 + r / n) ** (n * t);
};

export const toFixedValue = (currencyID) => {
  switch (Number(currencyID)) {
    case 1: {
      return 1;
    }
    default: {
      return 2;
    }
  }
};

export const calculateDeposit = ({
  rate,
  principal,
  duration,
  shouldSubtractTax,
  interestEveryMonth = false,
  depositMore = false,
  currencyID,
}) => {
  if (shouldSubtractTax) {
    rate = rate * (1 - DEPOSIT_TAX_RATE);
  }

  if (!!(depositMore & interestEveryMonth)) {
    debugMode &&  console.warn(
      "Replenishment and Interest every month checkboxes can't be checked at the same time!"
    );
    return {
      interestGained: 0,
      principalAtTheEndOfPeriod: 0,
      overallAmount: 0,
    };
  }
  const toFixed = toFixedValue(currencyID);

  const today = new Date();
  const endDate = moment().add(duration, 'days');

  const years = moment(endDate).diff(today, 'years');

  const differenceInYears = moment(today).add(years, 'years');
  const days = moment(endDate).diff(differenceInYears, 'days');

  const coefficient = years || 1;

  const leapYearsCount = countLeapYears(today, endDate);
  const fv = compoundInterest(principal, rate / 100, years);
  const dailyRate =
    (coefficient * rate) / (coefficient * DAYS_IN_YEAR + leapYearsCount);
  const interestGained = (
    (principal * duration * dailyRate) / 100 +
    MIN_SAFE_POSITIVE
  ).toFixed(toFixed);
  const interestCapitalization = (
    (fv * days * dailyRate) / 100 +
    MIN_SAFE_POSITIVE
  ).toFixed(toFixed);
  const overallAmount =
    Number(fv) + Number(interestCapitalization) + MIN_SAFE_POSITIVE;

  // without capitalization
  if (!depositMore) {
    return {
      interestGained,
      principalAtTheEndOfPeriod: principal,
      overallAmount: (Number(interestGained) + Number(principal)).toFixed(
        toFixed
      ),
    };
  }

  // with capitalizatin
  return {
    // interestGained: Math.floor(fv - principal),
    interestGained: (overallAmount - principal).toFixed(toFixed),
    // interestGained,
    principalAtTheEndOfPeriod: principal,
    // overallAmount: Math.floor(fv),
    overallAmount: overallAmount.toFixed(toFixed),
  };
};
// leap years count
function countLeapYears(startDate, endDate) {
  let count = 0;
  for (let year = startDate.getFullYear(); year <= endDate.year(); year++) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      count++;
    }
  }
  return count;
}

// take input

export const isBetween = (num, start, end) => num >= start && num < end;

export const findInArray = (arr = [], config) => {
  const {
    currencyID,
    amount,
    durationsDays,
    partialWithdraw,
    depositMore,
    interestEveryMonth,
  } = config;

  const filtered = arr.filter((item) => {
    const { amountFrom, amountTo, durationTo, currency, durationFrom } = item;
    return (
      amount >= amountFrom &&
      amount <= amountTo &&
      durationsDays <= durationTo &&
      durationsDays >= durationFrom &&
      currencyID === currency.id &&
      partialWithdraw === item.partialWithdraw &&
      depositMore === item.depositMore &&
      interestEveryMonth === item.interestEveryMonth
    );
  });

  if (amount !== MIN_DEPOSIT) {
    if (filtered.length > 1 && debugMode ) {
        console.group(
        'There are more than 1 config with this parameter. See the table below!'
      );
        console.table(filtered);
        console.groupEnd();
    }
  }

  return arr.find((item) => {
    const { amountFrom, amountTo, durationFrom, durationTo, currency } = item;
    return (
      amount >= amountFrom &&
      amount <= amountTo &&
      durationsDays <= durationTo &&
      durationsDays >= durationFrom &&
      currencyID === currency.id &&
      partialWithdraw === item.partialWithdraw &&
      depositMore === item.depositMore &&
      interestEveryMonth === item.interestEveryMonth
    );
  });
};

export const floorToDecimal = (num, decimal) => {
  let temp = 1;
  if (decimal) {
    for (let i = 0; i < decimal; i++) {
      temp *= 10;
    }
  }

  return Math.round(num * temp) / temp;
};

export const initDurations = (data = []) => {
  return data.map((item, idx) => {
    const days = item - (item % DAYS_IN_MONTH);

    let month = Math.floor(days / DAYS_IN_MONTH);

    let year = Math.floor(month / MONTHS_IN_YEAR);

    const isFullYear = month % MONTHS_IN_YEAR === 0;

    if (!isFullYear) {
      return {
        id: idx + 1,
        days: days === DAYS_IN_MONTH ? item : days,
        months: {
          show: !(days === DAYS_IN_MONTH),
          langValue: 'months',
          value: month,
        },
        years: {
          show: false,
          langValue: 'years',
          value: year,
        },
        daysInner: {
          show: days === DAYS_IN_MONTH,
          langValue: 'days',
          value: item,
        },
      };
    }

    month = month - year * MONTHS_IN_YEAR;

    return {
      id: idx + 1,
      days,
      months: {
        show: !(month <= 0),
        langValue: 'months',
        value: month,
      },
      years: {
        show: !(year <= 0),
        langValue: 'years',
        value: year,
      },
    };
  });
};

export const MONTHS = {
  0: {
    name: 'jan',
    hy: 'Հունվար',
    id: 0,
  },

  1: {
    name: 'feb',
    hy: 'Փետրվար',

    id: 1,
  },
  2: {
    name: 'mar',
    hy: 'Մարտ',

    id: 2,
  },
  3: {
    name: 'apr',
    hy: 'Ապրիլ',

    id: 3,
  },
  4: {
    name: 'may',
    hy: 'Մայիս',

    id: 4,
  },
  5: {
    name: 'jun',
    hy: 'Հունիս',

    id: 5,
  },
  6: {
    name: 'jul',
    hy: 'Հուլիս',

    id: 6,
  },
  7: {
    name: 'aug',
    hy: 'Օգոստոս',

    id: 7,
  },
  8: {
    name: 'sep',
    hy: 'Սեպտեմբեր',

    id: 8,
  },
  9: {
    name: 'oct',
    hy: 'Հոկտեմբեր',

    id: 9,
  },
  10: {
    name: 'nov',
    hy: 'Նոյեմբեր',

    id: 10,
  },
  11: {
    name: 'dec',
    hy: 'Դեկտեմբեր',

    id: 11,
  },
};

export const numberToTextFormat = (num, lang = {}) => {
  if (!lang || typeof lang !== 'object') {
    return;
  }

  if (num < 1000) {
    return num;
  }

  if (num < 1_000_000) {
    const value = Math.floor(num / 1000);

    return (
      <span>
        {value} {lang.thousand}
      </span>
    );
  }

  if (num < 1_000_000_000) {
    const value = Math.floor(num / 1_000_000);

    return (
      <span>
        {value} {lang.mln}
      </span>
    );
  }

  if (num < 1_000_000_000_000) {
    const value = Math.floor(num / 1_000_000_000);

    return (
      <span>
        {value} {lang.bln}
      </span>
    );
  }

  return <span>{num}</span>;
};

// const getLast = (n) => {
//     switch (n) {
//       case 2:
//       case 3:
//       case 4: {
//         return 2;
//       }
//       default: {
//         return 5
//       }
//     }
// }

export const replace = (amount, isInterest) => {
  const pattern = /(\d)()(?=(\d{3})+(?!\d))/g;

  const inputVal = amount.toString().replace(pattern, '$1 $2');

  if (isInterest && !!amount) {
    return `+ ${inputVal}`;
  }

  return inputVal;
};

// export const getPluralRuleDigit = (num) => {
//   if(num === 1) {
//     return num;
//   }

// if(num <= 10) {
//   return getLast(num)
// }

//   if(num >= 11 && num <= 14) {
//     return 5
//   }

//   const last =  getLast(num % 10)

//   return last;
// }

export const getPluralRuleDigit = (num) => {
  const value = +String(num).slice(-1);
  if (num === 1 || value === 1) {
    return num;
  } else if ((num >= 2 && num <= 4) || (num < 15 && value >= 2 && value <= 4)) {
    return 2;
  }
  return 5;
};

export const getDurationTranslation = (count, id, langCode) => {
  if (langCode !== 'ru') {
    return <FormattedMessage values={{ count }} id={id} />;
  }

  const digit = getPluralRuleDigit(count);

  switch (digit) {
    case 1: {
      return <FormattedMessage id={id + digit} />;
    }
    case 2: {
      return <FormattedMessage id={id + digit} />;
    }
    case 5: {
      return <FormattedMessage id={id + digit} />;
    }
    default:
      break;
  }

  return <FormattedMessage values={{ count: digit }} id={id} />;
};

export const isEditable = (
  isCustom,
  permission,
  { interestEveryMonth, depositMore, partialWithdraw }
) => {
  if (!isCustom) {
    return permission;
  }

  if (interestEveryMonth) {
    return false;
  }
};

export const getDiffDays = (duration) => {
  let months = Math.round(duration / DAYS_IN_MONTH);

  // const durationsTypeID = getDefaultDurationsTypeID(predefined);

  const today = new Date();

  const endOfPeriod = moment().add(months, 'month');

  const diff = endOfPeriod.diff(today, 'days');
  return diff;
};
