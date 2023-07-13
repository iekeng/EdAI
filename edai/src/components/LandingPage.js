import React from 'react'
import { Link } from 'react-router-dom'
import edailogo from '../EdAI Logo.png'
import '../LandingPage.css'
import SwipeableList from './SwipeableList'
import Openailogo from '../Openai_logo.png'
import Reactlogo from '../React_logo.png'
import awslogo from '../aws_logo.png'
import ChatbotWindow from './ChatWindow'

const LandingPage = () => {
  const emailAddress = "info@edai.tech";
  
  return (
    <div id='LPContainer'>
      <header id='LP-Header'>
        <img id="logo" src={edailogo} alt="Logo" />
        <div className="HLPbuttoncontainer">
        <div style={{ marginRight: '10px' }}>
        <input 
          type="text"
          placeholder='Search...'
        />
        <button title="search button">
          Search
        </button>
      </div>
          <Link to="/LogIn">
            <button id="LPbutton" style={{backgroundColor: 'black'}}>Log In</button>
          </Link>
          <Link to="/SignUp">
            <button id="LPbutton" style={{backgroundColor: 'black'}}>Register</button>
          </Link>
        </div>
      </header>
        <section id='Valp-Curr'>
          <aside id='Valueproposition'>
            <h1 id='Valp-h1'>Unlocking Knowledge, <br></br>Accessible to all!</h1>
            <p>EdAI addresses educational challenges faced by underserved students in Africa. Their AI-enabled learning platform offers comprehensive content, interactive tools, and personalized experiences to bridge the gap in affordable and quality education, empowering students for academic and personal growth.</p>
            <Link to='/SignUp' style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'center', alignItems: 'center'}}><button id='LPbutton' style={{ backgroundColor: 'black' }}>Get Started</button></Link>
          </aside>
          <aside id='Curriculum'>
            <h1>Curriculum Details</h1>
            <SwipeableList />
          </aside>
        </section>
        <section id='WorkingExp'>
            <h1>How it Works</h1>
            <div className="how-it-works">
              <div className="how-it-works-text">
                <h2>1. Sign Up</h2>
                <p>Sign up for an account to get started.</p>
              </div>
              <div className="how-it-works-text">
                <h2>2. Choose a Country</h2>
                <p>Select your country.</p>
              </div>
              <div className="how-it-works-text">
                <h2>3. Start Learning</h2>
                <p>Start learning! You can track your progress and see how you are doing.</p>
              </div>
              <div className="how-it-works-text">
                <h2>4. Need Assistance?</h2>
                <p>Type your question on our chatbot section on your bottom right, or press and hold the mic button to speak to our AI support.</p>
              </div>
            </div>
          </section>
        <section id="testimonials-partners" className="TPcontainer">
          <div className="testimonials">
            <h1>Testimonials</h1>
            <p>
              "The AI education platform transformed my learning experience. Personalized recommendations and adaptive learning paths helped me focus on weaknesses and accelerate progress. Engaging lessons and instant feedback made studying effective. Highly recommended for enhancing education with AI technology." <br /> ~ Akinola Jolade
            </p>
          </div>
      <div className="partners">
          <h1>Partners</h1>
        <div className="partners-logos" style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-around'}}>
          <img className="logo" src={Openailogo} alt="OpenAI Logo" style={{ width: '30%', marginRight: '5px' }} />
          <img className="logo" src={awslogo} alt="AWS Logo" style={{ width: '10%', marginRight: '0px' }} />
          <img className="logo" src={Reactlogo} alt="React Logo" style={{ width: '20%', marginRight: '30px' }} />
        </div>
      </div>
        </section>

        <footer style={{display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', alignItems: 'center'}}>
          <ChatbotWindow />
          <p style={{display: 'inline-block', fontWeight: 'bold'}}>Copyright &copy; 2023</p>
          <p style={{ fontWeight: 'bold'}}>Contact Us: <a href={`mailto:${emailAddress}`}>{emailAddress}</a></p>
        </footer>
    </div>
  )
}

export default LandingPage;