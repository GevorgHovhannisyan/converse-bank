    import { useDispatch, useSelector } from "react-redux";
    import { setOption, setPermissions } from "../../redux/slices/calculator/depositCalculator/calculator";
    import { depositCalcData } from "../../redux/slices/calculator/depositCalculator/selectors";
    import { canEdit } from "../../redux/slices/calculator/utils";
import { getDiffDays } from "./utils";
    // import CreateSkeleton from "../hoc/skeleton";
    // import { isEmpty } from "./utils";

    export const PredefinedDepositTypes = () => {
    const dispatch = useDispatch();
    const { predefined, options, currencies } = useSelector(depositCalcData);
    const { depositTypeID } = options;

    // const { currencyID } = options;
    // if (isEmpty(predefined)) {
    //     return <div className="type_btns"><CreateSkeleton span={false} number={3}/></div>;
    // }


    const dataRefresh = (data) => {
        dispatch(setOption(data));
    };

    const onClickDepositType = (id, durationsTypeID, amounts ) => {
        const predefinedDataByType = predefined[id];

        if(!currencies[depositTypeID].length) {
            return;
        }

        const currencyByDepositType = currencies[id][0].id
        const iso = currencies[id][0].iso

        const isCustom = canEdit(predefinedDataByType.isCustom);
        const amount = amounts[currencyByDepositType]

        const duration = getDiffDays(predefinedDataByType.duration)

    
        dataRefresh({
          depositTypeID: id,
          amount,
          currencyID: currencyByDepositType,
          iso,
        //   durationsDays: predefinedDataByType.duration,
          durationsDays: duration,
          depositMore: canEdit(predefinedDataByType.depositMore),
          partialWithdraw: canEdit(predefinedDataByType.partialWithdraw),
          interestEveryMonth: canEdit(predefinedDataByType.interestEveryMonth),
          durationsTypeID,
          isCustom,
        });



        dispatch(
            setPermissions({
                withdraw: canEdit(predefinedDataByType.partialWithdrawEditable),
                durations: canEdit(predefinedDataByType.durationEditable),
                depositMore: canEdit(predefinedDataByType.depositMoreEditable),
                interestEveryMonth: canEdit(
                predefinedDataByType.capitalizationEditable
                ),
                currency: canEdit(predefinedDataByType.currencyEditable),
                amount: canEdit(predefinedDataByType.amountEditable),
            })
            );

        if(isCustom) {
            if(canEdit(predefinedDataByType.interestEveryMonth)) {
                dispatch(setPermissions({
                    depositMore: !canEdit(predefinedDataByType.interestEveryMonth),
                    withdraw: !canEdit(predefinedDataByType.interestEveryMonth),
                }))
            } 

            if(canEdit(predefinedDataByType.partialWithdraw)) {
                dispatch(setPermissions({
                    interestEveryMonth: !canEdit(predefinedDataByType.partialWithdraw),
                }))
            }
            
            if(canEdit(predefinedDataByType.depositMore)) {
                dispatch(setPermissions({
                    interestEveryMonth: !canEdit(predefinedDataByType.depositMore),
                }))
            }



        }

       
    };

    const predefinedData = Object.values(predefined);

    return (
        <div className="type_btns">
            {predefinedData.map(({ id, title, durationsTypeID, amounts }) => {
                let className = '';
                if (id === depositTypeID) {
                    className += ' selected ';
                }
                return (
                <button
                    onClick={() => onClickDepositType(id, durationsTypeID, amounts)}
                    className={className}
                    key={id}
                >
                    {title}
                </button>
                );
            })}
        </div>
    );
};