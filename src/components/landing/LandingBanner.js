import './landing.scss'
import {FormattedMessage} from "react-intl";
import React from "react";

const LandingBanner = (section) => {
    return (
        <div className="landing_banner">
            <div className="page_container">
                <div className="home_banner_inner">
                    <div className="banner_img">
                        <img src={section?.image} title={section?.title} alt={section?.title}/>
                    </div>
                    <div className="banner_info">
                        <div className="section_title" dangerouslySetInnerHTML={{__html:(section?.title)}}></div>
                        <div className="banner_description" dangerouslySetInnerHTML={{__html:(section?.body)}}></div>
                        {section?.url && (
                            <a href={`${section?.url}`} className="primary_btn" target="_blank">
                                <FormattedMessage id="Call to action11"/>
                            </a>
                        )
                        }
                        {section?.summary && (
                            <div className="loading_summary" dangerouslySetInnerHTML={{__html:(section?.summary)}}></div>
                        )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingBanner;
