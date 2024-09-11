// src/utils/themeCookieUtil.js
import Cookies from 'js-cookie';

const THEME_COOKIE_NAME = 'theme';
const THEME_COOKIE_EXPIRATION_DAYS = 1;

export const setThemeCookie = (theme) => {
  Cookies.set(THEME_COOKIE_NAME, theme, { expires: THEME_COOKIE_EXPIRATION_DAYS });
};

export const getThemeCookie = () => {
  return Cookies.get(THEME_COOKIE_NAME);
};

export const applyThemeFromCookie = () => {
  const savedTheme = getThemeCookie();
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    return 'dark';
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    return 'light';
  }
  return null; // No theme set
};
