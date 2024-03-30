import React, { useState, useEffect } from 'react';

function CountrySelect() {
  const [userCountry, setUserCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      fetchUserCountry(access_token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserCountry = async (access_token) => {
    try {
      const response = await fetch('/api/user/country', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const countryName = data.country;
        setUserCountry(countryName);
      } else {
        setError('Error fetching user country');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user country:', error);
      setError('Error fetching user country');
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingBottom: '0px' }}>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <p>{error}</p>
      ) : userCountry ? (
        <h2 style={{ fontSize: '14px' }}>Country: {userCountry}</h2>
      ) : (
        <h2 style={{ fontSize: '14px' }}>No country selected.</h2>
      )}
    </div>
  );
}

export default CountrySelect;
