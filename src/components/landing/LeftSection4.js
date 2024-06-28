import './landing.scss'
import {FormattedMessage} from "react-intl";
import React, {useState} from "react";

const LeftSection4 = (section) => {
    const [showVideo, setShowVideo] = useState(false);

    const renderContent = () => {
        if (section.files && section.files.length) {
            if (showVideo) {
                return (
                    <div className="video_block">
                        <video width="305" height="575" controls autoPlay muted>
                            <source src={section.files[0].url} type="video/mp4"/>
                        </video>
                    </div>
                );
            } else {
                return (
                    <div className="video_btn">
                        <img src={section.image} title={section.title} alt={section.title}/>
                        {!showVideo && (
                            <button className="btn_play icon_play" onClick={() => setShowVideo(true)}>Play
                                Video</button>
                        )}
                    </div>
                );
            }
        } else {
            return <img src={section.image} title={section.title} alt={section.title}/>;
        }
    };

    return (
        <div className="left_section">
            <div className="page_container">
                <div className="inner_section">
                    <div className="page_row">
                        <div className="left_block">
                            {renderContent()}
                        </div>
                        <div className="right_block">
                            <div className="section_title" dangerouslySetInnerHTML = {{__html:(section?.title)}}></div>
                            <div className="loading_description" dangerouslySetInnerHTML = {{__html:(section?.body)}}></div>
                            {section?.url && (
                                <a href={`${section?.url}`} className="primary_btn" target="_blank">
                                    <FormattedMessage id="Call to action9"/>
                                </a>
                            )
                            }
                            {section?.summary && (
                                <div className="loading_summary" dangerouslySetInnerHTML = {{__html:(section?.summary)}}></div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSection4;
