import '../calculator.scss'


export const Switch = ({ disabled = false, ...rest }) => {
    return (
        <>
            <input type="checkbox" disabled={disabled} {...rest} />
            <span className="switch_icon"></span>
        </>
    );
};




