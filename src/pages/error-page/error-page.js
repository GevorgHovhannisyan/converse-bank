import React  from "react";
import './error-page.scss';
import { FormattedMessage } from "react-intl";
import { useParams, NavLink } from "react-router-dom";
import { SocialsMenuItem } from "../../components/footer/components/top-footer/footerMenuList";
import settings from "../../settings/settings";
import { useSelector } from "react-redux";
import { socialsList } from "../../redux/slices/navigation/navigation";
import { siteSettingsSelector } from "../../redux/slices/settings/settings";
import { getRouteMain } from "../../constants/router";

const ErrorPage = () => {
    let socials_item = useSelector(socialsList);
    let siteSettings = useSelector(siteSettingsSelector);
    const { lang } = useParams();

    return (
        <div className="coming_soon_page error_page" style={{ backgroundImage: `url("/resources/images/coming_soon.png")` }}>
            <div className="page_container">
                <div className="inner_soon">
                    <div className="error_section">
                        <div className="error_block">
                            <div className="page_title"><FormattedMessage id="Sorry, this page was not found" /></div>
                            <div className="page_description">
                                <FormattedMessage id="The page you are looking for might have been removed had its name changed or is temporarily unavailable" />
                            </div>
                            <div className="page_links">
                                <NavLink to={lang ? `/${lang}/` : getRouteMain()} className="back_home">
                                    <FormattedMessage id="Home page" />
                                </NavLink>
                                {/*<a*/}
                                {/*    href={`https://www.conversebank.am/${lang ? lang : 'hy'}/`}*/}
                                {/*    className="prev_page"*/}
                                {/*>  */}
                                    <a
                                        href="https://conversebank.am/hy/announcements/item/1951/"
                                    className="prev_page"
                                >
                                    <FormattedMessage id="To the old site" />
                                </a>
                            </div>
                        </div>
                        <div className="image_block">
                            <img
                                src="/resources/images/404.png"
                                title=""
                                width="162"
                                height="48"
                                alt=""
                            />
                        </div>
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
                        <a rel="noreferrer" href={`${settings.huawei_url}`} target="_blank"
                           className="app_form">
                            <img src="/resources/images/img8.svg" title="" width="135" height="40" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ErrorPage;
