import FileSaver from 'file-saver';
import { FormattedMessage } from 'react-intl';
// import { Button } from 'rsuite';
import XLSX from 'sheetjs-style';

const lang = {
    download: <FormattedMessage id="Table download" />,
}
export const ExportExcel = ({excelData, fileName}) => {

    const filetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = { Sheets: { data: ws }, SheetNames: ['data']};

            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'})
            const data = new Blob([excelBuffer], { type: filetype})

            FileSaver.saveAs(data, fileName + fileExtension);

    }




    return (
        <button className="download_btn icon_download" onClick={exportToExcel}>
            <span>{lang.download}</span>
        </button>
    )
}