import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  getFooterAboutThunk,
  getSocialsListThunk,
  getFooterMenuThunk,
} from '../../../../redux/thunks/menus/menuThunk';
import {
  footer_about,
  socialsList,
  footer_menu,
  skFooterMenuLoading,
  skSocialsLoading,
  skFooterAboutLoading,
} from '../../../../redux/slices/navigation/navigation';

import {
  userSubscribedSelector,
  subscribeTextSelector,
  setSubscribeUser,
  pendingSubscribedSelector,
} from '../../../../redux/slices/forms/forms';

import {
  FooterMenuItem,
  SocialsMenuItem,
  FooterMenuItemList,
} from './footerMenuList';
import { PopupSuccess } from '../../../popups/successPopup';
import { subscribeMember } from '../../../../redux/thunks/forms/becomeMemberThunk';
import settings from '../../../../settings/settings.json';
import CreateSkeleton from '../../../hoc/skeleton';
import { useParams } from 'react-router-dom';
import { getCalcPredefined } from '../../../../redux/thunks/calculator/calcPredefined';
import { getCalcSettings } from '../../../../redux/thunks/calculator/calculatorSettings';
import ReCaptcha from '../../../reCaptcha/reCaptchaComponent';
import settingsJson from "../../../../settings/settings";

const TopFooter = () => {
  const dispatch = useDispatch();
  let about_menu = useSelector(footer_about);
  let socials_item = useSelector(socialsList);
  let footer_item = useSelector(footer_menu);
  const userSubscribed = useSelector(userSubscribedSelector);
  const subscribeTextTitle = useSelector(subscribeTextSelector);

  const skFooterMenu = useSelector(skFooterMenuLoading);
  const skSocials = useSelector(skSocialsLoading);
  const skFooterAbout = useSelector(skFooterAboutLoading);
  const pendingSubscribed = useSelector(pendingSubscribedSelector);

  const { lang } = useParams();

  // let footer_info_trans = useSelector(footer_info);
  const [hasError, setError] = useState(true);
  const [popupOpen, setpopupOpen] = useState(false);
  const [token, setToken] = useState('');

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

  useEffect(() => {
    dispatch(getFooterAboutThunk());
    dispatch(getSocialsListThunk());
    dispatch(getFooterMenuThunk());
    dispatch(getCalcPredefined());
    dispatch(getCalcSettings());
  }, [dispatch, lang]);

  useEffect(() => {
    setpopupOpen(userSubscribed);
  }, [userSubscribed]);
  //validation form
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

  const closePopup = () => {
    dispatch(setSubscribeUser(false));
    formik.values.email = '';
  };

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
    <div className="top_footer">
      <div className="footer_menues">
        <div className="footer_about_menu">
          {skFooterAbout ? (
            <CreateSkeleton span={false} number={10} />
          ) : (
            <>
              {about_menu.title && (
                <a
                  rel="noreferrer"
                  href={about_menu.url}
                  target={about_menu.target === '_blank' ? '_blank' : null}
                  className="menu_title"
                >
                  {about_menu.title}
                </a>
              )}
              <ul className="menu_list">
                {about_menu.children &&
                  about_menu.children.length &&
                  about_menu.children.map((menu, index) => {
                    return <FooterMenuItem key={index} item={menu} />;
                  })}
              </ul>
            </>
          )}
        </div>
        <div className="footer_menu">
          {skFooterMenu ? (
            <CreateSkeleton span={false} number={12} />
          ) : (
            <ul className="menu_list">
              {footer_item.menus &&
                footer_item.menus.length &&
                footer_item.menus.map((menu, index) => {
                  return <FooterMenuItemList key={index} item={menu} />;
                })}
            </ul>
          )}
        </div>
      </div>
      <div className="subscribe_section">
        <div className="section_name">
          <img src="/resources/images/converse_mobile_.png" title="" alt="" />
          <FormattedMessage id="Converse Mobile" />
        </div>
        <div className="footer_description">
          <FormattedMessage id="Download our app" />
        </div>
        <div className="page_row">
          <a
            rel="noreferrer"
            href={`${settings.android_url}`}
            target="_blank"
            className="app_form"
          >
            <img src="/resources/images/img6.svg" title="" alt="" />
          </a>
          <a
            rel="noreferrer"
            href={`${settings.apple_url}`}
            target="_blank"
            className="app_form"
          >
            <img src="/resources/images/img7.svg" title="" alt="" />
          </a>
          <a rel="noreferrer" href={`${settingsJson.huawei_url}`} target="_blank"
             className="app_form">
            <img src="/resources/images/img8.svg" title="" width="135" height="40" alt=""/>
          </a>
        </div>
        {/*<form className="subscribe_form" onSubmit={formik.handleSubmit}>*/}
        {/*  <div className={`field_block ${hasError ? 'has-error' : ''}`}>*/}
        {/*    <div className="field_inner">*/}
        {/*      <label>*/}
        {/*        <span className="label">*/}
        {/*          <FormattedMessage id="Subscribe" />*/}
        {/*        </span>*/}
        {/*        <input*/}
        {/*          name="email"*/}
        {/*          type="text"*/}
        {/*          placeholder='example@example.com'*/}
        {/*          autoComplete="off"*/}
        {/*          className={*/}
        {/*            formik.errors.email && formik.touched.email*/}
        {/*              ? 'is-invalid'*/}
        {/*              : ''*/}
        {/*          }*/}
        {/*          onChange={formik.handleChange}*/}
        {/*          value={formik.values.email}*/}
        {/*        />*/}
        {/*      </label>*/}
        {/*      <button*/}
        {/*        type="submit"*/}
        {/*        className={`validate_btn icon_arrow_right ${*/}
        {/*          pendingSubscribed ? 'loading' : ''*/}
        {/*        }`}*/}
        {/*        aria-label="send"*/}
        {/*      >*/}
        {/*        Ուղարկել*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*    <div className="error_hint">*/}
        {/*      {formik.errors.email && formik.touched.email ? (*/}
        {/*        <span> {formik.errors.email}</span>*/}
        {/*      ) : null}*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <ReCaptcha*/}
        {/*    name="token"*/}
        {/*    setTokenValue={setTokenValue}*/}
        {/*    page="subscribeMember"*/}
        {/*  />*/}
        {/*</form>*/}
        {skSocials ? (
          <div className="socials_list">
            <CreateSkeleton span={false} number={4} />
          </div>
        ) : (
          <ul className="socials_list">
            {socials_item.menus &&
              socials_item.menus.length &&
              socials_item.menus.map((menu, index) => {
                return <SocialsMenuItem key={index} item={menu} />;
              })}
          </ul>
        )}

        <PopupSuccess
          closeSuccessPopup={() => closePopup()}
          popupOpen={popupOpen}
          descriptionText={subscribeText}
          titleText={subscribeDescription}
        />
      </div>
    </div>
  );
};

export default TopFooter;
