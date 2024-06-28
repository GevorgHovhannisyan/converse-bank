import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import settings from './settings/settings.json';
const reCaptchaKey =
  settings.RECAPTCHA_SITE_KEY || '6LdtGesjAAAAAPBPvx_2oD_793cOmisPqdLUAp9u';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
      container={{
        // optional to render inside custom element
        element: 'captcha_badge',
        parameters: {
          badge: 'bottomleft', // optional, default undefined
        },
      }}
    >
      <App />
    </GoogleReCaptchaProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
