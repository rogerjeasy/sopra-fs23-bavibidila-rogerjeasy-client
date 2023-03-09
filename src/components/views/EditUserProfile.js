import {api, handleError } from 'helpers/api'
import React,{useState} from 'react'
import User from 'models/User'
import {useHistory} from 'react-router-dom'
import {Button} from 'components/ui/Button'
import 'styles/views/Login.scss'
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'


const FormField = props => {
    return (
      <div className="login field">
        <label className="login label">
          {props.label}
        </label>
        <input
          className="login input"
          placeholder="enter here.."
          value={props.value}
          type={props.type}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };

  FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func
  };

  const EditUserProfile = props => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [birthDay, setBirthDay] = useState(new Date());
  
    const doEditProfile = async () => {
        try {
            const userId = localStorage.getItem('id')
            const requestBody = JSON.stringify({username,birthDay});
            const response = await api.put('/users/'+userId, requestBody);
            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/profile`);
        }
         catch (error) {
        alert(`The username provided already exists.`);
      }
 };
  
  return (
    <BaseContainer>
    <div className="login container">
      <div className="login form">
        <FormField
          label="Update username"
          value={username}
          onChange={un => setUsername(un)}
        />

        {/* <DatePicker selected = {birthDay} onChange={(birthDay)=>setBirthDay(birthDay)} dateFormat="dd-MM-yyyy"/> */}

        <div className="login button-container">
          <Button
            disabled={!username && !birthDay}
            width="100%"
            onClick={() => doEditProfile()}
          >
              Edit Profile
          </Button>
        </div>
      </div>
    </div>
  </BaseContainer>
  )
}

export default EditUserProfile