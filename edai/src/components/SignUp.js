import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import edailogo from '../EdAI Logo.png';
import googleLogo from '../google-logo.png';
import facebookLogo from '../facebook-logo.png';
import '../LogInSignUp.css';

const SignUpForm = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://3.85.54.102/api/regions')
      .then(response => response.json())
      .then(data => {
        setRegions(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordVerifyChange = (e) => {
    setPasswordVerify(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const handleSignupSuccess = () => {
    setSignupSuccess(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !passwordVerify || !selectedRegion) {
      console.log('Please fill in all required fields.');
      return;
    }
    if (password !== passwordVerify) {
      setSignupError('Passwords do not match. Please verify your password.');
      return;
    }

    console.log(
      'Sign up with first name:', firstname,
      'last name:', lastname,
      'email:', email,
      'password:', password,
      'passwordVerify:', passwordVerify,
      'and region:', selectedRegion
    );

    fetch('http://3.85.54.102/api/region/${selectedRegion}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ region: selectedRegion }),
    })
      .then(response => response.json())
      .then(regionData => {
        console.log('Region selection response:', regionData);
        
        // Make the profile details POST request
        fetch('http://3.85.54.102/api/profile/${id}', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            region: regionData.id, // Assuming the response contains an ID for the selected region
          }),
        })
          .then(response => response.json())
          .then(profileData => {
            console.log('Profile details response:', profileData);
            
            // Set signup success flag
            setSignupSuccess(true);
          })
          .catch(error => {
            console.error('Error:', error);
            setSignupError('Signup failed. Please try again.');
          });
      })
      .catch(error => {
        console.error('Error:', error);
        setSignupError('Signup failed. Please try again.');
      });
  };

  useEffect(() => {
    if (signupSuccess) {
      navigate('/LogIn');
    }
  }, [signupSuccess, navigate]);

  return (
    <>
      <div id='LS-Header'>
        <img id="logo" src={edailogo} alt="Logo" />
      </div>
      <div className='loginSignUp'>
        <h1>SignUp</h1>
        {signupSuccess ? (
          <div>
            <p>Sign up successful!</p>
            <button className='LSbutton' onClick={handleSignupSuccess}>
              Sign Up Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label className='input-label'>First Name:</label>
              <input className='LSInput' id='firstname-input' type="text" value={firstname} onChange={handleFirstNameChange} required />
            </div>
            <div>
              <label className='input-label'>Last Name:</label>
              <input className='LSInput' id='lastname-input' type="text" value={lastname} onChange={handleLastNameChange} required />
            </div>
            <div>
              <label className='input-label'>Email:</label>
              <input className='LSInput' id='email-input' type="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div>
              <label className='input-label'>Password:</label>
              <input className='LSInput' id='pass-input' type="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <div>
              <label className='input-label'>Verify Password:</label>
              <input className='LSInput' id='verify-pass-input' type="password" value={passwordVerify} onChange={handlePasswordVerifyChange} required />
            </div>
            {signupError && <div className="error-message" style={{ color: 'red', fontStyle: 'italic' }}>{signupError}</div>}
            <div>
              <label className='input-label'>Region:</label>
              <select id='region-input' value={selectedRegion} onChange={handleRegionChange} required>
                <option value="">Select a region</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
            </div>
            <button className='LSbutton' type='submit'>Sign Up</button>
          </form>
        )}

        {!signupSuccess && (
          <div>
            <p>
              Already have an account?
              <button className='LSbutton' onClick={() => navigate('/LogIn')}>Login</button>
            </p>
            <p>Or sign up with:</p>
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
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpForm;
