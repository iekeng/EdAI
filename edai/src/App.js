import React from 'react';
import './App.css';
import edailogo from './EdAI Logo.png';

function SearchButton() {
  return (
    <button title="search button">
      Search
    </button>
  );
}

function CountrySelect() {
  return (
    <select id="countrySelect">
      <option value="">Country</option>
      <option value="KEN">Kenya</option>
      <option value="NIG">Nigeria</option>
      <option value="SA">South Africa</option>
    </select>
  );
}

function LanguageSelect() {
  return (
    <select id="languageSelect">
      <option value="">Language</option>
      <option value="EN">English</option>
      <option value="FR">French</option>
      <option value="SWA">Swahili</option>
    </select>
  );
}

function CurriculumSelect() {
  return (
    <select id="curriculum_id">
      <option value="">Curriculum</option>
    </select>
  );
}

function InterCurriculumButton() {
  return (
    <button title="inter-curr">
      International Curriculum
    </button>
  );
}

function NewsButton() {
  return (
    <button title="news">
      News
    </button>
  );
}

function AboutUsButton() {
  return (
    <button title="about-us">
      About Us
    </button>
  );
}

function SchoolSection() {
  return (
    <section id="school">
      <h3 id="school-title">Level</h3>
      <button id="school-list-button"><strong>High School</strong></button>
      <button id="school-list-button"><strong>College/University</strong></button>
    </section>
  );
}

function TopicSection() {
  return (
    <section id="topic">
      <h3>Topic</h3>
      <ul id="topic-list"></ul>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <header>
        <img id="logo" src={edailogo} alt="Logo" />
        <nav id="header-nav">
          <ul id="header-nav-list1">
            <li className="nav-item">
              <SearchButton />
            </li>
            <li className="nav-item">
              <CountrySelect />
            </li>
            <li className="nav-item">
              <LanguageSelect />
            </li>
          </ul>
          <ul id="header-nav-list2">
            <li className="nav-item">
              <CurriculumSelect />
            </li>
            <li className="nav-item">
              <InterCurriculumButton />
            </li>
            <li className="nav-item">
              <NewsButton />
            </li>
            <li className="nav-item">
              <AboutUsButton />
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <section id="school-topic-window">
          <SchoolSection />
          <TopicSection />
        </section>
        <section id="study-window">
          <div id="subjects"></div>
        </section>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;