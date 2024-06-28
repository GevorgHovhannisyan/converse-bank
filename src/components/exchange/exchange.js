import {useState, useEffect, useRef} from 'react';
import {FormattedMessage} from 'react-intl';
import Select from 'react-select';
import './exchange.scss';
import {useDispatch, useSelector} from 'react-redux';
import {
    currencyOptions,
    currencyInfo,
    currencyList,
    setCurrencyIso,
} from '../../redux/slices/home/home';
import {calculateRates} from './utils';
import {CurrencyTable} from './Elements';
import settings from "../../settings/settings";
import {PopupSuccess} from '../popups/successPopup';
import settingsJson from '../../settings/settings.json';

const Exchange = ({currencyData, currMaxDate}) => {
    const dispatch = useDispatch();
    const [isShow, setShow] = useState(false);
    const [currencyInfoList, setCurrency] = useState(null);
    const [inputKey, setInputKey] = useState(0);
    const [haveList, setHaveList] = useState([]);
    const [getList, setGetList] = useState([]);
    const currencyIso = useSelector(currencyList);
    const [iso1Value, setIso1Value] = useState(null);
    const [iso2Value, setIso2Value] = useState(null);
    const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0);
    const currencyInner = useRef();
    const options = useSelector(currencyOptions);
    const currencyTypes = useSelector(currencyInfo);
    const [popupOpen, setpopupOpen] = useState(false);
    const currency_exchange = process.env.REACT_APP_CURRENCY_EXCHANGE;

    useEffect(() => {
        setHaveList(JSON.parse(JSON.stringify(options)));
        const cloneOptions = [...options];
        const filterOptions = cloneOptions.filter(
            (item) => item.value !== currencyIso.iso1.value
        );
        setGetList(filterOptions);
    }, [options]);

    const swapCurrencies = () => {
        const cloneCurr = {...currencyIso};
        const haveIso = {...cloneCurr.iso1};
        const buyIso = {...cloneCurr.iso2};
        dispatch(setCurrencyIso({iso1: buyIso, iso2: haveIso}));
        const cloneOptions = [...options];
        const filterOptions = cloneOptions.filter(
            (item) => item.value !== currencyIso.iso2.value
        );
        setGetList(filterOptions);
        calculateIso1(iso1Value, {
            iso1: buyIso,
            iso2: haveIso,
            type: currencyInfoList.title,
        });
        // setIso2Value(iso1Value);
    };

    const changeCurency = (currency, {iso1, iso2}) => {
        setCurrency(currency);
        calculateIso1(iso1Value, {iso1, iso2, type: currency.title});

        if (!iso1Value) {
            clearInputs();
        }
    };

    const handleChange = (value, iso, obj) => {
        const {iso1, iso2} = obj;
        if (iso === 1) {
            if (value.value === iso2.value) {
                swapCurrencies();
            } else {
                const cloneOptions = [...options];
                const filterOptions = cloneOptions.filter(
                    (item) => item.value !== value.value
                );

                setGetList(filterOptions);
                dispatch(setCurrencyIso({iso1: {...value}, iso2: {...iso2}}));
                calculateIso1(iso1Value, {
                    iso1: value,
                    iso2,
                    type: currencyInfoList.title,
                });
            }
        }
        if (iso === 2) {
            if (value.value === iso1.value) {
                swapCurrencies();
            } else {
                // const haveOptions = [...haveList];
                // const filterOptions = haveList.filter(
                //   (item) => item.value !== value.value
                // );
                // setHaveList(filterOptions);

                dispatch(
                    setCurrencyIso({
                        iso1: {...iso1},
                        iso2: {...value},
                    })
                );
                calculateIso1(iso1Value, {
                    iso1,
                    iso2: value,
                    type: currencyInfoList.title,
                });
            }
        }
    };

    const calculateIso1 = (value = '', {iso1, iso2, type}) => {
        if (!value) {
            clearInputs();
            return;
        }

        const numericValue = value.replace(/\D/g, '');
        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        const valueFormat = formattedValue.split(' ').join('');
        if (value.match(/^[A-Za-z]+$/)) {
            return;
        }
        setIso1Value(formattedValue);

        const {amount} = calculateRates({
            currencyTypes: currencyTypes[type],
            iso1,
            iso2,
            value: +valueFormat,
        });

        const formattedAmount = parseFloat(amount).toFixed(4).replace(/\.?0*$/, '');

        var formattedValue1 = formattedAmount.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
        setIso2Value(formattedValue1);
    };

    const calculateIso2 = (value) => {
        if (value === '') {
            clearInputs();
            return;
        }
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        const valueFormat = formattedValue.split(' ').join('');
        if (value.match(/^[A-Za-z]+$/)) {
            return;
        }
        setIso2Value(formattedValue);
        const type = currencyInfoList.title;
        const currencyList = currencyTypes[type];
        const sell = currencyIso.iso1.value;
        const buy = currencyIso.iso2.value;
        let rateByAmd;
        let amount = 0;

        if (sell === 'AMD' || buy === 'AMD') {
            const findCurrency = currencyList.find((c) => {
                if (c.currency.iso === buy || sell === c.currency.iso) {
                    return c;
                }
            });

            if (findCurrency) {
                let rate = findCurrency.sell;

                if (sell === findCurrency.currency.iso) {
                    rate = findCurrency.buy;
                } else if (sell === findCurrency.iso2) {
                    rate = findCurrency.sell;
                }

                if (buy === findCurrency.currency.iso) {
                    amount = (+valueFormat * rate).toFixed(4);
                } else {
                    amount = (+valueFormat / rate).toFixed(4);
                }
            }
        } else {
            rateByAmd = currencyList.find((c) => c.currency.iso === buy);
            let sellRate = currencyList.find((c) => c.currency.iso === sell);

            let amdRate = rateByAmd.sell * valueFormat;
            amount = (amdRate / sellRate.buy).toFixed(4);
        }
        // const formattedValue1 = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        const formattedAmount = parseFloat(amount).toFixed(4).replace(/\.?0*$/, '');

        const formattedValue1 = formattedAmount.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');

        setIso1Value(formattedValue1);
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

    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const buttonText = showAll ? (
        <FormattedMessage id="Close all"/>
    ) : (
        <FormattedMessage id="See all"/>
    );
    const infoClassName = showAll ? 'show-info' : 'hide-info';

    const clearInputs = () => {
        setIso1Value(null);
        setIso2Value(null);
        return;
    };

    const openApps = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            setTimeout(function () {
                window.location = settings.android_url;
            }, 25);
            window.location = `conversebankmobile://`
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            setTimeout(function () {
                window.location = settings.apple_url;
            }, 25);
            window.location = `conversebankmobile://`
        } else if (/huawei/.test(userAgent) && !window.MSStream) {
            setTimeout(function () {
                window.location = settings.huawei_url;
            }, 25);
            window.location = `conversebankmobile://`
        } else {
             setpopupOpen(true)
        }
    }

    return (
      <div>
          {currency_exchange  !== 'false' && (
              <div className="exchange_section">
                  <div
                      className={`page_container currency_block ${
                          selectedCurrencyIndex === currencyData.length - 1
                              ? 'last-selected'
                              : ''
                      }`}
                  >
                      <div className="section_title">
                          <FormattedMessage id="Currency exchange rate"/>
                      </div>
                      <div className="switch_btns">
                          {currencyInfoList &&
                          currencyData &&
                          !!currencyData.length &&
                          currencyData.map((currency, index) => {
                              return (
                                  <button
                                      onClick={() => {
                                          setSelectedCurrencyIndex(index);
                                          changeCurency(currency, {
                                              iso1: currencyIso.iso1,
                                              iso2: currencyIso.iso2,
                                          });
                                      }}
                                      className={`${
                                          currencyInfoList.title === currency.title ? 'selected' : ''
                                      }`}
                                      key={index}
                                  >
                                      <FormattedMessage id={currency.title}/>
                                  </button>
                              );
                          })}
                      </div>
                      <div className="exchange_inner">
                          <div className={`currency_row ${infoClassName}`}>
                              <CurrencyTable
                                  currencyInfoList={currencyInfoList}
                                  buttonText={buttonText}
                                  currencyData={currencyData}
                                  currMaxDate={currMaxDate}
                                  toggleShowAll={toggleShowAll}
                              />

                              <div className="form_currency">
                                  <div className="swap_section">
                                      <div className="page_row">
                                          <div className="currency_field">
                                              <div className="field_block">
                                                  <label>
                        <span className="field_name">
                          <FormattedMessage id="I Have"/>
                        </span>
                                                      <input
                                                          key={`input-1-${inputKey}`}
                                                          value={iso1Value || ''}
                                                          placeholder="0"
                                                          onChange={(e) =>
                                                              calculateIso1(e.target.value, {
                                                                  iso1: currencyIso.iso1,
                                                                  iso2: currencyIso.iso2,
                                                                  type: currencyInfoList.title,
                                                              })
                                                          }
                                                          id="amount-one"
                                                          data-validation="required"
                                                      />
                                                  </label>
                                              </div>
                                              <div className="select_block">
                                                  <Select
                                                      onChange={(e) =>
                                                          handleChange(e, 1, {
                                                              iso1: currencyIso.iso1,
                                                              iso2: currencyIso.iso2,
                                                          })
                                                      }
                                                      value={currencyIso.iso1}
                                                      options={haveList}
                                                      isSearchable={false}
                                                      classNamePrefix="select"
                                                  />
                                              </div>
                                          </div>
                                          <button
                                              className="btn_exchange icon_exchange"
                                              type="button"
                                              onClick={swapCurrencies}
                                          ></button>
                                          <div className="currency_field">
                                              <div className="field_block">
                                                  <label>
                        <span className="field_name">
                          <FormattedMessage id="I will get it"/>
                        </span>
                                                      <input
                                                          key={`input-2 -${inputKey}`}
                                                          value={iso2Value || ''}
                                                          placeholder="0"
                                                          onChange={(e) =>
                                                              calculateIso2(e.target.value, {
                                                                  iso1: currencyIso.iso1,
                                                                  iso2: currencyIso.iso2,
                                                              })
                                                          }
                                                          type="text"
                                                          id="amount-two"
                                                          data-validation="required"
                                                      />
                                                  </label>
                                              </div>
                                              <div className="select_block">
                                                  <Select
                                                      options={getList}
                                                      onChange={(e) =>
                                                          handleChange(e, 2, {
                                                              iso1: currencyIso.iso1,
                                                              iso2: currencyIso.iso2,
                                                          })
                                                      }
                                                      value={currencyIso.iso2}
                                                      isSearchable={false}
                                                      classNamePrefix="select"
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                      <div className="update_date icon_info_calc">
                                          <FormattedMessage id="The information is provided at the current exchange rate of the Bank at the time of calculation."/>
                                      </div>
                                      <div className="buttons_block">
                                          <button className="clear_btn" onClick={clearInputs}>
                                              <FormattedMessage id="Clear All"/>
                                          </button>
                                          <button className="primary_btn" onClick={openApps}>
                                              <FormattedMessage id="Calculate the exchange rate"/>
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="calc_section">
                      <PopupSuccess
                          popupOpen={popupOpen}
                          closeSuccessPopup={() => setpopupOpen(false)}

                      >
                          <div className="app_left">
                              <div className="section_title">
                                  <FormattedMessage id="Currency title"/>
                              </div>
                              <div className="app_description">
                                  <FormattedMessage id="Currency description"/>
                              </div>
                              <div className="page_row">
                                  <a rel="noreferrer" href={`${settingsJson.android_url}`} target="_blank" className="app_form">
                                      <img src="/resources/images/img6.svg" title="" width="135" height="40" alt=""/>
                                  </a>
                                  <a rel="noreferrer" href={`${settingsJson.apple_url}`} target="_blank" className="app_form">
                                      <img src="/resources/images/img7.svg" title="" width="135" height="40" alt=""/>
                                  </a>
                                  <a rel="noreferrer" href={`${settingsJson.huawei_url}`} target="_blank" className="app_form">
                                      <img src="/resources/images/img8.svg" title="" width="135" height="40" alt=""/>
                                  </a>
                              </div>
                          </div>
                      </PopupSuccess>

                  </div>

              </div>
          )}
      </div>
    );
};

export default Exchange;
