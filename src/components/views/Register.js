import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";


const FormField = props => {
    return (
      <div className="register field">
        <label className="register label">
          {props.label}
        </label>
        <input
          className="register input"
          placeholder="enter here.."
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };
  
  FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

const Register = props => {
  const history = useHistory();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [studentID, setStudentID] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const doRegister = async () => {
    const requestBody = JSON.stringify({firstName, lastName, studentID, birthday, password, confirmPassword});
    const response = await api.post('/users', requestBody);

    // Get the returned user and update a new object.
    const user = new User(response.data);

    // Store the token into the local storage.
    localStorage.setItem('token', user.token);
  };

  const sendUserToLogin = async () => {
    history.push(`/login`);
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="register form">
          <FormField
            label="First Name"
            value={firstName}
            onChange={un => setFirstName(un)}
          />
          <FormField
            label="Last Name"
            value={lastName}
            onChange={n => setLastName(n)}
          />
          <FormField
            label="Student ID"
            value={studentID}
            onChange={sid => setStudentID(sid)}
          />
          <FormField
            label="Birthday"
            value={birthday}
            onChange={bir => setBirthday(bir)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={n => setPassword(n)}
          />
          <FormField
            label="Confirm Password"
            value={confirmPassword}
            onChange={conf => setConfirmPassword(conf)}
          />
          <div className="login button-container">
            <Button
              disabled={!lastName || !password || !firstName || !studentID || !birthday || !confirmPassword}
              width="100%"
              onClick={() => doRegister()}
            >
              Register
            </Button>
          </div>
          <div>
            <Button 
              onClick={() => sendUserToLogin()}
              width="100%"
              >
              Already have an account? Log in
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  ); 
};

export default Register;