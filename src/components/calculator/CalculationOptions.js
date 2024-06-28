// import { FormattedMessage } from "react-intl"
import { DepositCalcOptions } from "./DepositCalcOptions";
import { PredefinedDepositTypes } from "./PredefinedDepositTypes";

// const lang = {
//   profitable: <FormattedMessage id="Calculator options profitable" />,
//   demanded: <FormattedMessage id="Calculator options demanded" />,
//   custom: <FormattedMessage id="Calculator options custom" />,
//   setAmount: <FormattedMessage id="Calculator options setAmount" />,
//   months2: <FormattedMessage id="Calculator options months2" />,
//   months6: <FormattedMessage id="Calculator options months6" />,
//   months8: <FormattedMessage id="Calculator options months8" />,
//   year1: <FormattedMessage id="Calculator options year1" />,
//   year1_5: <FormattedMessage id="Calculator options year1_5" />,
//   years2: <FormattedMessage id="Calculator options year2" />,
//   partialWithdraw: <FormattedMessage id="Calculator options partialWithdraw" />,
//   depositMore: <FormattedMessage id="Calculator options depositMore" />,
//   monthlyInterest: <FormattedMessage id="Calculator options monthlyInterest" />,
// };

export const CalculationOptions = () => {

  return (
      <div className="calc_options">
          <PredefinedDepositTypes />
          <DepositCalcOptions />
      </div>
  );
}