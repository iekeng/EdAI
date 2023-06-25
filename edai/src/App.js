import React, { useEffect, useState } from 'react';
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
    <React.Fragment>
      <button id="school-list-button">
        <strong>High School</strong>
      </button>
      <button id="school-list-button">
        <strong>College/University</strong>
      </button>
    </React.Fragment>
  );
}

function TopicDisplay() {
  const isSubjectSelected = true;

  let content;
  if (isSubjectSelected) {
    const topics = [
      {id: 1, title: "Topic 1"},
      {id: 2, title: "Topic 2"},
      {id: 3, title: "Topic 3"},
      {id: 4, title: "Topic 4"},
      {id: 5, title: "Topic 5"}
    ];
    content = (
      <ul id="topicslist">
        {topics.map(topic => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      {content}
    </div>
  );
}

function TopicContent() {
  const [content, setContent] = useState(null);

useEffect(() => {
// Fetch the content from the API endpoint
fetch('api/edai/curriculum/school/subjects/topics/content')
  .then(response => response.json())
  .then(data => setContent(data))
  .catch(error => console.error(error));
}, []);

if (!content) {
return <p>Loading...</p>; // Placeholder while the content is being fetched
}

return (
<div>
  {/* Render the fetched content */}
  <h2>{content.title}</h2>
  <p>{content.description}</p>
  {/* Additional content rendering */}
</div>
);
}
function ContentDisplay() {
  const isTopicSelected = true;

  let content;
  if (isTopicSelected) {
    content = <TopicContent />;
   } else {
    content = "Select topic to study";
   }
  return (
    <div>
      {content}
    </div>
  );
}

function ChatWindow() {
  return (
    <div className="chatbot-window">
      <div className="chatbot-content">
        <p>Need help? Type or press & hold the mic icon to chat with us!"</p>
        <div className="chatbot-options">
          <button className="typing-option">Typing</button>
          <button className="audio-option">Audio</button>
      </div>
      </div>
    </div>
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
          <section id="school">
            <h3 id="school-title">Level</h3>
            <SchoolSection />
          </section>
          <section id="topic">
            <h3>Topic</h3>
            <TopicDisplay />
          </section>
        </section>
        <section id="study-window">
          <div id="subjects"></div>
          <div id="contentdisplay">
            <ContentDisplay />
          </div>
        </section>
        <section id="chatbot-window">
          <ChatWindow />
        </section>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;