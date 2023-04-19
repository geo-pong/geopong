import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

declare const google: any;

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (response:gapi.auth2.GoogleUser) => {
    // const credential = response.credential;
    const id_token = response.getAuthResponse().id_token;
    navigate('/Pong');
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "897538926324-ujej9nnvaq2hohplofks4g53jne005gk.apps.googleusercontent.com",
      callback: handleLogin,
    })

    google.accounts.id.renderButton(
      document.getElementById('sign-in-div'),
      { theme: 'outline', size: 'large'}
    );
  }, []);

  return (
    <div className="login">
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;