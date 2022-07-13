import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions.js";
import LoginModal from "../session/login_modal";
import SignupModal from "../session/signup_modal.js";
import CreateAlertModal from "../alerts/create_alert_modal.js";
import AboutModal from "../about/about_modal.js";

function NavBar(props) {
  const [state, setState] = useState({ 
    isLoginOpen: false, isSignupOpen: false, isAlertOpen: false, isAboutOpen: false
  });

  const openLogin = () => {
    setState({
      isLoginOpen: true, isSignupOpen: false, isAlertOpen: false, isAboutOpen: false
    })
  };

  const openSignup = () => {
    setState({
      isLoginOpen: false, isSignupOpen: true, isAlertOpen: false, isAboutOpen: false
    })
  };

  const openAlert = () => {
    setState({
      isLoginOpen: false, isSignupOpen: false, isAlertOpen: true, isAboutOpen: false
    })
  }

  const closeModal = () => {
    setState({
      isLoginOpen: false, isSignupOpen: false, isAlertOpen: false, isAboutOpen: false
    });
  };

  const openAbout = () => {
    setState({
      isLoginOpen: false, isSignupOpen: false, isAlertOpen: false, isAboutOpen: true
    });
  }
  
  const logoutUser = (e) => {
    e.preventDefault();
    props.logout();
    // window.location.reload();
  };

  const getLinks = () => {
    if (props.loggedIn) {
      return (
        <div className='nav-links'>
          <Link id="link" className='user-email' to="/profile">
            <h4>{props.currentUser.email}</h4>
          </Link>
          <Link id="link" to="/" onClick={openAbout}>
            <h4>About</h4>
          </Link>
          <Link id="link" to="/" onClick={openAlert}>
            <h4>Create an Alert</h4>
          </Link>
          <div className='logout-button-container'>
            <button id='logout-button' onClick={logoutUser}>Logout</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className='nav-links'>
          <div>
            <Link id="link" to="/" onClick={openAbout}>
              <h4>About</h4>
            </Link>
          </div>
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
          <Link to='/' onClick={closeModal}>
          <img
            id="logo"
            src="https://linealert-assets.s3.amazonaws.com/linealert_logo_full.png"
            alt="line-alert-logo"
          />
          </Link>
        </div>
        <div className="links"></div>
        <div className="login-signup">{getLinks()}</div>
      </div>

      <LoginModal
        isOpen={state.isLoginOpen}
        openSignup={openSignup}
        closeModal={closeModal}
      />

      <SignupModal
        isOpen={state.isSignupOpen}
        openLogin={openLogin}
        closeModal={closeModal}
      />

      <CreateAlertModal
        isOpen={state.isAlertOpen}
        closeModal={closeModal}
      />
      <AboutModal
        isOpen={state.isAboutOpen}
        closeModal={closeModal}
      />
    </header>
    
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);