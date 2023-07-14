import React from 'react';
import edailogo from '../EdAI Logo.png';
import SchoolSection from './SchoolSection';
import SubjectsDisplay from './SubjectsDisplay';
import TopicDisplay from './TopicDisplay';
import ContentDisplay from './ContentDisplay';
import ChatWindow from './ChatWindow';
import SearchBar from './SearchBar';
import CountrySelect from './CountrySelect';
import LanguageSelect from './LanguageSelect';
import Profile from './Profile';
import CurriculumSelect from './CurriculumSelect';
import InterCurriculumButton from './InterCurriculumButton';
import NewsButton from './NewsButton';
import AboutUsButton from './AboutUsButton';
import Footer from './Footer';
import { AppProvider } from './AppContext';

function Dashboard() {
  // const [globalCountryId, setGlobalCountryId] = useState(null)
  // const [subjectId, setSubjectId] = useState(null)
  return (
    <> 
    <header>
          <img id="logo" src={edailogo} alt="Logo" />
          <nav id="header-nav">
            <ul id="header-nav-list1" className="header-nav-ul">
              <li className="nav-item" id="searchbutton">
                <SearchBar />
              </li>
              <li className="nav-item">
                <AppProvider>
                  <CountrySelect />
                </AppProvider>
              </li>
              <li className="nav-item">
                <LanguageSelect />
              </li>
            </ul>
            <ul className="header-nav-ul">
              <li>
                <Profile />
              </li>
              <li className="progress-chart">
                <div className="progress-bar"></div>
              </li>
            </ul>
            <ul id="header-nav-list2" className="header-nav-ul">
              <li className="nav-item">
              <AppProvider>
                <CurriculumSelect />
                </AppProvider>
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
    <div id='dashboard-container'>
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
        <Footer />
      </section>
    </div>
    </>
  );
}

export default Dashboard;
