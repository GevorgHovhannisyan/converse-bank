import './comingSoon.scss';
import { FormattedMessage } from 'react-intl';
import settings from '../../settings/settings';
import { SocialsMenuItem } from '../footer/components/top-footer/footerMenuList';
import { useSelector } from 'react-redux';
import { socialsList } from '../../redux/slices/navigation/navigation';
import { siteSettingsSelector } from '../../redux/slices/settings/settings';
import { useParams, NavLink } from 'react-router-dom';
import { getRouteMain } from "../../constants/router";

const ComingSoon = () => {
  let socials_item = useSelector(socialsList);
  let siteSettings = useSelector(siteSettingsSelector);
  const { lang } = useParams();

  return (
    <div
      className="coming_soon_page"
      style={{ backgroundImage: `url("/resources/images/coming_soon.png")` }}
    >
      <div className="page_container">
        <div className="inner_soon">
          <div className="page_title">
            <FormattedMessage id="The site is being updated. Will be available soon" />
          </div>
          <div className="page_description">
            <FormattedMessage id="For now, you can use our old website" />
          </div>
          <div className="btn_coming">
            <NavLink to={lang ? `/${lang}/` : getRouteMain()} className="primary_btn">
              <FormattedMessage id="Home page" />
            </NavLink>
            {/*<a*/}
            {/*  href={`https://www.conversebank.am/${lang ? lang : 'hy'}/`}*/}
            {/*  className="back_btn"*/}
            {/*> */}
              <a
                  href="https://conversebank.am/hy/announcements/item/1951/"
              className="back_btn"
            >
              <FormattedMessage id="To the old site" />
            </a>
          </div>
        </div>
        <div className="coming_soon_bottom">
          <div className="page_row">
            <a
              href={`tel:${siteSettings.webmaster_phone || '+37410511211'}`}
              className="phone_block"
              rel="noopener noreferrer"
            >
              {siteSettings.webmaster_phone || ' + 374 10 511 211'}
            </a>
            <ul className="socials_list">
              {socials_item.menus &&
                socials_item.menus.length &&
                socials_item.menus.map((menu, index) => {
                  return <SocialsMenuItem key={index} item={menu} />;
                })}
            </ul>
          </div>
          <div className="app_block">
            <a href={`${settings.android_url}`} className="app_form">
              <img
                src="/resources/images/img6.svg"
                title=""
                width="162"
                height="48"
                alt=""
              />
            </a>
            <a href={`${settings.apple_url}`} className="app_form">
              <img
                src="/resources/images/img7.svg"
                title=""
                alt=""
                width="162"
                height="48"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
