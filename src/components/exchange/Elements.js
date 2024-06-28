import { FormattedMessage } from 'react-intl';

const CurrencyTable = ({ currencyInfoList, currMaxDate, buttonText, toggleShowAll }) => {
    const getClassname = (price) => {
        if (price >= 0) return 'asc';
        else  return 'desc'

    };
    return (
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
            <div className="bottom_currency">
                <div className="update_date">
                    <FormattedMessage id="Last update" /> {currMaxDate}
                </div>
                {currencyInfoList && currencyInfoList.data.length >= 4 && (
                    <button onClick={toggleShowAll} className="see_all icon_down">
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};



export { CurrencyTable };


