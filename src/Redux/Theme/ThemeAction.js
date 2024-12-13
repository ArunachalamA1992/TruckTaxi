import {SET_THEME_CHANGE} from './ThemeActionTypes';

export const setThemeChange = param => {
  return {
    type: SET_THEME_CHANGE,
    payload: param,
  };
};
