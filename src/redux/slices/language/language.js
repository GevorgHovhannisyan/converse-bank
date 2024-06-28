import { createSlice } from '@reduxjs/toolkit';
import { LanguageLabels, LANGUAGES, LanguageTransCodes} from '../../../constants/language';

const initialState = {
  lang: localStorage.getItem('locale') || LanguageTransCodes.EN,
  languages: [
    { id: 1, code: LanguageTransCodes.AM, label: LanguageLabels.AM },
    { id: 2, code: LanguageTransCodes.RU, label: LanguageLabels.RU },
    { id: 3, code: LanguageTransCodes.EN, label: LanguageLabels.EN },
  ],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, { payload }) => {
      const isValidLanguage = LANGUAGES.some(
        ({ transCode }) => transCode === payload
      );

      if (!isValidLanguage) {
        return;
      }

      localStorage.setItem('locale', payload);
      state.lang = payload;
    },
  },
});
export const languageSelector = (state) => state.language.lang;

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
