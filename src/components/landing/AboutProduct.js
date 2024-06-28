import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './landing.scss'
import SlickSlider from "../controls/slick-slider";
import {FormattedMessage} from "react-intl";
import React from "react";

const AboutProduct = (section) => {

    const aboutSliderSettings = {
        slidesToShow: 3,
        className: 'product_section',
        touchThreshold: 40,
        infinite: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2.5,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1.5,
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
        <div className="about_product">
            <div className="page_container">
                <div className="product_section">
                    <div className="section_head">
                        <div className="section_title" dangerouslySetInnerHTML = {{__html:(section?.title)}}></div>
                    </div>
                    <SlickSlider settings={aboutSliderSettings}>
                        {section?.files.length && section.files.map((file) => {
                            return (
                                <div className="product_section_slider">
                                    <div className="section_img">
                                        <img src={file?.url} title={file?.title} alt={file?.title}/>
                                    </div>
                                    <div className="landing_title" dangerouslySetInnerHTML = {{__html:(file?.description)}}></div>
                                </div>
                            )
                        })
                        }
                    </SlickSlider>
                    {section?.url && (
                        <a href={`${section?.url}`} className="primary_btn" target="_blank">
                            <FormattedMessage id="Call to action2"/>
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
    );
};

export default AboutProduct;
