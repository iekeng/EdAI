import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from './AuthService';
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

    AuthService.login(email, password)
      .then((data) => {
        if (data.access_token) {
          // Save the token to local storage or session storage
          AuthService.saveToken(data.access_token);
          navigate('/Dashboard');
        } else {
          setLoginError('Email and/or Password Incorrect! Please try again.');
          setEmail('');
          setPassword('');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoginError('An error occurred during login. Please try again.');
        setEmail('');
        setPassword('');
      });
  };

  return (
    <>
      <div id="LS-Header">
        <img id="logo" src={edailogo} alt="Logo" />
      </div>
      <div className="loginSignUp">
        <h1>Login</h1>
        <p style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
          Need an account?
          <Link to="/SignUp" style={{ color: 'blue', textDecoration: 'none', marginLeft: '5px' }}>SignUp</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="input-label">Email:</label>
            <input
              className="LSInput"
              id="email-input"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label className="input-label">Password:</label>
            <input
              className="LSInput"
              id="pass-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {loginError && <div style={{ color: 'red', fontSize: '13px', fontStyle: 'italic'}} className="error-message">{loginError}</div>}
          <button className="LSbutton" type="submit" onClick={() => navigate('/Dashboard')}>
            Login
          </button>
          <p>Or continue with:</p>
          <div className="button-container">
            <button className="LSbutton" onClick={() => console.log('Google authentication...')}>
              <img className="button-logo" src={googleLogo} alt="Google Logo" />
              Google
            </button>
            <button className="LSbutton" onClick={() => console.log('Facebook authentication...')}>
              <img className="button-logo" src={facebookLogo} alt="Facebook Logo" />
              Facebook
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogInForm;
