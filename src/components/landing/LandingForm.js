import './landing.scss'
import React, {useCallback, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {subscribeTextSelector, pendingSubscribedSelector,} from '../../redux/slices/forms/forms';
import { subscribeMember } from '../../redux/thunks/forms/becomeMemberThunk';
import ReCaptcha from '../reCaptcha/reCaptchaComponent';
import {landingSelector} from "../../redux/slices/landing/landing";

const LandingForm = (section) => {
    const dispatch = useDispatch();
    const subscribeTextTitle = useSelector(subscribeTextSelector);
    const pendingSubscribed = useSelector(pendingSubscribedSelector);
    const [token, setToken] = useState('');
    const [hasError, setError] = useState(true);
    const landing = useSelector(landingSelector);

    const setTokenValue = useCallback((value) => {
        setToken(value);
    }, []);

    let subscribeText = subscribeTextTitle;
    let subscribeDescription = (
        <FormattedMessage id="Thanks for filling out our form" />
    );

    if (subscribeTextTitle === 'Email send success' || subscribeTextTitle === 'Email verification link successful send') {
        subscribeText = <FormattedMessage id="Email sent" />;
    } else if (subscribeTextTitle === 'Subscriber already subscribed' ) {
        subscribeText = <FormattedMessage id="Subscriber already subscribed" />;
        subscribeDescription = <FormattedMessage id="You are already subscribed" />;
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            // .required(
            //   <span>
            //     <FormattedMessage id="Email error" />
            //   </span>
            // )
            .email(
                <FormattedMessage id="Invalid email" />
            ),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: (data, formikBag) => {
            if(data.email) {
                dispatch(subscribeMember({ ...data, 'g-recaptcha-response': token }));
                setError(false);
            }
        },
    });

    return (
        <div className="landing_form">
            <div className="page_container">
                <div className="page_row">
                    <div className="left_block">
                        <div className="section_title">
                            <FormattedMessage id="Stay informed by subscribing to the Converse blog" />
                        </div>
                        <div className="loading_description">
                            <FormattedMessage id="From today, Converse Bank customers can use the most secure, safe and reliable payment tool - Apple Pay" />
                        </div>
                        <form className="subscribe_form" onSubmit={formik.handleSubmit}>
                            <div className={`field_block ${hasError ? 'has-error' : ''}`}>
                                <div className="field_inner">
                                    <label>
                                        <span className="label">
                                          <FormattedMessage id="Subscribe" />
                                        </span>
                                        <input
                                            name="email"
                                            type="text"
                                            placeholder='example@example.com'
                                            autoComplete="off"
                                            className={
                                                formik.errors.email && formik.touched.email
                                                    ? 'is-invalid'
                                                    : ''
                                            }
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        className={`validate_btn icon_arrow_right ${
                                            pendingSubscribed ? 'loading' : ''
                                        }`}
                                        aria-label="send"
                                    >
                                        Ուղարկել
                                    </button>
                                </div>
                                <div className="error_hint">
                                    {formik.errors.email && formik.touched.email ? (
                                        <span> {formik.errors.email}</span>
                                    ) : null}
                                </div>
                            </div>

                            <ReCaptcha
                                name="token"
                                setTokenValue={setTokenValue}
                                page="subscribeMember"
                            />
                        </form>
                    </div>
                    <div className="right_block">
                        <img src={landing?.image} title={section?.title} alt={section?.title}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingForm;
