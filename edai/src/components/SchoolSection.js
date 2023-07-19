import React from "react";

function SchoolSection() {
    return (
      <React.Fragment>
        <button id="school-list-button" style={{ backgroundColor: 'black', color: 'white', boxShadow: '5px 5px 5px black' }}>
          <strong>High School</strong>
        </button>
        <button id="school-list-button">
          <strong>College/University</strong>
        </button>
      </React.Fragment>
    );
  }

    export default SchoolSection;