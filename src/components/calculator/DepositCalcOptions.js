import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOption,
  setPermissions,
} from '../../redux/slices/calculator/depositCalculator/calculator';
import { depositCalcData } from '../../redux/slices/calculator/depositCalculator/selectors';
import { FormItem } from '../FormItem';

import { DateRange } from './DateRange/DateRange';
import { Switch } from './Switch/Switch';
import {
  getDurationTranslation,
  initDurations,
  numberToTextFormat,
} from './utils'; // isBetween, isEditable,
import { languageSelector } from '../../redux/slices/language/language';
import { MONTHS_IN_YEAR } from '../../constants/constants';
import moment from 'moment';
import { RangeSlider, sliderCurve } from './RangeSlider/Slider';
import './calculator.scss';

const lang = {
  profitable: <FormattedMessage id="Calculator options profitable" />,
  demanded: <FormattedMessage id="Calculator options demanded" />,
  custom: <FormattedMessage id="Calculator options custom" />,
  setAmount: <FormattedMessage id="Calculator options setAmount" />,
  years: <FormattedMessage id="Calculator options years" />,
  partialWithdraw: <FormattedMessage id="Calculator options partialWithdraw" />,
  depositMore: <FormattedMessage id="Calculator options depositMore" />,
  monthlyInterest: <FormattedMessage id="Calculator options monthlyInterest" />,
  thousand: <FormattedMessage id="Thousands" />,
  mln: <FormattedMessage id="Million" />,
  bln: <FormattedMessage id="Billion" />,
};
export const DepositCalcOptions = () => {
  const dispatch = useDispatch();

  const { options, permissions, predefined, limits, currencies } =
    useSelector(depositCalcData);

  const langCode = useSelector(languageSelector);
  const {
    amount,
    currencyID,
    depositMore,
    partialWithdraw,
    interestEveryMonth,
    durationsTypeID,
    depositTypeID,
    isCustom,
  } = options;

  if (!limits[currencyID]) {
    return;
  }

  const { durationButtons, amounts } =
    predefined && predefined[depositTypeID] ? predefined?.[depositTypeID] : [];

  const MAX = limits[currencyID].maximum;
  const MIN = limits[currencyID].minimum;

  const dataRefresh = (data) => {
    dispatch(setOption(data));
  };

  const onDurationClick = (days, id, months, years) => {
    if (!permissions.durations) return;
    let monthsTotal = months;

    if (!!years && months % MONTHS_IN_YEAR === 0) {
      monthsTotal += years * MONTHS_IN_YEAR;
    }

    const today = new Date();

    const endOfPeriod = moment().add(monthsTotal, 'month');

    const diff = endOfPeriod.diff(today, 'days');

    if (monthsTotal === 1) {
      dataRefresh({ durationsDays: days, durationsTypeID: id, monthsTotal });
    } else {
      dataRefresh({ durationsDays: diff, durationsTypeID: id, monthsTotal });
    }
  };

  const onCurrencyClick = (id, iso) => {
    if (!permissions.currency || !limits[id]) return;
    dataRefresh({ currencyID: id, iso, amount: amounts[id] });
  };

  const onBlur = (e) => {
    const temp = e.target.value.split(' ').join('');

    if (isNaN(temp)) return;

    const value = Math.floor(+temp);
    if (value < limits[currencyID].minimum) {
      return dataRefresh({ amount: limits[currencyID].minimum });
    }

    if (value > limits[currencyID].maximum) {
      return dataRefresh({ amount: limits[currencyID].maximum });
    }
  };

  const onChangeAmount = (e) => {
    if (isNaN(e)) return;

    const value = Math.floor(+e);

    dataRefresh({ amount: value });
  };

  const onChangeOption = (value, name) => {
    if (isCustom) {
      if (name === 'interestEveryMonth') {
        dispatch(setPermissions({ withdraw: !value, depositMore: !value }));
      } else if (name === 'partialWithdraw') {
        dispatch(
          setPermissions({ interestEveryMonth: !value && !depositMore })
        );
      } else if (name === 'depositMore') {
        dispatch(
          setPermissions({ interestEveryMonth: !value && !partialWithdraw })
        );
      }
    }

    dataRefresh({ [name]: value });
  };

  // ---- render ------

  const renderDurations = () => {
    const durations = initDurations(durationButtons);
    return durations.map(({ days, daysInner, id, months, years }) => {
      let className = '';
      if (id === durationsTypeID) {
        className += ' selected ';
      }
      if (!permissions.durations) {
        className += ' disabled ';
      }

      const year = years.show && (
        <>
          {years.value + ' '}
          {getDurationTranslation(years.value, 'Years', langCode)}
        </>
      );

      const month = months.show && (
        <>
          {months.value + ' '}
          {getDurationTranslation(months.value, 'Months', langCode)}
        </>
      );

      const dayInner = daysInner?.show && (
        <>
          {daysInner.value + ' '}
          {getDurationTranslation(daysInner.value, 'Days', langCode)}
        </>
      );

      return (
        <button
          disabled={!permissions.durations}
          onClick={() => onDurationClick(days, id, months.value, years.value)}
          className={className}
          key={id}
        >
          {year} {month} {dayInner}
        </button>
      );
    });
  };

  let currencyIcon = null;
  const renderCurrencies = () => {
    return currencies[depositTypeID].map(({ id, sign: icon, iso }) => {
      let className = '';
      if (id === currencyID) {
        className += 'selected';
        currencyIcon = icon;
      }
      if (!permissions.currency) {
        className += ' disabled';
      }
      return (
        <button
          disabled={!permissions.currency}
          className={className}
          onClick={() => onCurrencyClick(id, iso)}
          key={id}
        >
          {icon}
        </button>
      );
    });
  };

  const pattern = /(\d)()(?=(\d{3})+(?!\d))/g;

  const inputVal = amount.toString().replace(pattern, '$1 $2');
  return (
    <>
      <div className="currency_options">
        <div className="options_title"> {lang.setAmount}</div>
        <div className="options_list">{renderCurrencies()}</div>
      </div>

      <div className="amount_block">
        <label className="amount_size">
          <span className="hidden_label">
            <FormattedMessage id="Amount size" />
          </span>
          <input
            disabled={!permissions.amount}
            min={MIN}
            max={MAX}
            onBlur={onBlur}
            value={inputVal}
            onChange={(e) => onChangeAmount(e.target.value.split(' ').join(''))}
            id="amount-number"
          />
          <span className="showed_amount">
            <span className="showed_size">{inputVal}</span> {currencyIcon}
          </span>
        </label>

        <RangeSlider
          className="single-thumb"
          min={MIN}
          amount={amount}
          max={MAX}
          stepsInRange={1000}
          onChange={(value) => {
            onChangeAmount((sliderCurve(value, amount)));
          }}
        />
        {/* <Range
          className="single-thumb"
          defaultValue={[0, endRef.current === 0
            ? (Number(amount) / MAX) * 100
            : (Number(amount) / MAX) * endRef.current]}
          value={[
            0,
            endRef.current === 0
              ? (amount / MAX) * 100
              : (amount / MAX) * endRef.current,
          ]}
          thumbsDisabled={[true, false]}
          rangeSlideDisabled={true}
          onEnd={onSlideEnd}
          onInput={onSlideChange}
        /> */}

        <div className="range_hints">
          <span> {numberToTextFormat(limits[currencyID].minimum, lang)} </span>
          <span> {numberToTextFormat(limits[currencyID].maximum, lang)} </span>
        </div>
      </div>

      <div className="duration_options">
        <div className="options_title">
          <FormattedMessage id="Term of deposit" />
        </div>
        <div className="options_list">
          {renderDurations()}
          <DateRange disabled={!permissions.durations} />
        </div>
      </div>

      <div className="switch_btns">
        <FormItem
          onChange={(e) => onChangeOption(e.target.checked, 'partialWithdraw')}
          checked={partialWithdraw}
          Component={Switch}
          disabled={!permissions.withdraw}
          className="switch_check"
          label={lang.partialWithdraw}
        />

        <FormItem
          onChange={(e) => onChangeOption(e.target.checked, 'depositMore')}
          checked={depositMore}
          disabled={!permissions.depositMore}
          Component={Switch}
          className="switch_check"
          label={lang.depositMore}
        />

        <FormItem
          onChange={(e) =>
            onChangeOption(e.target.checked, 'interestEveryMonth')
          }
          className="switch_check"
          disabled={!permissions.interestEveryMonth}
          checked={interestEveryMonth}
          Component={Switch}
          label={lang.monthlyInterest}
        />
      </div>
    </>
  );
};
