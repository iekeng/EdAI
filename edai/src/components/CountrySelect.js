import React, { useState, useEffect } from 'react';

function CountrySelect({ onCountryChange, setGlobalCountryId }) {
    const [countryId, setCountryId] = useState('');
  
    useEffect(() => {
      if (countryId) {
        // Make the POST request for the selected country
        fetch('/api/post/country', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: countryId }),
        })
          .then(response => response.json())
          .then(data => {
            // Assuming the response contains the newly created country object
            const newCountry = data;
            // Trigger the onCountryChange callback with the new country
            onCountryChange(newCountry);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }, [countryId, onCountryChange]);
  
    const handleCountryChange = (event) => {
      setCountryId(event.target.value);
      setGlobalCountryId(countryId)
    };
  
    return (
      <div>
        <select value={countryId} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          <option value="1">Nigeria</option>
          <option value="2">Kenya</option>
          <option value="3">South Africa</option>
        </select>
      </div>
    );
  }

  export default CountrySelect;