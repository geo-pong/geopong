import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

declare const google: any;

const Login = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useAuth();

  const handleLogin = (response: any) => {
    setAuthState({ jwt: response.credential });
    navigate('/Pong');
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "897538926324-ujej9nnvaq2hohplofks4g53jne005gk.apps.googleusercontent.com",
      callback: handleLogin,
    })

    google.accounts.id.renderButton(
      document.getElementById('sign-in-button-div'),
      { theme: 'outline', size: 'large'}
    );
  }, []);

  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        <div id="sign-in-button-div"></div>
      </div>
    </div>
  )
}

export default Login;