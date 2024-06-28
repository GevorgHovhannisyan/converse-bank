import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import settings from '../../settings/settings.json';
import { debugMode } from '../../constants/constants';

const SendPulsePopup = () => {
  const { lang } = useParams();

  useEffect(() => {
    let widget_id;
    if (!lang) {
      widget_id = settings.send_pulse_am;
    } else {
      widget_id = settings[`send_pulse_${lang}`];
    }

    if(!widget_id) {
     debugMode && console.warn('Send pulse widget id is not defined')
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://pop-ups.sendpulse.com/assets/loader.js';
    script.setAttribute('data-chats-widget-id', widget_id);
    script.async = true;
    document.body.appendChild(script);

    // return () => {
    //   document.body.removeChild(script);
    // };
  }, [lang]);

  return <></>;
};

export default SendPulsePopup;
