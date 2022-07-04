import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const logoutUser = (e) => {
    e.preventDefault();
    props.logout();
  };
  const getLinks = () => {
    if (props.loggedIn) {
      return (
        <div>
          <Link id="link" to="/">
            <h4>All Alerts</h4>
          </Link>
          <Link id="link" to="/profile">
            <h4>Profile</h4>
          </Link>
          <Link id="link" to="/new_alert">
            <h4>Create an Alert</h4>
          </Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link id="link" to="/signup">
            <h4>Signup</h4>
          </Link>
          <Link id="link" to="/login">
            <h4>Login</h4>
          </Link>
        </div>
      );
    }
  };

  return (
    <header>
      <div className="header">
        <div className="header-logo">
          <img
            id="logo"
            src="https://linealert-assets.s3.amazonaws.com/linealert_logo_full.png"
            alt="line-alert-logo"
          />
        </div>
        <div className="links"></div>
        <div className="login-signup">{getLinks()}</div>
      </div>
    </header>
  );
}

export default NavBar;
