export const LanguageCodes = {
    AM: 'am',
    RU: 'ru',
    EN: 'en',
}

export const LanguageTransCodes = {
    AM: 'hy',
    RU: 'ru',
    EN: 'en',
}

export const LanguageLabels = {
    AM: 'Հայ',
    RU: 'Рус',
    EN: 'Eng',
}

const AppLanguages = {
    am: { id: 1, code: LanguageCodes.AM, label: LanguageLabels.AM, transCode: LanguageTransCodes.AM },
    ru: { id: 2, code: LanguageCodes.RU, label: LanguageLabels.RU, transCode: LanguageTransCodes.RU },
    en: { id: 3, code: LanguageCodes.EN, label: LanguageLabels.EN, transCode: LanguageTransCodes.EN },
};

const LANGUAGES = Object.values(AppLanguages);
export { AppLanguages, LANGUAGES };
