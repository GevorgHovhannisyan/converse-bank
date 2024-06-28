import { useEffect, useState } from 'react';
import { CalcResult } from './CalcResult';
import { CalculationOptions } from './CalculationOptions';
import { useDispatch, useSelector } from 'react-redux';
import { depositCalcData } from '../../redux/slices/calculator/depositCalculator/selectors';
import { calculateDeposit, findInArray, floorToDecimal } from './utils';
import { getCalcSettings } from '../../redux/thunks/calculator/calculatorSettings';
import { getCalcPredefined } from '../../redux/thunks/calculator/calcPredefined';
import {
  calculatorUISelector,
  setCalcResults,
  skCalculatorSelector,
} from '../../redux/slices/calculator/depositCalculator/calculator';
import { DEPOSIT_TAX_RATE } from '../../constants/constants';
import { FormattedMessage } from 'react-intl';
import { CalcSkeleton } from './Skeleton/CalcSkeleton';
import { PopupSuccess } from '../popups/successPopup';
import settingsJson from '../../settings/settings.json';

export const Calculator = () => {
  const { settings, options } = useSelector(depositCalcData);
  const [popupOpen, setpopupOpen] = useState(false);
  const skCalculator = useSelector(skCalculatorSelector);
  const { loadingSettings } = useSelector(calculatorUISelector);

  const {
    currencyID,
    amount,
    durationsDays,
    interestEveryMonth,
    partialWithdraw,
    depositMore,
  } = options;

  const dispatch = useDispatch();

  useEffect(() => {
    const configs = {
      currencyID,
      amount: Number(amount),
      durationsDays,
      partialWithdraw,
      depositMore,
      interestEveryMonth,
    };

    const res = findInArray(settings, configs);

    if (res) {
      const { /* amountFrom, amountTo, */ interestRate } = res;

      const { interestGained, overallAmount, principalAtTheEndOfPeriod } =
        calculateDeposit({
          rate: Number(interestRate),
          // rate: 9,
          principal: amount,
          // principal: 1070000,
          duration: durationsDays,
          shouldSubtractTax: true,
          interestEveryMonth,
          depositMore,
          currencyID,
        });

      dispatch(
        setCalcResults({
          depositRate: Number(res.interestRate),
          depositRateAfterTax:
            Number(res.interestRate) * (1 - DEPOSIT_TAX_RATE),
          interestAtTheEndOfPeriod: interestGained,
          principalAtTheEndOfPeriod: floorToDecimal(
            principalAtTheEndOfPeriod,
            2
          ),
          overallAmount: overallAmount,
        })
      );
    } else {
      dispatch(
        setCalcResults({
          depositRate: 0,
          depositRateAfterTax: 0,
          interestAtTheEndOfPeriod: 0,
          principalAtTheEndOfPeriod: 0,
          overallAmount: 0,
        })
      );
    }
  }, [
    currencyID,
    amount,
    durationsDays,
    partialWithdraw,
    depositMore,
    interestEveryMonth,
    settings,
    dispatch,
  ]);
  useEffect(() => {
    dispatch(getCalcSettings());
    dispatch(getCalcPredefined());
  }, [dispatch]);

  // if (isEmpty(predefined || loading)) {
  //   return <div> ...loading</div>; // TODO add skeleton
  // }

  if (skCalculator || loadingSettings) {
    return (
      <div className="calc_section">
        <div className="page_container">
          <CalcSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="calc_section">
      <div className="page_container">
        <h2 className="section_title">
          <FormattedMessage id="Count your invest" />
        </h2>
        <div className="section_inner">
          <CalculationOptions />
          <CalcResult popupOpens={() => setpopupOpen(true)} />
        </div>
      </div>

      <PopupSuccess
        popupOpen={popupOpen}
        closeSuccessPopup={() => setpopupOpen(false)}
      >
        <div className="app_left">
          <div className="section_title">
            <FormattedMessage id="Download app title" />
          </div>
          <div className="app_description">
            <FormattedMessage id="Download app description" />
          </div>
          <div className="page_row">
            <a
              rel="noreferrer"
              href={`${settingsJson.android_url}`}
              target="_blank"
              className="app_form"
            >
              <img
                src="/resources/images/img6.svg"
                title=""
                width="135"
                height="40"
                alt=""
              />
            </a>
            <a
              rel="noreferrer"
              href={`${settingsJson.apple_url}`}
              target="_blank"
              className="app_form"
            >
              <img
                src="/resources/images/img7.svg"
                title=""
                width="135"
                height="40"
                alt=""
              />
            </a>
            <a
              rel="noreferrer"
              href={`${settingsJson.huawei_url}`}
              target="_blank"
              className="app_form"
            >
              <img
                src="/resources/images/img8.svg"
                title=""
                width="135"
                height="40"
                alt=""
              />
            </a>
          </div>
        </div>
      </PopupSuccess>
    </div>
  );
};
