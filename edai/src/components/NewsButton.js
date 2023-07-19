import React from "react";

function NewsButton() {

  const handleClick = () => {
    console.log('News button clicked');
  };
    return (
      <button onClick={handleClick} title="news">
        News
      </button>
    );
  }

    export default NewsButton;