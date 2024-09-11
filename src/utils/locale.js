import Cookies from 'js-cookie';

export const getLocale = () => {
  return Cookies.get('locale') || 'en';
};

export const setLocale = (locale) => {
  Cookies.set('locale', locale, { expires: 365 });
};