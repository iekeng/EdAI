import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import edailogo from '../EdAI Logo.png';
import googleLogo from '../google-logo.png';
import facebookLogo from '../facebook-logo.png';
import '../LogInSignUp.css';
import { AppContext } from './AppContext';

const SignUpForm = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [countries, setCountries] = useState([]);
  const [curriculums, setCurriculums] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState('');
  const { setGlobalCountryId } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/countries')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const fetchCurriculumsByCountry = (countryId) => {
    fetch(`/api/country/${countryId}/curriculums`)
      .then(response => response.json())
      .then(data => {
        // Assuming the response contains an array of curriculums
        setCurriculums(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

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

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    setSelectedCountry(selectedCountryId);

    if (selectedCountryId) {
      fetchCurriculumsByCountry(selectedCountryId);
    }
  };

  const handleCurriculumChange = (e) => {
    const selectedCurriculumId = e.target.value;
    setSelectedCurriculum(selectedCurriculumId);
  };

  const handleSignupSuccess = () => {
    setSignupSuccess(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !passwordVerify || !selectedCountry || !selectedCurriculum) {
      setSignupError('Please fill in all required fields.');
      return;
    }
    if (password !== passwordVerify) {
      setSignupError('Passwords do not match. Please verify your password.');
      return;
    }

    // Set the selected country ID to the global context
    setGlobalCountryId(selectedCountry);

    console.log(
      'Sign up with first name:', firstname,
      'last name:', lastname,
      'email:', email,
      'password:', password,
      'passwordVerify:', passwordVerify,
      'and country:', selectedCountry,
      'and curriculum:', selectedCurriculum
    );

    // Make the profile details POST request
    fetch('/api/post/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        curriculum_id: selectedCurriculum,
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
              <label className='input-label'>Country:</label>
              <select id='country-input' value={selectedCountry} onChange={handleCountryChange} required>
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className='input-label'>Curriculum:</label>
              <select id='curriculum-input' value={selectedCurriculum} onChange={handleCurriculumChange} required>
                <option value="">Select curriculum</option>
                {curriculums.map(curriculum => (
                  <option key={curriculum.id} value={curriculum.id}>{curriculum.curriculum}</option>
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
