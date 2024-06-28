import { useState, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import './currency.scss';

const Currency = ({ currencyData, currMaxDate }) => {
  const [isShow, setShow] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [currencyInfoList, setCurrency] = useState(null);
  const currencyInner = useRef();

  const getClassname = (price) => {
    if (price >= 0) {
      return 'asc';
    } else {
      return 'desc';
    }
  };

  const openCurrency = () => {
    setCreate(true);
    setTimeout(() => {
      setShow(true);
    }, 1);
  };

  const closeCurrency = () => {
    setShow(false);
    setTimeout(() => {
      setCreate(false);
      setCurrency(currencyData[0]);
    }, 300);
  };

  const handleOutsideClick = (e) => {
    if (currencyInner) {
      if (currencyInner.current && currencyInner.current.contains(e.target)) {
        return;
      }
    }
    setShow(false);
    setCurrency(currencyData[0]);
  };

  if (isShow) {
    document.addEventListener('click', handleOutsideClick, true);
  } else {
    document.removeEventListener('click', handleOutsideClick, false);
  }

  useEffect(() => {
    if (currencyData && currencyData.length) {
      setCurrency(currencyData[0]);
    }
  }, [currencyData]);

  return (
    <div className={`currency_block ${isShow ? 'opened' : ''}`}>
      <button
        className="action_btn"
        onClick={isShow ? closeCurrency : openCurrency}
        aria-label="currency"
      >
        $
      </button>
      {isCreate && (
        <div className="currency_inner" ref={currencyInner}>
          <button
            className="currency_close icon_close"
            onClick={closeCurrency}
          ></button>
          <div className="currency_title">
            <FormattedMessage id="Currency" />
          </div>
          <div className="switch_btns">
            {currencyInfoList &&
              currencyData &&
              !!currencyData.length &&
              currencyData.map((currency, index) => {
                return (
                  <button
                    onClick={() => setCurrency(currency)}
                    className={`${
                      currencyInfoList.title === currency.title
                        ? 'selected'
                        : ''
                    }`}
                    key={index}
                  >
                    <FormattedMessage id={currency.title} />
                  </button>
                );
              })}
          </div>

          <div className="currency_content">
            <table>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="Currency" />
                  </th>
                  <th>
                    <FormattedMessage id="Buy" />
                  </th>
                  <th>
                    <FormattedMessage id="Sell" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {currencyInfoList &&
                  !!currencyInfoList.data.length &&
                  currencyInfoList.data.map((currencyData, index) => {
                    return (
                      <tr key={index}>
                        <td>{currencyData.currency.iso}</td>
                        <td className={getClassname(currencyData.buy_diff)}>
                          {parseFloat(+currencyData.buy.toFixed(2)).toLocaleString()}
                        </td>
                        <td className={getClassname(currencyData.sell_diff)}>
                          {parseFloat(+currencyData.sell.toFixed(2)).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="update_date">
              <FormattedMessage id="Last update" /> {currMaxDate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Currency;
