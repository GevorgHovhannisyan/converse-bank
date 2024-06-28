export const FormItem = ({ label, Component, wrapperStyle, className, disabled, ...rest }) => {

        return (
            <div className={className}>
                <label className={disabled ? ' disabled' : ''}>
                    {Component && <Component disabled={disabled} {...rest}/>}
                    {label}
                </label>
            </div>
        )
}