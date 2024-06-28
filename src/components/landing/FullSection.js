import './landing.scss'
import {FormattedMessage} from "react-intl";
import React from "react";

const FullSection = (section) => {
    return (
        <div className="full_section">
            <div className="page_container">
                <div className="page_row">
                    <div className="left_block">
                        <div className="section_title" dangerouslySetInnerHTML = {{__html:(section?.title)}}></div>
                        <div className="loading_description" dangerouslySetInnerHTML = {{__html:(section?.body)}}></div>
                        {section?.url && (
                            <a href={`${section?.url}`} className="primary_btn" target="_blank">
                                <FormattedMessage id="Call to action6"/>
                            </a>
                        )
                        }
                        {section?.summary && (
                            <div className="loading_summary" dangerouslySetInnerHTML = {{__html:(section?.summary)}}></div>
                        )
                        }
                    </div>

                    <div className="right_block">
                        <img src={section?.image} title={section?.title} alt={section?.title}/>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default FullSection;
