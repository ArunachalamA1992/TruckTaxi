import {
  SET_ACTIVE_LOGIN_DATA,
  SET_FILTER_DATE,
  SET_REFRESH,
  SET_USER_DATA,
} from './UserActionTypes';

export const setUserData = param => {
  return {
    type: SET_USER_DATA,
    payload: param,
  };
};

export const setActiveLogin = param => {
  return {
    type: SET_ACTIVE_LOGIN_DATA,
    payload: param,
  };
};

export const setRefresh = param => {
  return {
    type: SET_REFRESH,
    payload: param,
  };
};

export const setFilterDate = param => {
  return {
    type: SET_FILTER_DATE,
    payload: param,
  };
};
