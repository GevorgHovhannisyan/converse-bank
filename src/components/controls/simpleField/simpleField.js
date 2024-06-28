import { FormattedMessage } from 'react-intl';
import './simpleField.scss';
import { Field } from 'formik';
const SimpleField = (props) => {
  const { label, name, value, error_field, icon } = props;

  const Label = label ? (
    <FormattedMessage
      id={label}
      values={{ b: (msg) => <label>{msg}</label> }}
    />
  ) : null;
  return (
    <div className={`field_block ${error_field ? 'has-error' : ''}`}>
      <label className="type_field">
      {icon} <Field name={name} value={value}  />
        <span className={`psevdo_ph ${value ? 'top' : ''}`}>
            {Label}
        </span>
      </label>
      <span className="error_hint">
        {error_field && <FormattedMessage id={`${error_field}`} />}
      </span>
    </div>
  );
};

export default SimpleField;
