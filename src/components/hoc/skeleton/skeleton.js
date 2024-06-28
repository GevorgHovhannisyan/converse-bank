import './skeleton.scss';

export const CreateSkeleton = ({span, number,className}) => {
    const skeleton = new Array(number).fill(1);
    let classtemp = 'skeleton ';
    if(className) {
        classtemp += className;
    }
    return (
        <ul className={classtemp}>
           { skeleton.map((item, i )=>{
                return (
                    <li key = {i}>
                        {span ? <span></span> : null}
                    </li>
                )
            })}
        </ul>
    )
}