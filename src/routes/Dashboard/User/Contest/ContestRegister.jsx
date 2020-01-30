/*eslint-disable*/
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import { registerUser } from "../redux/authentication/actions";
import { connect } from "react-redux";

const ContestRegister = ({
  registerUser,
  isAuth,
  isRegistering,
  registerSuccess,
  error,
  errorType
}) => {
  const [signupState, setSignupState] = useState({
    email: "",
    name: "",
    password: ""
  });

  const onChange = e => {
    if (e.target.name === "keepLoggedIn") {
      setSignupState({ ...signupState, [e.target.name]: e.target.checked });
    } else {
      setSignupState({ ...signupState, [e.target.name]: e.target.value });
    }
  };

  const onRegisterSubmit = e => {
    e.preventDefault();
    let payload = {
      email: signupState.email,
      name: signupState.name,
      password: signupState.password
    };
    registerUser(payload);
  };

  return isAuth ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="container">
      <div className="mt-4 mb-4 text-center">
        <h4>Contest Register</h4>
      </div>
      <form onSubmit={onRegisterSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            value={signupState.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            aria-describedby="emailHelp"
            value={signupState.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            value={signupState.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-dark btn-raised  btn-block">
          Register
        </button>
      </form>
      {isRegistering && <div className="text-center">Registering</div>}
      {error && errorType == "register" ? (
        <div className="text-danger">Something went wrong</div>
      ) : (
        registerSuccess && <div className="text-center">Success</div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth,
  isLoading: state.authReducer.isLoading,
  token: state.authReducer.token,
  isRegistering: state.authReducer.isRegistering,
  registerSuccess: state.authReducer.registerSuccess,
  error: state.authReducer.error,
  errorType: state.authReducer.errorType
});

const mapDispatchToProps = dispatch => ({
  registerUser: payload => dispatch(registerUser(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestRegister);
