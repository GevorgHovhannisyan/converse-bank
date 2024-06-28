import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './landing.scss'
import SlickSlider from "../controls/slick-slider";
import {FormattedMessage} from "react-intl";
import React from "react";


const CardsSection = (section) => {

    const cardSliderSettings = {
        slidesToShow: 3,
        className: 'product_card',
        touchThreshold: 40,
        infinite: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 667,
                settings: {
                    slidesToShow: 1.5,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.2,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                },
            },
        ],
    };

    return (
        <div className="cards_section">
            <div className="page_container">
                <div className="product_card">
                    <div className="section_head">
                        <div className="section_title" dangerouslySetInnerHTML={{__html:(section?.title)}}></div>
                        <div className="loading_description" dangerouslySetInnerHTML={{__html:(section?.body)}}></div>
                    </div>
                    <SlickSlider settings={cardSliderSettings}>
                        {section?.files.length && section.files.map((file) => {
                            return (
                                <div className="product_section_slider">
                                    <div className="inner_slider">
                                        <div className="landing_title" dangerouslySetInnerHTML={{__html:(file?.title)}}></div>
                                        <div className="loading_description" dangerouslySetInnerHTML={{__html:(file?.description)}}></div>
                                        <div className="section_img">
                                            <img src={file?.url} title={file?.title} alt={file?.title}/>
                                        </div>
                                        {section?.url && (
                                            <a href={`${section?.url}`} className="primary_btn" target="_blank">
                                                <FormattedMessage id={file?.title}/>
                                            </a>
                                        )
                                        }
                                        {section?.summary && (
                                            <div className="loading_summary" dangerouslySetInnerHTML={{__html:(section?.summary)}}></div>
                                        )
                                        }
                                    </div>
                                </div>
                            )
                        })
                        }
                    </SlickSlider>
                </div>
            </div>

        </div>
    );
};

export default CardsSection;
