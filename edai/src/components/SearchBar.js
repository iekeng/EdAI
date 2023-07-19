import React, { useState } from 'react';

function SearchBar() {

    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
  
    const handleSearchSubmit = () => {
      console.log("Search for: ", searchQuery);
    };
    
    return (
      <div>
        <input 
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button title="search button" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>
    );
  }

    export default SearchBar;