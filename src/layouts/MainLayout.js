import { useEffect, useState } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import TranslateProvider from '../helpers/TranslateProvider';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { languageSelector } from '../redux/slices/language/language';
import { useSelector } from 'react-redux';
import SendPulsePopup from '../components/sendPulse';
import { LiveChatWidget } from '@livechat/widget-react';
import { getGroupIdByLanguage } from '../helpers/Utils';
import settings from '../settings/settings.json';
import { siteSettingsSelector } from '../redux/slices/settings/settings';
import ReactGA from 'react-ga4';
import { getRouteMain } from "../constants/router";
import { LANGUAGES, LanguageTransCodes } from "../constants/language";

export const MainLayout = ({ children, noFooter }) => {
  let { lang } = useParams();
  const navigate = useNavigate();
  const langID = useSelector(languageSelector);
  const { pathname } = useLocation();
  const [group, setGroup] = useState('14');
  const [setingsList, setSetingsList] = useState({ ...settings });
  const settingsData = useSelector(siteSettingsSelector);
  const isValidLang = LANGUAGES.some(({ transCode }) => transCode === lang);
  const liveChatLicense = process.env.REACT_APP_LIVECHAT_LICENSE;

  useEffect(() => {
    if (lang && !isValidLang) {
      if (langID !== LanguageTransCodes.AM) {
        const url = pathname.replace(lang, langID);
        navigate(url);
      } else {
        navigate(getRouteMain());
      }
    }
  }, [lang, isValidLang, langID, navigate, pathname]);

  useEffect(() => {
    const langGroup = getGroupIdByLanguage(lang);
    setGroup(langGroup);
  }, [lang]);

  useEffect(() => {
    setSetingsList({ ...settingsData });
  }, [settingsData]);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
      title: 'Converse Bank',
    });
  }, [pathname]);

  return (
    <TranslateProvider>
      <SendPulsePopup />
      <Header />
      {children}
      {!noFooter && <Footer />}
      {setingsList.live_chat_enabled == 1 && (
        <LiveChatWidget
          license={liveChatLicense}
          visibility="minimized"
          group={group}
        />
      )}
      <div id="captcha_badge"></div>
    </TranslateProvider>
  );
};
