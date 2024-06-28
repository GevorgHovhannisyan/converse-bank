import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';
const FB_PIXEL_CODE = process.env.REACT_APP_FBPIXEL_CODE;


export const PixelProvider = ({ children }) => {
  let { pathname } = useLocation();
  const advancedMatching = {}; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
  const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
  };
  ReactPixel.init(FB_PIXEL_CODE, advancedMatching, options);
  
  ReactPixel.pageView(); // For tracking page view
  useEffect(() => {

    ReactPixel.pageView();
  }, [pathname]);

  return <div>{children}</div>;
};
