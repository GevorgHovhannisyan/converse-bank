import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './landing.scss';
import SlickSlider from "../controls/slick-slider";
import { FormattedMessage } from "react-intl";

const ProductsSlider = ({ services }) => {
    const productBlockLength = services?.length || 0;

    const ProductSliderSettings = {
        infinite: productBlockLength > 4,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        dots: false,
        arrows: true,
        touchThreshold: 40,
        speed: 500,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
        className: 'home_services_slider',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="home_services">
            <div className="page_container">
                <div className="product_card">
                    <div className="section_head">
                        <div className="section_title">
                            <FormattedMessage id="Required products" />
                        </div>
                    </div>
                    <SlickSlider settings={ProductSliderSettings}>
                        {services?.length && services.map((service) => {
                            return (
                                <div className="slide_block" key={service.id}>
                                    {service?.url ? (
                                        <a href={service.url} rel="noreferrer" target="_blank" className="inner_slider">
                                            <span className="slide_img">
                                              <img src={service?.image} title={service?.title} alt={service?.title} />
                                            </span>
                                            <span className="slide_info">
                                                <span className="slide_title icon_services" dangerouslySetInnerHTML={{ __html: service?.name }}></span>
                                                <span className="slide_summary" dangerouslySetInnerHTML={{ __html: service?.summary }}></span>
                                            </span>
                                        </a>
                                    ) : (
                                        <div className="inner_slider">
                                            <span className="slide_img">
                                              <img src={service?.image} title={service?.title} alt={service?.title} />
                                            </span>
                                                <span className="slide_info">
                                                <span className="slide_title icon_services" dangerouslySetInnerHTML={{ __html: service?.name }}></span>
                                                <span className="slide_summary" dangerouslySetInnerHTML={{ __html: service?.summary }}></span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </SlickSlider>
                </div>
            </div>
        </div>
    );
};

export default ProductsSlider;
