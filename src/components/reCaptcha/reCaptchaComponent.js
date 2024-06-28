import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCallback, useEffect, useState } from 'react';

const ReCaptcha = ({ name, page, setTokenValue }) => {
  const [token, setToken] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const generateCode = useCallback(() => {
    if (executeRecaptcha) {
      const result = executeRecaptcha(page);
      result
        .then((hash) => {
          setToken(hash);
          setTokenValue(hash);
        })
        .catch((e) => {
        });
    }
  }, [executeRecaptcha, page, setTokenValue]);

  useEffect(() => {
    generateCode();
  }, [generateCode]);

  return <input type="hidden" name={name} value={token} />;
};

export default ReCaptcha;
