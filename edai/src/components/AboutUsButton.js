import React from 'react';

function AboutUsButton() {

  const handleClick = () => {
    console.log('About Us button clicked');
  };
    return (
      <button onClick={handleClick} title="about-us">
        About Us
      </button>
    );
  }

export default AboutUsButton;