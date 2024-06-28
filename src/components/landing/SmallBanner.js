import './landing.scss'
import settingsJson from "../../settings/settings";

const SmallBanner = (section) => {
    return (
        <div className="small_banner" style={{ backgroundImage: `url("/resources/images/img9.svg")` }}>
            <div className="page_container">
                <div className="section_title" dangerouslySetInnerHTML = {{__html:(section?.title)}}></div>
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

export default SmallBanner;
