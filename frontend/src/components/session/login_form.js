import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import { Link, useHistory } from "react-router-dom";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (props.currentUser) {
      history.push("/"); 
    }
  }, [props.currentUser, history]);

  const update = (field) => {
    return (e) => setState(() => ({ ...state, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(state)
      .then((decoded) => {
        if (decoded) {
          props.closeModal();
        }
      })
  };

  const renderErrors = () => {
    return (
      <ul>
        {Object.keys(props.errors).map((error, i) => (
          <li key={`error-${i}`}>{props.errors[error]}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={handleSubmit}>
        <svg id='close-modal' height="15pt" viewBox="0 0 500 500" width="15pt" onClick={props.closeModal}>
          <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
        </svg>
        <div className="login-header">
          <h1>Login</h1>
        </div>
        <div>
          <label className="login-email-label">
            <input
              id='modal-form'
              type="text"
              value={state.email}
              onChange={update("email")}
              placeholder="Email"
            />
          </label>
        </div>
        <div className='login-password'>
          <label className="login-password-label">
            <input
              id='modal-form'
              type="password"
              value={state.password}
              onChange={update("password")}
              placeholder="Password"
            />
          </label>
          {renderErrors()}
        </div>
        <input className="login-submit-button" type="submit" value="Login" />
        <div className='switch-modals'>
          <Link id="link" to="/register" onClick={props.openSignup}>Not on LineAlert? Create an account.</Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);