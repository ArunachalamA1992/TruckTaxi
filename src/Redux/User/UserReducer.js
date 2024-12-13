const {
  SET_USER_DATA,
  SET_ACTIVE_LOGIN_DATA,
  SET_REFRESH,
  SET_FILTER_DATE,
} = require('./UserActionTypes');

const initialState = {
  userData: {},
  ActiveLogin: {
    ActiveLoginModal: false,
    ActiveLoginData: {},
  },
  refresh: false,
  filterDate: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SET_ACTIVE_LOGIN_DATA:
      return {
        ...state,
        ActiveLogin: action.payload,
      };
    case SET_REFRESH:
      return {
        ...state,
        refresh: action.payload,
      };
    case SET_FILTER_DATE:
      return {
        ...state,
        filterDate: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
