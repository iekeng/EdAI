import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import edailogo from './EdAI Logo.png';
import sendSvg from './send-svg.png';
import audioSvg from './audio-svg.png';

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

const Profile = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Perform the API request to fetch user data based on the given ID
    const fetchUserData = async () => {
      try {
        if (user && user.id) {
          const response = await fetch(`/profile/${user.id}`);
          const data = await response.json();
          // Update the user context with the fetched user data
          setUser(data);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn, user]);

  return (
    <nav>
      {isLoading ? (
        <span>Loading...</span>
      ) : isLoggedIn ? (
        <>
          <span>Welcome, {user?.firstname} {user?.lastname}!</span>
          <progress value={user?.progress} max="100" />
        </>
      ) : (
        <span>Please log in to view your profile.</span>
      )}
    </nav>
  );
};

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
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTyping = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      return; // Don't submit if user input is empty or only whitespace
    }

    try {
      setIsLoading(true);

      // Make the API request
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({ request: userInput }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        const apiFeedback = data.feedback;

        setFeedback(apiFeedback);
        setUserInput(''); // Clear the input field
      } else {
        console.error('API request failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWindowStyle = () => {
    if (isTyping) {
      return {
        width: '40%',
        height: '200px',
      };
    } else {
      return {
        width: '20%px',
        height: '50px',
      };
    }
  };

  return (
    <div className="chatbot-window" style={getWindowStyle()}>
      <div className="chatbot-content">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Type here or press and hold the mic button to speak to me ;-)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onFocus={handleTyping}
          onBlur={handleBlur}
          disabled={isLoading}
        />
        <button className="chatbot-options" id="typing-option" onClick={handleSubmit} disabled={isLoading}>
          <img className='button-img' src={sendSvg} alt='Send Icon'/>
        </button>
        <button className="chatbot-options" id="audio-option" disabled={isLoading}>
          <img className='button-img' src={audioSvg} alt='Audio Icon'/>
        </button>
        {isLoading ? (
          <p className="chatbot-feedback">Loading...</p>
        ) : (
          <p className="chatbot-feedback">{feedback}</p>
        )}
      </div>
    </div>
  );
}

function StudentEnvironmentPage() {
  return (
    <div className="App">
      <header>
        <img id="logo" src={edailogo} alt="Logo" />
        <nav id="header-nav">
          <ul id="header-nav-list1">
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
          <ul>
            <li>
              <Profile />
            </li>
            <li className='progress-chart'>
              <div className='progress-bar'></div>
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

export default StudentEnvironmentPage;