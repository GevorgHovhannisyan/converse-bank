import { IntlProvider } from 'react-intl';
import localTranslations from '../translations';
import { useParams } from 'react-router-dom';
import { LanguageTransCodes } from "../constants/language";

const TranslateProvider = ({ children }) => {
  const params = useParams();
  const langID = params.lang;

  const message = localTranslations[langID || LanguageTransCodes.AM];

  return (
    <IntlProvider locale={navigator.languages[1]} messages={message}>
      {children}
    </IntlProvider>
  );
};

export default TranslateProvider;
