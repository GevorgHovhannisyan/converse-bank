import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MainLayout } from '../../layouts/MainLayout';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { homeSliderSelector, topSliderSkLoading } from '../../redux/slices/home/home';
import { siteSettingsSelector } from '../../redux/slices/settings/settings';
import { getHomeSlider } from '../../redux/thunks/homeThunk';
import { blogsSelector, blogTagSelector } from '../../redux/slices/blog/blog';
import { getBlogs, getBlogTags } from '../../redux/thunks/blog/blogThunk';
import MainSlider from '../../components/slider/mainSlider';
import { Helmet } from 'react-helmet';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../home/individual/individual.scss';
import { Desktop } from '../../helpers/devices';
import CreateSkeleton from '../../components/hoc/skeleton';
import { getHelmetThunk } from '../../redux/thunks/menus/pageThunk';
import { pageData } from '../../redux/slices/navigation/navigation';
import MobileApp from '../../components/landing/MobileApp';
import SmallBanner from '../../components/landing/SmallBanner';
import AboutProduct from '../../components/landing/AboutProduct';
import LeftSection1 from '../../components/landing/LeftSection1';
import LeftSection2 from '../../components/landing/LeftSection2';
import LeftSection3 from '../../components/landing/LeftSection3';
import LeftSection4 from '../../components/landing/LeftSection4';
import RightSection1 from '../../components/landing/RightSection1';
import RightSection2 from '../../components/landing/RightSection2';
import FullSection from '../../components/landing/FullSection';
import DeviceTrusted from '../../components/landing/DeviceTrusted';
import LandingBanner from '../../components/landing/LandingBanner';
import CardsSection from '../../components/landing/CardsSection';
import ProductsSlider from '../../components/landing/ProductsSlider';
import BannerLarge from '../../components/landing/BannerLarge';
import LandingForm from '../../components/landing/LandingForm';
import HomeBlogComponent from "../../components/blog/homeBlogComponent";
import { FormattedMessage } from "react-intl";
import { landingSelector, notFoundSelector } from "../../redux/slices/landing/landing";
import { getLandingInfoThunk } from "../../redux/thunks/landing";

const IndividualHome = (props) => {
    const homeSlider = useSelector(homeSliderSelector);
    const pageNotFound = useSelector(notFoundSelector);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const blogs = useSelector(blogsSelector);
    const skTopSlider = useSelector(topSliderSkLoading);
    let helments_list = useSelector(pageData);
    const FB_VERIFY_CODE = process.env.REACT_APP_FACEBOOK_VERIFICATION;
    const siteSettings = useSelector(siteSettingsSelector);
    const landing = useSelector(landingSelector);
    const blogTags = useSelector(blogTagSelector);
    const { lang  } = useParams();

    const mapTemplates = {
        template1: MobileApp,
        template2: SmallBanner,
        template3: AboutProduct,
        template4: LeftSection1,
        template5: RightSection1,
        template6: LeftSection2,
        template7: FullSection,
        template8: LeftSection3,
        template9: RightSection2,
        template10: LeftSection4,
        template11: DeviceTrusted,
        template12: LandingBanner,
        template13: CardsSection,
    };

    useEffect(() => {
        if(blogTags?.length) {
            const findTag = blogTags.find(tag => tag.slug === 'mobile');
            if(findTag) {
                dispatch(getBlogs({ tag: findTag.id }));
            }
        }
    },[dispatch, blogTags]);

    useEffect(( ) => {
        if(pageNotFound) {
            navigate('/not-found')
        }

    }, [pageNotFound])


    useEffect(() => {
        dispatch(getLandingInfoThunk('mobileapp'))
        dispatch(getBlogTags());
        dispatch(getHelmetThunk());
    }, [lang, dispatch]);

    useEffect(() => {
        landing.id && dispatch(getHomeSlider(landing.id));
    }, [dispatch, lang, landing.id]);

    const SLIDER_SETTINGS = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        arrows: false,
        speed: 500,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        pauseOnFocus: false,
        className: 'main_slider',
        customPaging: (i) => (
            <span>
        <Desktop>
          <span className="slide_category">
            {homeSlider && homeSlider.length && homeSlider[i].category}
          </span>
          <span className="slide_name">
            {homeSlider && homeSlider.length && homeSlider[i].title}
          </span>
        </Desktop>
      </span>
        ),
        appendDots: (dots) => (
            <div className="slider_dots">
                <ul> {dots} </ul>
            </div>
        ),
    };

    const renderTopSlider = (settings) => {
        return (
            <Slick {...settings}>
                {!!homeSlider.length &&
                homeSlider.map((item, index) => {
                    return (
                        <MainSlider
                            slide={item}
                            key={`slide-${index}`}
                            className={settings.className}
                        />
                    );
                })}
            </Slick>
        );
    };

    let defaultMeta = {
        title: siteSettings.website_title,
        description: siteSettings.website_description || siteSettings.welcome_message,
    };
    return (
        <MainLayout>
            <div className="landing_page" style={{backgroundImage: `url("/resources/images/bg.svg")`}}>
                <Helmet>
                    <title>
                        {helments_list.name ? helments_list.name : defaultMeta.title}
                    </title>
                    <meta
                        property="og:title"
                        content={
                            helments_list.name ? helments_list.name : defaultMeta.title
                        }
                    />
                    <meta
                        name="description"
                        content={
                            helments_list.meta_description
                                ? helments_list.meta_description
                                : defaultMeta.description
                        }
                    />
                    <meta name="facebook-domain-verification" content={FB_VERIFY_CODE} />
                    <meta name="keywords" content={helments_list.meta_keywords} />
                    <meta
                        property="og:description"
                        content={
                            helments_list.meta_description
                                ? helments_list.meta_description
                                : defaultMeta.description
                        }
                    />
                    <meta property="og:url" content={window.location.href} />
                    {/*<meta property="og:image" content={helments_list.image ? !(helments_list.image.path.indexOf("http://") === 0 || helments_list.image.path.indexOf("https://") === 0) ? `${window.location.origin}/image/${helments_list.image.path}` : helments_list.image.path : `${window.location.origin}/storage/img-not-found.png`} />*/}
                    <meta
                        name="twitter:title"
                        content={
                            helments_list.name ? helments_list.name : defaultMeta.title
                        }
                    />
                    <meta
                        name="twitter:description"
                        content={
                            helments_list.meta_description
                                ? helments_list.meta_description
                                : defaultMeta.description
                        }
                    />
                    <meta name="twitter:url" content={window.location.href} />
                </Helmet>
                {skTopSlider ? (
                    <>
                        <div className="main_slider">
                            <div className="psevdo_slide">
                                <div className="page_container">
                                    <span className="slide_title"></span>
                                    <span className="slide_description"></span>
                                    <span className="slide_btn"></span>
                                </div>
                            </div>
                            <CreateSkeleton span={false} number={4} />
                        </div>
                    </>
                ) : (
                    renderTopSlider(SLIDER_SETTINGS)
                )}
                {landing?.sections?.length &&
                landing.sections.map((section, index) => {
                    if(mapTemplates[section.template]) {
                        const  ComponentToRender = mapTemplates[section.template];
                        return  <ComponentToRender {...section} />
                    }
                })
                }
                <ProductsSlider services={landing?.services} />
                <div className="blog_landing">
                    <div className="page_container">
                        <div className="blog_section">
                            <div className="section_head">
                                <div className="section_title">
                                    {' '}
                                    <FormattedMessage id="Blog" />
                                </div>
                                <NavLink to={lang ?`/${lang}/blog/mobile`:'/blog/mobile'} target="_blank" className="view_more icon_right">
                                    <FormattedMessage id="See more" />
                                </NavLink>
                            </div>
                            <HomeBlogComponent blogs={blogs}  targetBlank={true}/>
                        </div>
                    </div>
                </div>
                <LandingForm />
                <BannerLarge />

            </div>
        </MainLayout>
    );
};

export default IndividualHome;
