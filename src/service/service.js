import axios from 'axios';
import ReactGA from 'react-ga4';
import { detectRouteLanguage } from './utils';

const API_URL = process.env.REACT_APP_API_PATH;
const GA_CODE = process.env.REACT_APP_GA_CODE;
ReactGA.initialize(GA_CODE);
const instance = axios.create({
  baseURL: API_URL,
});

export const apiRequest = (config) => {
  instance.defaults.baseURL =
    process.env.REACT_APP_API_URL || 'http://localhost:3000';

    const  routerLanguage = detectRouteLanguage();


  instance.defaults.headers.common['Accept-Language'] =
    localStorage.getItem('locale') || routerLanguage;
    localStorage.setItem('locale', routerLanguage)
  
  const { params, ...rest } = config;
  const apiParams = config.params
    ? {
        ...params,
      }
    : {};

  const conf = {
    ...rest,
    params: { ...apiParams },
  };

  return instance(conf)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      const status = error && error.response.status
      if (!error.response) {
        throw Error('something_went_wrong');
      }
      // handle error
      const { Error } = error.response.data;
      // ReactGA.exception({
      //   description: `message: ${text.message}, type: server, error: ${text}`,
      //   fatal: true,
      // });
      return {data: status, message: Error}
    });
};
