import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const REMOVE_ERRORS = "REMOVE_ERRORS";

const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

const logoutUser = () => {
  return {
    type: RECEIVE_USER_LOGOUT,
  };
};

export const removeErrors = () => {
  return {
    type: REMOVE_ERRORS
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};

export const signup = (user) => (dispatch) =>
  APIUtil.signup(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
      return decoded;
    })
    .catch((err) => {
      dispatch(receiveSessionErrors(err.response.data));
      return null;
    });

export const login = (user) => (dispatch) =>
  APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
      return decoded;
    })
    .catch((err) => {
      dispatch(receiveSessionErrors(err.response.data));
      return null;
    });

export const updateUser = user => dispatch => {
  APIUtil.updateUser(user)
    .then(res => dispatch(receiveCurrentUser(res)))
    .catch(err => dispatch(receiveSessionErrors(err)))
}