export const calculateRates = ({ currencyTypes, iso1, iso2, value }) => {
  const currencyList = currencyTypes;
  const sell = iso1.value;
  const buy = iso2.value;
  let rateByAmd;
  let amount = 0;

  if (sell === 'AMD' || buy === 'AMD') {
    const findCurrency = currencyList.find((c) => {
      if (
        (sell === c.iso2 && c.currency.iso === buy) ||
        (sell === c.currency.iso && c.iso2 === buy)
      ) {
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

      if (sell === findCurrency.iso2) {
        amount = (value / rate).toFixed(4);
      } else if (sell === findCurrency.currency.iso) {
        amount = (value * rate).toFixed(4);
      }
    }
  } else {
    rateByAmd = currencyList.find(
      (c) => c.currency.iso === sell && c.iso2 === 'AMD'
    );
    let sellRate = currencyList.find(
      (c) => c.currency.iso === buy && c.iso2 === 'AMD'
    );
    let amdRate = rateByAmd.buy * value;
    amount = (amdRate / sellRate.sell).toFixed(4);
  }

  return { amount };
};
