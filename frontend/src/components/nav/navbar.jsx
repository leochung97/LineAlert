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
          <Link to="/">All Alerts</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/new_alert">Create an Alert</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Line Alert NavBar</h1>
      {getLinks()}
    </div>
  );
}

export default NavBar;
