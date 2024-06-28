import {FormattedMessage} from "react-intl";
import { useSelector} from "react-redux";
import {depositCalcData} from "../../redux/slices/calculator/depositCalculator/selectors";
import {TableModal} from "./modal/depositTableModal";
import settings from "../../settings/settings.json";
import '../header/header.scss'
import {useRef} from "react";
import {toggleClassList} from "../../helpers/Utils";
import { replace } from "./utils";
import { CURRENCY_ISO } from "./constant";
import { debugMode } from "../../constants/constants";

const lang_messages = {
    title: <FormattedMessage id="Calculator offer title"/>,
    principal: <FormattedMessage id="Calculator offer principal"/>,
    interest: <FormattedMessage id="Calculator offer interest"/>,
    amount: <FormattedMessage id="Calculator offer amount"/>,
    rate: <FormattedMessage id="Calculator offer rate"/>,
    makeDeposit: <FormattedMessage id="Calculator offer makeDeposit"/>,
    hintAMD: <FormattedMessage id="Calculator not found deposit AMD"/>,
    hintEUR: <FormattedMessage id="Calculator not found deposit EUR"/>,
    hintProductNotFound: <FormattedMessage id="Calculator product not found"/>,
    // hintEURWithOptions: <FormattedMessage id="Calculator product not found"/>,
};





export const CalcResult = ({popupOpens}) => {

    const {calculationResults, options, limits } = useSelector(depositCalcData)
    const {
        depositRate,
        principalAtTheEndOfPeriod,
        interestAtTheEndOfPeriod,
        overallAmount,
    } = calculationResults;
    const {interestEveryMonth,currencyID, iso} = options

    const openApps = () => {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
      if (/android/i.test(userAgent)) {
        setTimeout(function () { window.location = settings.android_url; }, 25);
        window.location = `conversebankmobile://`

      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          setTimeout(function () { window.location = settings.apple_url; }, 25);
          window.location = `conversebankmobile://`
      } else {
        popupOpens(true)
      } 
    
    }

    const icon = limits[currencyID] ? limits[currencyID].icon : 'Դ'

    const renderHint = (currencyISO, overallAmount) => {
      if (overallAmount > 0) {
        return null;
      }

      let message  = <div/>;
      const { monthsTotal, partialWithdraw, depositMore } = options;
      debugMode && console.table(options)
      switch(currencyISO) {
        case CURRENCY_ISO.AMD:
        case CURRENCY_ISO.USD: {
          /**
           * Months total check is hard-coded.
           * The decision is not mine. 
           */
            if(monthsTotal <= 3) {
              message = lang_messages.hintProductNotFound
            } else if(monthsTotal === 9 && (depositMore)) {
              message  = lang_messages.hintProductNotFound
            } else {
              message = lang_messages.hintAMD
            }
          break;
        }
        case CURRENCY_ISO.EUR: {
          if(monthsTotal <=2 && partialWithdraw) {
            message = lang_messages.hintProductNotFound
            break;
          } 
          
        
          if(partialWithdraw && depositMore) {

            message = lang_messages.hintProductNotFound

          } else {
            message = lang_messages.hintEUR

          }

         
          break;
        }

        default :{
          message = <div />
        }
      }
      return <div className="nodata_hint">
        <span>
        {message}
        </span>
      </div>
    }

    return (
      <div className="calc_results">
        {renderHint(iso, overallAmount)}
        <div className="results_title">{lang_messages.title}</div>
        <ul className="results_list">
          <ResultData
            data={depositRate.toFixed(2)}
            label={lang_messages.rate}
            icon={'%'}
          />
          <ResultData
            data={replace(principalAtTheEndOfPeriod)}
            label={lang_messages.principal}
            icon={icon}
          />
          <ResultData
            hasTooltip={true}
            data={replace(interestAtTheEndOfPeriod, true)}
            label={lang_messages.interest}
            icon={icon}
          />
          <ResultData
            data={replace(overallAmount)}
            label={lang_messages.amount}
            icon={icon}
          />
        </ul>

        <div className="actions_block">
          {interestEveryMonth && <TableModal />}

          <button
            className="make_btn primary_btn"
            onClick={openApps}
          >
            {lang_messages.makeDeposit}
          </button>
        </div>
      </div>
    );
};

function ResultData({label, data, icon, hasTooltip}) {
    // const [createPopup, setCreate] = useState(false);
    // const [showPopup, setShow] = useState(false);
    const bodyRef = useRef(document.body);
    const bodyTeg = bodyRef.current;


    const showCustomerPopup = () => {
        // setCreate(true);
        toggleClassList(bodyTeg, 'tooltip_open');
        setTimeout(() => {
            // setShow(true);
        }, 1);
    };

    const closeCustomerPopup = () => {
        // setShow(false);

        toggleClassList(bodyTeg, 'tooltip_open');

        setTimeout(() => {
            // setCreate(false);
        }, 300);
    };

    return (
        <>
            <li>
                <span>{label}</span>
                <span>
                    {
                        hasTooltip &&
                        <div className="tooltip_block">
                            <button className="icon_info_calc" onClick={showCustomerPopup}></button>
                            <div className="tooltip_info">
                                <button className="icon_info_calc icon_close"  onClick={closeCustomerPopup}></button>
                                <div className="text_tooltip">
                                    <FormattedMessage id="TooltipText"/>
                                </div>
                            </div>
                        </div>
                    }
                    {data} {icon}</span>
            </li>
            {/*<Divider />*/}
        </>
    );
}
