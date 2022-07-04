import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    default:
      return state;
  }
};

export default sessionReducer;
