// import { FormattedMessage } from "react-intl";
// import { Divider } from "../../divider/Divider"


export const TableRow = ({month, year,  rate, amount, currencyIcon: currency, percentSign }) => {
  return (
    <div className="table_row">
      <span className="table_cell">
        {month} {year}
      </span>
      <span className="table_cell"> {rate} <span className="icon">{percentSign}</span></span>
      <span className="table_cell"> {amount} <span className="icon">{currency}</span></span>
    </div>
  )
}