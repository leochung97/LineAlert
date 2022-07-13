import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import { Link, useHistory } from "react-router-dom";

function SignUp(props) {
  const [state, setState] = useState({
    email: "",
    mobile: "",
    password: "",
    password2: "",
    preferences: ["A","C","E","B","D","F","M","G","L","J","Z","N","Q","R","W","1","2","3","4","5","6","7"]
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
    props.signup(state)
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
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <svg className='close-modal' height="15pt" viewBox="0 0 500 500" width="15pt" onClick={props.closeModal}>
          <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
        </svg>
        <div className='signup-header'>
          <h1>Signup</h1>
        </div>
        <div className="signup-form">
          <br />
          <input
            className='modal-form'
            type="text"
            value={state.email}
            onChange={update("email")}
            placeholder="Email"
          />
          <br />
          <input
            className='modal-form'
            type="text"
            value={state.mobile}
            onChange={update("mobile")}
            placeholder="Phone Number"
          />
          <br />
          <input
            className='modal-form'
            type="password"
            value={state.password}
            onChange={update("password")}
            placeholder="Password"
          />
          <br />
          <input
            className='modal-form'
            type="password"
            value={state.password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
          />
          <br />
          {renderErrors()}
        </div>
        <input className='signup-submit-button' type="submit" value="Sign Up" />
        <div className='switch-modals'>
          <Link id="link" to="/login" onClick={props.openLogin}>Have an account? Log in. </Link>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);