import './landing.scss'
import settingsJson from "../../settings/settings";
import {FormattedMessage} from "react-intl";

const BannerLarge = () => {
    return (
        <div className="page_container">
        <div className="banner_large small_banner">
                <div className="page_title">
                    <FormattedMessage id="Join more title" />
                </div>
                <div className="banner_description">
                    <FormattedMessage id="Join more desc" />
                </div>
                <div className="page_row">
                    <a rel="noreferrer" href={`${settingsJson.android_url}`} target="_blank" className="app_form">
                        <img src="/resources/images/img6.svg" title="" width="135" height="40" alt="" />
                    </a>
                    <a rel="noreferrer" href={`${settingsJson.apple_url}`} target="_blank" className="app_form">
                        <img src="/resources/images/img7.svg" title="" width="135" height="40" alt="" />
                    </a>
                    <a rel="noreferrer" href={`${settingsJson.huawei_url}`} target="_blank" className="app_form">
                        <img src="/resources/images/img8.svg" title="" width="135" height="40" alt="" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BannerLarge;
