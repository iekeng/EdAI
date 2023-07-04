import React from 'react';
import './App.css';
import edailogo from './EdAI Logo.png';
import SearchBar from './components/SearchBar';
import CountrySelect from './components/CountrySelect';
import LanguageSelect from './components/LanguageSelect';
import Profile from './components/Profile';
import CurriculumSelect from './components/CurriculumSelect';
import InterCurriculumButton from './components/InterCurriculumButton';
import NewsButton from './components/NewsButton';
import AboutUsButton from './components/AboutUsButton';
import SchoolSection from './components/SchoolSection';
import SubjectsDisplay from './components/SubjectsDisplay';
import TopicDisplay from './components/TopicDisplay';
import ContentDisplay from './components/ContentDisplay';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="App">
      <header>
        <img id="logo" src={edailogo} alt="Logo" />
        <nav id="header-nav">
          <ul id="header-nav-list1" className='header-nav-ul'>
            <li className="nav-item" id='searchbutton'>
              <SearchBar />
            </li>
            <li className="nav-item">
              <CountrySelect />
            </li>
            <li className="nav-item">
              <LanguageSelect />
            </li>
          </ul>
          <ul className='header-nav-ul'>
            <li>
              <Profile />
            </li>
            <li className='progress-chart'>
              <div className='progress-bar'></div>
            </li>
          </ul>
          <ul id="header-nav-list2" className='header-nav-ul'>
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
          <section id="subjects1">
            <SubjectsDisplay />
          </section>
        </section>
        <section id="study-window">
          <div id="topicslist">
          <TopicDisplay />
          </div>
          <div id="contentdisplay">
            <ContentDisplay />
          </div>
          <section id="chatbot-window">
            <ChatWindow />
          </section>
          <footer>
            <p style={{color: 'white'}}>Copyright &copy; 2023</p>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default App;