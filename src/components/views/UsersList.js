import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";



const UsersList = props => {
    const history = useHistory();
    const [users, setUsers] = useState([]);

    useEffect(() => {
            resu()
        }, []);
    
    const resu = async () =>{
        api.get('/users')
            .then(response => setUsers(response.data))
    }

    const ff = async() => {
        history.push('/users_profile')
    }
    return (
        <BaseContainer>
            <div>
                <h1>Users Overview</h1>
                <table>
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Online Status</th>
                    <th>Creation Date</th>
                    <th>Birth Date</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                    <tr key={user.id}>
                        <td><a onClick={() => alert("boo")}>{user.username}</a></td>
                        <td>{user.onlineStatus}</td>
                        <td>{user.creationDate}</td>
                        <td>{user.birthDate || '-'}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
      </BaseContainer>
    );
  };
export default UsersList;