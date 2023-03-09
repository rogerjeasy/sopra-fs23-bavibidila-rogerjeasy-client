import React, { useState, useEffect } from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import { Spinner } from 'components/ui/Spinner';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";


const UserProfile = () => {
    const id = localStorage.getItem('id');
    const [user, setUser] = useState(null);
    const history = useHistory();

  useEffect(() => {
    async function fetchData(){
        try {
            const response = await api.get('/users/'+id);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUser(response.data);

            console.log(response);
        } catch(error){
            alert('Could not get the user details');
        }
    }
    fetchData();
    }, []);


    let content = <Spinner/>
    if (user){
        content = (
            <BaseContainer className='game container'>
                <div>
                <h3><div className="player username">Profile</div> </h3>
                </div>
                <br></br>
                <div>
                <ul><div className="player username">Username: {user.username}</div></ul>
                <ul><div className="player username">Id: {user.id}</div></ul>
                <ul><div className="player username">Status: {user.status}</div></ul>
                <ul><div className="player username">Created date: {user.createDate}</div></ul>
                <ul><div className="player username">Birthday: {user.birthday}</div></ul>
                </div>
            </BaseContainer>
        )
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default UserProfile;