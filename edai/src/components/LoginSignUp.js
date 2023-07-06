import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import edailogo from '../EdAI Logo.png';
import '../LogInSignUp.css';

const LoginSignupPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('');
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (region) {
      fetch('/api/region', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region: region }),
      })
        .then(response => response.json())
        .then(data => {
          // Assuming the response contains the data after posting the region
          console.log('Response:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [region]);
  

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
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
  
    // Perform form validation
    if (!isLoginMode && (!name || !email || !password || !region)) {
      // Handle validation error (e.g., display an error message)
      console.log('Please fill in all required fields.');
      return;
    }
    if (isLoginMode) {
      console.log('Log in with your email:', email, 'and password:', password);
      navigate('/Dashboard')
    } else {
      console.log(
        'Sign up with name:', name,
        'email:', email,
        'password:', password,
        'and region:', region
      );
      navigate('/Dashboard')
    }
    // Reset form inputs
    setName('');
    setEmail('');
    setPassword('');
    setRegion('');
  };

  return (
    <>
    <div id='LS-Header'>
    <img id="logo" src={edailogo} alt="Logo" />
    </div>
    <div className='loginSignUp'> 
      <h1>{isLoginMode ? 'Login' : 'SignUp'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <div>
            <label className='input-label'>Name:</label>
            <input id='name-input' type="text" value={name} onChange={handleNameChange} required/>
          </div>
        )}
        <div>
          <label className='input-label'>Email:</label>
          <input className='LSInput' id='email-input' type="email" value={email} onChange={handleEmailChange} required/>
        </div>
        <div>
          <label className='input-label'>Password:</label>
          <input id='pass-input' type="password" value={password} onChange={handlePasswordChange} required/>
        </div>
        {!isLoginMode && (
          <div>
            <label>Region:</label>
            <select id='region-input' value={region} onChange={handleRegionChange} required>
              <option value="">Select a region</option>
              <option value="1">West Africa</option>
              <option value="2">East Africa</option>
              <option value="3">South Africa</option>
              <option value="4">North Africa</option>
              <option value="5">Central Africa</option>
            </select>
          </div>
        )}
        {/* <Link to='/Dashboard'><button type="submit">{isLoginMode ? 'Login' : 'SignUp'}</button></Link> */}
        <button className='LSbutton' type='submit'>{isLoginMode ? 'Login' : 'SignUp'}</button>
      </form>
      <div>
        <p>
          {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
          <button className='LSbutton' onClick={handleToggleMode}>{isLoginMode ? 'SignUp' : 'Login'}</button>
        </p>
        <p>Or sign in with:</p>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <button className='LSbutton' onClick={handleGoogleAuth}>Google</button>
          <button className='LSbutton' onClick={handleFacebookAuth}>Facebook</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginSignupPage;
