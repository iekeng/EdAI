import React, { useState } from 'react';
import './LogInSignUp.css';

const LoginSignupPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGoogleAuth = () => {
    // Perform Google authentication logic here
    console.log('Google authentication...');
  };

  const handleFacebookAuth = () => {
    // Perform Facebook authentication logic here
    console.log('Facebook authentication...');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login or signup logic here
    if (isLoginMode) {
        console.log('Log in with your email:', email, 'and password:', password);
    } else {
      console.log('Sign up with your email:', email, 'and password:', password);
    }
    // Reset form inputs
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>{isLoginMode ? 'Login' : 'Signup'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">{isLoginMode ? 'Login' : 'Signup'}</button>
      </form>
      <div>
        <p>
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={handleToggleMode}>{isLoginMode ? 'Signup' : 'Login'}</button>
        </p>
        <p>Or sign in with:</p>
        <button onClick={handleGoogleAuth}>Google</button>
        <button onClick={handleFacebookAuth}>Facebook</button>
      </div>
    </div>
  );
};

export default LoginSignupPage;