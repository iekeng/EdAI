import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

function CountrySelect() {
  const { globalCountryId, setGlobalCountryId } = useContext(AppContext);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Make the API request to fetch the list of countries
    fetch('http://3.85.54.102/api/countries')
      .then(response => response.json())
      .then(data => {
        // Assuming the response contains an array of countries
        setCountries(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    setGlobalCountryId(selectedCountryId);
    console.log('selectedCountryId:', selectedCountryId);
  };
  useEffect(() => {
    console.log('globalCountryId:', globalCountryId);
  }, [globalCountryId]);
  

  return (
    <div>
      <select onChange={handleCountryChange} defaultValue={globalCountryId}>
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
