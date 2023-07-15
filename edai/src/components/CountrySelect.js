// CountrySelect.js
import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function CountrySelect() {
  const { globalCountryId } = useContext(AppContext);

  return (
    <div>
      {globalCountryId ? (
        <p>Country: {globalCountryId}</p>
      ) : (
        <p>No country selected.</p>
      )}
    </div>
  );
}

export default CountrySelect;
