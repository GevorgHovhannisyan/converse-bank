import CreateSkeleton from "../../hoc/skeleton"

export const CalcSkeleton = () => {


    return (
        <>
        <div className="section_title">
          <CreateSkeleton number={1} />
        </div>
        <div className="section_inner">
          <div className="calc_options">
            <div className="type_btns">
              <CreateSkeleton number={3} />
            </div>
            <div className="currency_options">
              <CreateSkeleton number={4} />
            </div>
            <div className="amount_block">
              <CreateSkeleton number={3} />
            </div>
            <div className="duration_options">
              <CreateSkeleton number={8} />
            </div>
            <div className="switch_btns">
              <CreateSkeleton number={3} />
            </div>
          </div>
          <div className="calc_results">
            <div className="results_title">
              <CreateSkeleton number={1} />
            </div>
            <div className="results_list">
              <CreateSkeleton span={true} number={4} />
            </div>
            <div className="actions_block">
              <CreateSkeleton number={1} />
            </div>
          </div>
        </div>
      </>
    )
}