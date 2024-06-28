import { useEffect,  useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { getMenuThunk } from '../../redux/thunks/menus/menuThunk';
import { getCurrencies } from '../../redux/thunks/homeThunk';
import {
  currencySelector,
  currencyLastDateSelector,
} from '../../redux/slices/home/home';

import {
  headerMenu,
  main_navigation,
  menuSkLoading,
  topMenuID,
} from '../../redux/slices/navigation/navigation';
import { siteSettingsSelector } from '../../redux/slices/settings/settings';

import GoToOldPage from './goToOld';

import './header.scss';
import { LanguageSwitcher } from '../languageSwitcher/language';

import {
  /* GenHeaderMenu, */ GenHeaderTopMenu,
} from '../../helpers/GenerateMenu';
import { FormattedMessage } from 'react-intl';
import Currency from '../currency';
import Search from '../search';
import BecomeCustomer from '../becomeCustomer';
import { HeaderMenu } from '../navbar.js/HeaderMenu';
import { Desktop, Mobile } from '../../helpers/devices';
import CreateSkeleton from '../hoc/skeleton';
import { toggleClassList, headerUrlFiltered } from '../../helpers/Utils';
import { getRouteMain } from "../../constants/router";
import { LanguageTransCodes } from "../../constants/language";

/* eslint-disable */
const Header = () => {
  const dispatch = useDispatch();
  let siteSettings = useSelector(siteSettingsSelector);
  const main_menu = useSelector(main_navigation);
  const secondLevelMenu = useSelector(headerMenu);
  const menuID = useSelector(topMenuID);
  const currencyData = useSelector(currencySelector);
  const skLoading = useSelector(menuSkLoading);
  const currMaxDate = useSelector(currencyLastDateSelector);
  let { lang } = useParams();
  const menuBtnRef = useRef(null);

  const onMobileMenuClick = () => {
    toggleClassList(document.body, 'menu_opened');
  };

  const { pathname } = useLocation();

  const normalizePath = headerUrlFiltered({ lang, pathname });

  const onClickHeader = (e) => {
    document.body.classList.remove('menu_opened');
  }

  useEffect(() => {
    dispatch(getMenuThunk({ normalizePath }));
    dispatch(getCurrencies());
  }, [dispatch, lang]);


  return (
    <div  className="header">
      <GoToOldPage />
      <div className="header_top">
        <div className="page_container">
          <div onClick={onClickHeader} className="type_menu">
            {!skLoading ? (
              <ul>{<GenHeaderTopMenu main_menu={main_menu} lang={lang} />}</ul>
            ) : (
              <CreateSkeleton span={false} number={2} />
            )}
          </div>

          <Currency currMaxDate={currMaxDate} currencyData={currencyData} />
          <a
              target="_blank"
              href={`https://conversebank.am/${lang ? lang : LanguageTransCodes.AM}/branches/`}
              className="action_btn icon_location" rel="noreferrer"
            >
              <FormattedMessage id="Branches" />
            </a>
          <Search />
          <LanguageSwitcher lang={lang} />
          <Desktop>
            <a
              href={`tel:${siteSettings.webmaster_phone || '+37410511211'}`}
              className="phone_block"
              rel="noopener noreferrer"
            >
              {siteSettings.webmaster_phone || ' + 374 10 511 211'}
            </a>
            <BecomeCustomer />
            <a
              href={`https://ebanking.conversebank.am/InternetBank/MainForm.wgx`}
              target="_blank"
              rel="noopener noreferrer"
              className="online_banking"
            >
              <FormattedMessage id="Online banking" />
            </a>

          </Desktop>
        </div>
      </div>
      <div className="header_bottom">
        <div className="page_container">
          <div onClick={onClickHeader} className="main_logo">
            <NavLink to={lang?`/${lang}/`:getRouteMain()}>
              <img
                src="/resources/images/main_logo.svg"
                alt=" "
                title=" "
                width="143"
                height="22"
              />
            </NavLink>
          </div>

          {/* <div className="main_menu">{GenHeaderMenu(main_menu, lang)}</div> */}
          <Desktop>
            {
              <div className="main_menu">
                {!skLoading ? (
                  <HeaderMenu menu={secondLevelMenu[menuID]} />
                ) : (
                  <CreateSkeleton span={false} number={7} />
                )}
              </div>
            }
          </Desktop>
          <Mobile>
            <button
              ref={menuBtnRef}
              onClick={onMobileMenuClick}
              className="menu_btn"
              aria-label="mobile menu"
            >
              <span>
                <span></span>
              </span>
            </button>
            <div className="menu_block">
              <div className="menu_inner">
                {
                  <div className="main_menu">
                    <HeaderMenu menu={secondLevelMenu[menuID]} />
                  </div>
                }
                <div className="actions_block">
                  <a
                    rel="noopener noreferrer"
                    className="online_banking"
                    href={`https://ebanking.conversebank.am/InternetBank/MainForm.wgx`}
                  >
                    <FormattedMessage id="Online banking" />
                  </a>
                  <BecomeCustomer />
                </div>
                <div className="hotline">
                    <a
                      href={`tel:${siteSettings.webmaster_phone || '+37410511211'}`}
                      className="phone_block"
                      rel="noopener noreferrer"
                    >
                      {siteSettings.webmaster_phone || ' + 374 10 511 211'}
                    </a>
                </div>

              </div>
            </div>
          </Mobile>
        </div>
      </div>
    </div>
  );
};

export default Header;
