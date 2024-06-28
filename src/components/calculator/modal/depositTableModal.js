import { useSelector } from "react-redux"
// import { Modal } from "rsuite"
// import { setUI } from "../../../redux/slices/calculator/depositCalculator/calculator"
import { depositCalcData } from "../../../redux/slices/calculator/depositCalculator/selectors"
import { TableRow } from "./tableRow"
import { generateTableData } from "./utils"
import { FormattedMessage } from "react-intl"
import { ExportExcel } from "../../ExportExcel/ExportExcel"
import Modal from '../../../components/modal/modal'
import  './modal.scss'
// import { limits } from "../../../redux/slices/calculator/depositCalculator/calculator"
import { languageSelector } from "../../../redux/slices/language/language"
import { LanguageTransCodes } from "../../../constants/language";


const lang = {
  tableTitle: <FormattedMessage id="Table title" />,
  download: <FormattedMessage id="Table download" />,
  showTable: <FormattedMessage id="Calculator offer showGraph" />,
  year: <FormattedMessage id="Year" />,
  month: <FormattedMessage id="Month" />,
  rate: <FormattedMessage id="Rate" />,
  amount: <FormattedMessage id="Amount" />,
};


export const TableModal = () => {
  const {  calculationResults, options, currencies, limits } = useSelector(depositCalcData); //UI,
  const langID= useSelector(languageSelector);
  const { depositRate, interestAtTheEndOfPeriod,  } = calculationResults;
  const { durationsDays, currencyID,depositTypeID } = options;


  const { excelData, renderData: data } = generateTableData({
    days: durationsDays,
    rate: depositRate,
    percentSign: '%',
    currencyID,
    interestOverAll: interestAtTheEndOfPeriod,
    langID: langID || LanguageTransCodes.AM,
    currencies: currencies,
    depositTypeID,
    currencyIcon: limits[currencyID]?.icon,
  });

  // const onClose = () => {
  //   dispatch(
  //     setUI({
  //       modalVisible: !modalVisible,
  //     })
  //   );
  // };

  const renderTableRows = (dataList) => {
    return dataList.map((item) => {

      return <TableRow {...item} key={item.month} />;
    });
  };

  const renderTableDownload = () => {
    return (
        <ExportExcel
          excelData={excelData}
          fileName={document.title}
        />
    );
  };
  return (
    <>
      <Modal
        modalTitle={lang.tableTitle}
        triggerButtonTitle={lang.showTable}
        buttonClassName="see_btn"
        modalTopButton={renderTableDownload()}
      >
        <div className="results_table">
          <div className="table_head">
            <TableRow
              amount={lang.amount}
              month={lang.month}
              rate={lang.rate}
              year={lang.year}
            />
          </div>
          <div className="table_body">
            {renderTableRows(data)}
          </div>

        </div>
      </Modal>
    </>
  );
};





