import { SET_THEME_CHANGE } from "./ThemeActionTypes";

const initialState = {
  theme: false,
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME_CHANGE:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
