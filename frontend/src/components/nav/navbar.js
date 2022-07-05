import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import LoginModal from "../session/login_modal";
import SignupModal from "../session/signup_modal.js";

function NavBar(props) {
  const [state, setState] = useState(
    { isLoginOpen: false, isSignupOpen: false }
  );

  const openLogin = () => {
    setState({
      isLoginOpen: true, isSignupOpen: false
    })
  };

  const openSignup = () => {
    setState({
      isLoginOpen: false, isSignupOpen: true
    })
  };

  const closeModal = () => {
    setState({
      isLoginOpen: false, isSignupOpen: false
    })
  };
  
  const logoutUser = (e) => {
    e.preventDefault();
    props.logout();
  };

  const getLinks = () => {
    if (props.loggedIn) {
      return (
        <div className='nav-links'>
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
        <div className='nav-links'>
          <div>
            <Link id="link" to="/register" onClick={openSignup}>
              <h4>Signup</h4>
            </Link>
          </div>
          <div>
            <Link id="link" to="/login" onClick={openLogin}>
              <h4>Login</h4>
            </Link>
          </div>
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

      <LoginModal
        isOpen={state.isLoginOpen}
        closeModal={closeModal}
      />

      <SignupModal
        isOpen={state.isSignupOpen}
        closeModal={closeModal}
      />
    </header>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);