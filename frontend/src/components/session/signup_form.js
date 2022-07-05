import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";

function SignUp(props) {
  const [state, setState] = useState({
    email: "",
    mobile: "",
    password: "",
    password2: "",
  });

  const update = (field) => {
    return (e) => setState(() => ({ ...state, [field]: e.target.value }));
  };

  useEffect(() => {
    if (props.isAuthenticated === true) {
      props.history.push("/tweets");
    }
  }, [props.history, props.isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signup(state).then(() => {
      if (state.currentUser) {
        props.closeModal();
      }
    });
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
        <div className="signup-form">
          <br />
          <input
            type="text"
            value={state.email}
            onChange={update("email")}
            placeholder="Email"
          />
          <br />
          <input
            type="text"
            value={state.mobile}
            onChange={update("mobile")}
            placeholder="Phone Number"
          />
          <br />
          <input
            type="password"
            value={state.password}
            onChange={update("password")}
            placeholder="Password"
          />
          <br />
          <input
            type="password"
            value={state.password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
          />
          <br />
          <input type="submit" value="Submit" />
          {renderErrors()}
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);