import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/stylesheets/application.css";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";
import { fetchAlerts } from "./actions/alert_actions";
// import reportWebVitals from "./reportWebVitals";

document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    // If this is a first time user, start with an empty store
    store = configureStore({});
  }

  window.store = store;
  window.fetchAlerts = fetchAlerts;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  return root.render(<Root store={store} />);
});
