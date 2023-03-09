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
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);


  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id',user.id);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
      // alert('user added sucessfully!')
    } catch (error){
        alert('Add User failed because username already exists.'); 
        history.push('/register')
    }
};

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={pssw => setPassword(pssw)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doRegister()}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  ); 
}

export default Register