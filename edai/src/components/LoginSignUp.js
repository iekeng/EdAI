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
  const [regions, setRegions] = useState([]);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

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
    // Fetch regions from the backend API
    fetch('http://18.210.33.70/regions')
      .then(response => response.json())
      .then(data => {
        // Assuming the response contains an array of region objects [{ id, name }]
        setRegions(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
      fetch('http://18.210.33.70/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the login API call
          console.log('Login response:', data);
          // Handle successful login and navigate to the dashboard
          if (data.success) {
            navigate('/Dashboard');
          } else {
            setLoginError('Invalid credentials. Please try again.');
            setEmail('');
            setPassword('');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log(
        'Sign up with name:', name,
        'email:', email,
        'password:', password,
        'and region:', region
      );
      fetch('http://18.210.33.70/region/${region}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email, password: password, region: region }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the signup API call
          console.log('Signup response:', data);
          // Handle successful signup and navigate to the dashboard
          if (data.success) {
            navigate('/Dashboard');
          } else {
            setSignupError('Signup failed. Please try again.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
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
              <input className='LSInput' id='name-input' type="text" value={name} onChange={handleNameChange} required />
            </div>
          )}
          <div>
            <label className='input-label'>Email:</label>
            <input className='LSInput' id='email-input' type="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div>
            <label className='input-label'>Password:</label>
            <input className='LSInput' id='pass-input' type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          {loginError && <div className="error-message">{loginError}</div>}
          {!isLoginMode && (
            <div>
              <label>Region:</label>
              <select id='region-input' value={region} onChange={handleRegionChange} required>
                <option value="">Select a region</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
          )}
          <button className='LSbutton' type='submit'>{isLoginMode ? 'Login' : 'SignUp'}</button>
        </form>
        {signupError && <div className="error-message">{signupError}</div>}

        <div>
          <p>
            {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
            <button className='LSbutton' onClick={handleToggleMode}>{isLoginMode ? 'SignUp' : 'Login'}</button>
          </p>
          <p>Or sign in with:</p>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <button className='LSbutton' onClick={handleGoogleAuth}>Google</button>
            <button className='LSbutton' onClick={handleFacebookAuth}>Facebook</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignupPage;