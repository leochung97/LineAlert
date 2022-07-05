import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (props.currentUser === true) {
      props.history.push("/alerts");
    }
  }, [props.currentUser, props.history]);

  const update = (field) => {
    return (e) => setState(() => ({ ...state, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(state).then(() => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={state.email}
            onChange={update("email")}
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            value={state.password}
            onChange={update("password")}
            placeholder="Password"
          />
          <br />
          <input type="submit" value="Submit" />
          {renderErrors()}
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
