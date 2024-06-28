import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import 'react-phone-number-input/style.css';
import PhoneInput, {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from 'react-phone-number-input';

import { useDispatch, useSelector } from 'react-redux';
import { toggleClassList } from '../../helpers/Utils';
import SimpleField from '../controls/simpleField/simpleField';
import { becomeMember } from '../../redux/thunks/forms/becomeMemberThunk';
import {
  pendingCustomerSelector,
  customerSubscribedSelector,
  setCustomerSubscribed,
  becomeTextTitleSelector,
  showErrorMessageSelector,
  subscribeErrorMessageSelector,
  setSubscribeErrorMessage,
} from '../../redux/slices/forms/forms';

import { PopupSuccess } from '../popups/successPopup';

import ReCaptcha from '../reCaptcha/reCaptchaComponent';

import { Formik, Form } from 'formik'; //, Field
import * as Yup from 'yup';
import './becomeCustomer.scss';
import '../modal/modal.scss';
import { maskList } from './utils';
// import { Icons } from '../../icons';

const becomeCostomer = Yup.object().shape({
  first_name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Яա-ֆ]+(?:-[a-zA-Zа-яА-Яա-ֆ]+)*$/,
      'Invalid name'
    )
    .required('Required'),
  last_name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-Яա-ֆ]+(?:-[a-zA-Zа-яА-Яա-ֆ]+)*$/,
      'Invalid surname'
    )
    .required('Required'),

  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().test('test_length_greater_than_40', '', function (value) {
    // your condition
    if (!isValidPhoneNumber(value)) {
      // setting the error message using the value's length
      return this.createError({ message: `Phone is not valid` });
    }
    return true;
  }),
});
/* eslint-disable */

const BecomeCustomer = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [phoneCountry, setDefCountry] = useState('AM');
  const [createPopup, setCreate] = useState(false);
  const [popupOpen, setpopupOpen] = useState(false);
  // const [showSuccess, setSuccess] = useState(false);
  const [showPopup, setShow] = useState(false);
  // const [captchaError, setCaptchaError] = useState('');
  const bodyRef = useRef(document.body);
  const phoneRef = useRef('');

  const bodyTeg = bodyRef.current;
  const pendingCustomer = useSelector(pendingCustomerSelector);
  const customerSubscribed = useSelector(customerSubscribedSelector);
  const textTitle = useSelector(becomeTextTitleSelector);
  const showErrorMessage = useSelector(showErrorMessageSelector);
  const subscribeErrorMessage = useSelector(subscribeErrorMessageSelector);

  let becomeTextTitle = <FormattedMessage id="Email send success" />;

  let becomeDescription = (
    <FormattedMessage id="Thanks for filling out our member form" />
  );

  if (
    textTitle === 'Email send success' ||
    textTitle === 'Email verification link successful send'
  ) {
    becomeTextTitle = <FormattedMessage id="Email send success" />;
  } else {
    becomeTextTitle = (
      <FormattedMessage id="You already Converse member, Thank you" />
    );
    becomeDescription = (
      <FormattedMessage id="You are already verified Converse member" />
    );
  }

  const intl = useIntl();
  const phonePlaceholder = intl.formatMessage({ id: 'Enter phone number' });

  const showCustomerPopup = () => {
    setCreate(true);
    toggleClassList(bodyTeg, 'popup_opened');
    setTimeout(() => {
      setShow(true);
    }, 1);
  };

  const closeCustomerPopup = () => {
    setShow(false);

    toggleClassList(bodyTeg, 'popup_opened');

    setTimeout(() => {
      setCreate(false);
      setDefCountry('AM');
    }, 300);
  };

  useEffect(() => {
    if (customerSubscribed) {
      closeCustomerPopup();
    }
    setpopupOpen(customerSubscribed);
  }, [customerSubscribed, closeCustomerPopup]);

  useEffect(() => {
    if (subscribeErrorMessage) {
      // closeCustomerPopup();
      setpopupOpen(true);
    }
  }, [showErrorMessage, subscribeErrorMessage]);

  function setMask(value) {
    let matrix = '+###############';

    maskList.forEach((item) => {
      const code = item.code.replace(/[\s#]/g, '');
      phoneRef.current = value.replace(/[\s#-)(]/g, '');

      if (phoneRef.current.includes(code)) {
        matrix = item.code;
      }
    });

    let i = 0;
    const val = value.replace(/\D/g, '');

    const v = matrix.replace(/(?!\+)./g, (a) => {
      if (/[#\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      }

      if (i >= val.length) {
        return '';
      }

      return a;
    });
    if (v.startsWith('+374')) {
      return v;
    } else {
      return '+374';
    }
  }

  const closePopup = () => {
    dispatch(setCustomerSubscribed(false));
  };

  const onCountryChange = (country) => {
    if (country) {
      setDefCountry(country);
    }
  };

  return (
    <div className="become_customer">
      {/* <button
        aria-label="become customer popup"
        className="popup_btn"
        onClick={showCustomerPopup}
      >
        <FormattedMessage id="Become a member" />
      </button> */}
      {createPopup ? (
        <div className={`popup_wrapper ${showPopup ? 'showed' : ''}`}>
          <div className={`popup_block`}>
            <div className="popup_inner">
              <div className="popup_container">
                <button
                  className="popup_close icon_close"
                  aria-label="popup_close"
                  onClick={closeCustomerPopup}
                ></button>
                <div className="popup_title">
                  <FormattedMessage id="Become a customer" />{' '}
                  <br />
                  <span className="highlight">Converse</span>{' '}
                  <FormattedMessage id="Client" />
                </div>
                <div className="popup_description">
                  <FormattedMessage id="Our specialist will contact you" />
                </div>
                <Formik
                  initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '+374',
                  }}
                  validationSchema={becomeCostomer}
                  validateOnBlur={false}
                  validateOnChange={true}
                  onSubmit={(values) => {
                    // same shape as initial values

                    const name = values.first_name;
                    const surname = values.last_name;
                    const email = values.email;
                    const phone = values.phone;
                    const payload = {
                      name,
                      surname,
                      email,
                      phone,
                      'g-recaptcha-response': token,
                    };
                    dispatch(becomeMember(payload));
                  }}
                >
                  {({ errors, values, setFieldValue }) => (
                    <Form>
                      <SimpleField
                        type="text"
                        name="first_name"
                        label="first name"
                        error_field={errors.first_name}
                        value={values.first_name}
                      />
                      <SimpleField
                        type="text"
                        name="last_name"
                        label="last name"
                        error_field={errors.last_name}
                        value={values.last_name}
                      />

                      <SimpleField
                        type="email"
                        name="email"
                        label="e-mail"
                        error_field={errors.email}
                        value={values.email}
                      />
                      <div
                        className={`field_block ${
                          errors.phone ? 'has-error' : ''
                        }`}
                      >
                        <label className="type_field">
                          <PhoneInput
                            placeholder={phonePlaceholder}
                            value={formatPhoneNumberIntl(values.phone)}
                            onChange={(e) => {
                              setFieldValue('phone', e, true);
                            }}
                            defaultCountry={phoneCountry}
                            onCountryChange={onCountryChange}
                            error={errors.phone}
                          />
                        </label>

                        <span className="error_hint">
                          {errors.phone && (
                            <FormattedMessage id={`${errors.phone}`} />
                          )}
                        </span>
                      </div>

                      <div className="btn_block">
                        <button
                          type="submit"
                          className={`primary_btn ${
                            pendingCustomer ? 'loading' : ''
                          }`}
                          aria-label="send request"
                        >
                          <FormattedMessage id="Send request" />
                        </button>
                      </div>
                      <ReCaptcha
                        name="token"
                        setTokenValue={(e) => setToken(e)}
                        page="becomeMember"
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <PopupSuccess
        closeSuccessPopup={() => {
          closePopup();

          setSubscribeErrorMessage(false);
        }}
        descriptionText={becomeTextTitle}
        titleText={becomeDescription}
        popupOpen={popupOpen}
      />
    </div>
  );
};

export default BecomeCustomer;
