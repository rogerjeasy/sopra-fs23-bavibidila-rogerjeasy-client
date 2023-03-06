import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState } from 'react';

/**
 *
 * Another way to export directly your functional component.
 */
export const RegisterGuard = props => {
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to="/game"/>;
};

RegisterGuard.propTypes = {
  children: PropTypes.node
}

export const LoginRegisterGuard = props => {
  const [showLogin, setShowLogin] = useState(true);
  
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };
    if (toggleLogin) {
      return <Redirect to="/login"/>;
    }
    // if user is already logged in, redirects to the main /app
    return <Redirect to="/register"/>;
  };
  
  LoginRegisterGuard.propTypes = {
    children: PropTypes.node
  }