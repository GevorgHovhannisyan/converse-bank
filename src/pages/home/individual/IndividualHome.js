import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MainLayout } from '../../../layouts/MainLayout';
import { FormattedMessage } from 'react-intl';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { Calculator } from '../../../components/calculator/Calculator';
import Exchange from '../../../components/exchange/exchange';
import {
  currencyLastDateSelector,
  currencySelector,
  homeSliderSelector,
  topSliderSkLoading,
  home_page,
} from '../../../redux/slices/home/home';
import { servicesSelector } from '../../../redux/slices/service/service';
import {
  homeBannerSelector,
  siteSettingsSelector,
} from '../../../redux/slices/settings/settings';

import { homeBlogs } from '../../../redux/slices/blog/blog';
import { getServices } from '../../../redux/thunks/serviceThunk';
import { getHomeSlider, getHomePage } from '../../../redux/thunks/homeThunk';
import { getHomeBanner } from '../../../redux/thunks/settingsThunk';
import { getHomeBlogs } from '../../../redux/thunks/blog/blogThunk';
import MainSlider from '../../../components/slider/mainSlider';
import HomeServiceSlider from '../../../components/slider/homeServiceSlider';
import { HomeBannerComponent } from '../../../components/banner/HomeBannerComponents';
import HomeBlogComponent from '../../../components/blog/homeBlogComponent';
import HomeAppSection from '../../../components/homeAppSection/home-app-section';
import { Helmet } from 'react-helmet';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './individual.scss';
import '../../../components/banner/banner.scss';
import { Desktop } from '../../../helpers/devices';
import CreateSkeleton from '../../../components/hoc/skeleton';
import { PopupSuccess } from '../../../components/popups/successPopup';
import { getHelmetThunk } from '../../../redux/thunks/menus/pageThunk';
import { pageData } from '../../../redux/slices/navigation/navigation';

const IndividualHome = () => {
  const homeSlider = useSelector(homeSliderSelector);
  const homePage = useSelector(home_page);
  const services = useSelector(servicesSelector);
  const homeBanner = useSelector(homeBannerSelector);
  const blogs = useSelector(homeBlogs);
  const dispatch = useDispatch();
  const skTopSlider = useSelector(topSliderSkLoading);
  let helments_list = useSelector(pageData);
  const [popupOpen, showPopup] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const FB_VERIFY_CODE = process.env.REACT_APP_FACEBOOK_VERIFICATION;
  const { lang } = useParams();

  useEffect(() => {
    dispatch(getHomePage());
  }, []);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getHomeBanner());
    homePage.id && dispatch(getHomeSlider(homePage.id));
    dispatch(getHelmetThunk());

    dispatch(getHomeBlogs());

    if (searchParams.get('message')) {
      const message = searchParams.get('message');
      if (message === 'email_verified') {
        showPopup(true);
        setSearchParams('');
      }
    }
  }, [dispatch, lang, searchParams, setSearchParams, homePage.id]);

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

  const SERVICE_SLIDER = {
    infinite: true,
    slidesToShow: 6,
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
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
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

  const renderServiceSlider = (settings, services) => {
    return (
      <Slick {...settings}>
        {services.length &&
          services.map((item, index) => {
            return <HomeServiceSlider slider={item} key={`slide-${index}`} />;
          })}
      </Slick>
    );
  };

  const siteSettings = useSelector(siteSettingsSelector);

  let defaultMeta = {
    title: siteSettings.website_title,
    description:
      siteSettings.website_description || siteSettings.welcome_message,
  };

  const verifiedEmail = <FormattedMessage id="Email verified" />;
  const verifiedText = <FormattedMessage id="Your email verifies" />;
  const currencyData = useSelector(currencySelector);
  const currMaxDate = useSelector(currencyLastDateSelector);

  return (
    <MainLayout>
      <div className="home_page">
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

        <Calculator />

        <div className="home_services">
          <div className="page_container">
            <div className="section_head">
              <h2 className="section_title">
                {skTopSlider ? (
                  <CreateSkeleton span={false} number={1} />
                ) : (
                  <FormattedMessage id="Services" />
                )}
              </h2>
            </div>
            {skTopSlider ? (
              <CreateSkeleton span={true} number={6} />
            ) : (
              renderServiceSlider(SERVICE_SLIDER, services)
            )}
          </div>
        </div>

        <Exchange currMaxDate={currMaxDate} currencyData={currencyData} />

        <div className="banner_block">
          <HomeBannerComponent banner={homeBanner} />
        </div>

        <div className="page_container">
          <div className="blog_section">
            <div className="section_head">
              <div className="section_title">
                {' '}
                <FormattedMessage id="Blog" />
              </div>
              <NavLink
                to={lang ? `/${lang}/blog` : '/blog'}
                className="view_more icon_right"
              >
                <FormattedMessage id="See more" />
              </NavLink>
            </div>
            <HomeBlogComponent blogs={blogs} />
          </div>
        </div>
        <HomeAppSection />

        <PopupSuccess
          closeSuccessPopup={() => {
            showPopup(false);
          }}
          popupOpen={popupOpen}
          titleText={verifiedEmail}
          descriptionText={verifiedText}
        />
      </div>
    </MainLayout>
  );
};

export default IndividualHome;
