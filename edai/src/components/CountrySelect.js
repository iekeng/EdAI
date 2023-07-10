import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

function CountrySelect({ onCountryChange }) {
  const { setGlobalCountryId } = useContext(AppContext);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState('');

  useEffect(() => {
    // Make the API request to fetch the list of countries
    fetch('http://18.210.33.70/countries')
      .then(response => response.json())
      .then(data => {
        // Assuming the response contains an array of countries
        setCountries(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (countryId) {
      // Make the POST request for the selected country
      fetch(`http://18.210.33.70/country/${countryId}`, {
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
    const selectedCountryId = event.target.value;
    setCountryId(selectedCountryId);
    setGlobalCountryId(selectedCountryId);
  };

  return (
    <div>
      <select value={countryId} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelect;