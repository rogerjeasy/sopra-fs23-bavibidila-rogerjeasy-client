import React, { useState } from 'react';
import Login from "./Login";
import Register from "./Register";
import BaseContainer from "components/ui/BaseContainer";


const LoginRegistration = () => {
    const [showLogin, setShowLogin] = useState(true);
  
    const toggleLogin = () => {
      setShowLogin(!showLogin);
    };
  
    return (
        <BaseContainer>
            <div>
                {showLogin ? <Login /> : <Register />}
                <button onClick={toggleLogin}>
                {showLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                </button>
            </div>
        </BaseContainer>
    );
};
  
  export default LoginRegistration;