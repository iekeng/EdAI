import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import edailogo from '../EdAI Logo.png';
import googleLogo from '../google-logo.png';
import facebookLogo from '../facebook-logo.png';
import '../LogInSignUp.css';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Log in with your email:', email, 'and password:', password);
    fetch('http://3.85.54.102/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((r) => r.json())
      .then((token) => {
        if (token.access_token) {
          navigate('/Dashboard');
          console.log(token);
        } else {
          setLoginError('Email and/or Password Incorrect! Please try again.');
          setEmail('');
          setPassword('');
        }
      });
  };

  return (
    <>
      <div id='LS-Header'>
        <img id='logo' src={edailogo} alt='Logo' />
      </div>
      <div className='loginSignUp'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='input-label'>Email:</label>
            <input
              className='LSInput'
              id='email-input'
              type='email'
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label className='input-label'>Password:</label>
            <input
              className='LSInput'
              id='pass-input'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {loginError && <div className='error-message'>{loginError}</div>}
          <button className='LSbutton' type='submit'>
            Login
          </button>
          <p>Or sign in with:</p>
          <div className='button-container'>
            <button className='LSbutton' onClick={() => console.log('Google authentication...')}>
              <img className='button-logo' src={googleLogo} alt='Google Logo' />
              Google
            </button>
            <button className='LSbutton' onClick={() => console.log('Facebook authentication...')}>
              <img className='button-logo' src={facebookLogo} alt='Facebook Logo' />
              Facebook
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogInForm;