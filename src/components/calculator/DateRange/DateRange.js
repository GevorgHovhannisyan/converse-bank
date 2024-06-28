// import "rsuite/dist/rsuite.css";
import "./index.css"

// import { DateRangePicker } from 'rsuite';
// import { useEffect,  useState } from "react";
// import { FormItem } from "../../FormItem";
// import { Icons } from "../../../icons";
// import { normalizeDate } from "./utils";
// import { setOption } from "../../../redux/slices/calculator/depositCalculator/calculator";
// import { useDispatch } from "react-redux";
// import { getCalcSettings } from "../../../redux/thunks/calculator/calculatorSettings";
// import { getCalcPredefined } from "../../../redux/thunks/calculator/calcPredefined";
// const { combine, allowedMaxDays, beforeToday } = DateRangePicker;



// const DatePicker = (props) => {
//   const { start, end, open = false, container } = props;

//   const normalizedStart = normalizeDate(start);
//   const normalizedEnd = normalizeDate(end);
//   let placeholder = 'Ընտրել նախընտրելի ամսաթվերը';

//   if (start && end) {
//     placeholder = `${normalizedStart} - ${normalizedEnd}`;
//   }

//   const className = open
//     ? 'date-picker-trigger-btn-open'
//     : 'date-picker-trigger-btn';

//   return (
//     <div ref={container} className={className} {...props}>
//       {<Icons.Calendar />} {placeholder}
//     </div>
//   );
// }

// const CalendarLocaleType = {
//   sunday: 'Կիր',
//   monday: 'Երկ',
//   // tuesday: string;
//   // wednesday: string;
//   // thursday: string;
//   // friday: string;
//   // saturday: string;
//   ok: 'Ընտրել',
//   // today: string;
//   // yesterday: string;
//   // hours: string;
//   // minutes: string;
//   // seconds: string;
//   // formattedMonthPattern: string;
//   // formattedDayPattern: string;

//   // // for DateRangePicker
//   // last7Days: string;
// };


  // const placeholder = (
  //   <div style={{ textAlign: 'center', width: '100%', color: '#007DC3', padding: '18px 32px' }}>
  //     {' '}
  //     Ընտրեք ավանդի օրերը
  //   </div>
  // );

export const DateRange = () => { //{disabled}
  // const [range, setRange] = useState([]);
  // const [open, setOpen] = useState(false);
  // const dipsatch = useDispatch();

  // const onChange = (val) => {
  //   console.log(val, 'val111');
  // };

  // const onSelect = (value) => {
  //   if (range.length === 2) {
  //     setRange([new Date(value)]);
  //   } else {
  //     setRange((p) => [...p, new Date(value)]);
  //   }
  // };

  // const onClickPicker = () => {
  //   if (disabled) return;
  //   setOpen((p) => !p);
  //   dipsatch(setOption({ durationsTypeID: 0 }));
  // };

  // const onClean = () => {
  //   setRange([]);
  // };

  // useEffect(() => {
  //   if (range.length === 2) {
  //     setOpen(false);
  //   }
  // }, [range.length]);

  // const [start, end] = range;

  // useEffect(() => {
  //   const handler = (e) => {
  //     const isOutsideClick = !(
  //       e.target.className?.includes('date-picker-trigger-btn') ||
  //       e.target.className?.includes('rs-calendar-table-cell')
  //     );

  //     if (isOutsideClick) {
  //       setOpen(false);
  //     }
  //   };

  //   window.document.addEventListener('click', handler);

  //   return () => {
  //     window.document.removeEventListener('click', handler);
  //   };
  // }, []);

  // TODO add calendar
  return (
    <>
      {/* <FormItem       
          disabled={disabled}
          open={open}
          start={start}
          end={end}
          onClick={onClickPicker}
          Component={DatePicker}
        /> */}

      {/* <div  
          style={{
            display: 'none',
          }}
        >
          {
            <DateRangePicker
              size="sm"
              character=" - "
              disabledDate={beforeToday()}
              open={open}
              format="dd.MM.yyyy"
              value={range}
              onClean={onClean}
              locale={CalendarLocaleType}
              ranges={[]}
              renderTitle={(props) => {
                console.log(props, 'props');
                return (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }}
                  >
                    Month and day
                  </div>
                );
              }}
              renderValue={() => placeholder}
              onSelect={onSelect}
              onChange={onChange}
              appearance="default"
              placeholder={placeholder}
              style={{ width: '100%' }}
            />
          }
        </div> */}
    </>
  );
}