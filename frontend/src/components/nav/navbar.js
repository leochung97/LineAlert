import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions.js";
import LoginModal from "../session/login_modal";
import SignupModal from "../session/signup_modal.js";
import CreateAlertModal from "../alerts/create_alert_modal.js";
import AboutModal from "../about/about_modal.js";
import InfoModal from "../info/info.js";
import ProfileModal from "../profile/profile_modal.js";

function NavBar(props) {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [alert, setAlert] = useState(false);
  const [about, setAbout] = useState(false);
  const [info, setInfo] = useState(false);
  const [profile, setProfile] = useState(false);

  const openLogin = () => {
    setSignup(false);
    setLogin(true);
  };

  const openSignup = () => {
    setLogin(false);
    setSignup(true);
  };

  const closeModal = () => {
    setLogin(false);
    setSignup(false);
    setAlert(false);
    setAbout(false);
    setInfo(false);
    setProfile(false);
  };
  
  const logoutUser = (e) => {
    e.preventDefault();
    props.logout();
    closeModal();
    window.location.reload();
  };

  const getLinks = () => {
    if (props.loggedIn) {
      return (
        <div className='nav-links'>
          <Link id="link" className='user-email' to="/" onClick={() => {
            closeModal()
            // setProfile(true)
            }}
          >
            <h4>{props.currentUser.email}</h4>
          </Link>

          <Link id="link" to="/" onClick={() => {
            closeModal()
            setAbout(true)
            }}
          >
            <h4>Contact</h4>
          </Link>

          <Link id="link" to="/" onClick={() => {
            closeModal()
            setInfo(true)
            }}
          >
            <h4>Info</h4>
          </Link>

          <Link id="link" to="/" onClick={() => {
            closeModal()
            setAlert(true)
            }}
          >
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
            <Link id="link" to="/" onClick={() => {
              closeModal()
              setAbout(true)
              }}
            >
              <h4>Contact</h4>
            </Link>
          </div>

          <div>
            <Link id="link" to="/" onClick={() => {
              closeModal()
              setInfo(true)
              }}
            >
              <h4>Info</h4>
            </Link>
          </div>

          <div>
            <Link id="link" to="/register" onClick={() => {
              closeModal()
              setSignup(true)
            }}
          >
              <h4>Signup</h4>
            </Link>
          </div>

          <div>
            <Link id="link" to="/" onClick={() => {
              closeModal()
              setLogin(true)
              }}
            >
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
        isOpen={login}
        openSignup={openSignup}
        closeModal={closeModal}
      />

      <SignupModal
        isOpen={signup}
        openLogin={openLogin}
        closeModal={closeModal}
      />

      <CreateAlertModal
        isOpen={alert}
        closeModal={closeModal}
      />

      <AboutModal
        isOpen={about}
        closeModal={closeModal}
      />

      <ProfileModal
        isOpen={profile}
        closeModal={closeModal}
      />

      <InfoModal
        isOpen={info}
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