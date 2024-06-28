export const detectRouteLanguage = () => {
    const ruRegexp = /ru/;
    const enRegexp = /en/;
    const { href } = window.location;
    
    if (ruRegexp.test(href)) {
        return 'ru';
    } else if (enRegexp.test(href)) {
        return 'en';
    } else {
        return 'hy';
    }
}
