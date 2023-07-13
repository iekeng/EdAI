import React, { useState } from 'react';
import sendSvg from '../send-svg.png';
import audioSvg from '../audio-svg.png';

function ChatWindow() {
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseGiven, setIsResponseGiven] = useState(false); // New state variable
  const [isFeedback, setIsFeedback] = useState(false); // New state variable  

  const handleTyping = () => {
    setIsTyping(true);
  };

  const handleFeedback = () => {
    setIsFeedback(true);
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
      const response = await fetch('http://3.85.54.102/api/chatbot/', {
        method: 'POST',
        body: JSON.stringify({ prompt: userInput }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        const apiFeedback = data.message;

        setFeedback(apiFeedback);
        setUserInput(''); // Clear the input field
        setIsResponseGiven(true); // Set the response given state to true
      } else {
        console.error('API request failed:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleClick() {
    handleSubmit();
    setIsResponseGiven(false); // Reset the response given state
    handleFeedback();
  }

  const getWindowStyle = () => {
    if (isLoading) {
      return {
        height: 'auto',
        maxHeight: '200px',
      };
    }
    if (isTyping) {
      return {
        width: '40%',
        height: '200px',
      };
    } 
    if (isFeedback) {
      return {
        width: '40%',
        height: 'auto',
      };
    } else {
      return {
        width: '40%px',
        height: '60px',
      };
    }
  };

  const chatbotContent = () => {
    if (isLoading) {
      return {
        display: '',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
        height: '100%',
        overflowY: 'auto',
        zIndex: '40',
      };
    }
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      padding: '0 10px',
      overflowY: 'auto',
      zIndex: '40',
    };
  };

  // Add a function to handle the hover state
  const handleHover = (event) => {
    if (isResponseGiven) {
      event.target.classList.remove('active-option');
    } else {
      event.target.classList.add('active-option');
    }
  };

  return (
    <div className="chatbot-window" style={getWindowStyle()}>
      <div style={chatbotContent()} className="chatbot-content">
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
        <div style={{ display: 'flex' }}>
        <button
          className={`chatbot-options ${isResponseGiven ? '' : 'active-option'}`}
          id="typing-option"
          onClick={handleClick}
          disabled={isLoading}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <img className="button-img" src={sendSvg} alt="Send Icon" />
        </button>
        <button className="chatbot-options" id="audio-option" disabled={isLoading}>
          <img className="button-img" src={audioSvg} alt="Audio Icon" />
        </button>
        </div>
        <br />
        {isLoading ? (
          <p style={{ display: 'block' }} className="chatbot-feedback">
            Loading...
          </p>
        ) : (
          <p className="chatbot-feedback">{feedback}</p>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
