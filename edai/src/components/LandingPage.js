import React from 'react'
import { Link } from 'react-router-dom'
import edailogo from '../EdAI Logo.png'
import '../LandingPage.css'

const LandingPage = () => {
  return (
    <div id='LPContainer'>
      <header id='LP-Header'>
        <img id="logo" src={edailogo} alt="Logo" />
      </header>
        <section id='Valp-Curr'>
          <aside id='Valueproposition'>
            <h1 id='Valp-h1'>Unlocking Knowledge, <br></br>Accessible to all!</h1>
            <p>EdAI addresses educational challenges faced by underserved students in Africa. Their AI-enabled learning platform offers comprehensive content, interactive tools, and personalized experiences to bridge the gap in affordable and quality education, empowering students for academic and personal growth.</p>
            <Link to='/LoginSignUp' style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column-reverse', justifyContent: 'center', alignItems: 'center'}}><button id='LPbutton'>LogIn/SignUp</button></Link>
          </aside>
          <aside id='Curriculum'>
          </aside>
        </section>
        <section id='testimonials'>
        </section>
        <footer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <p style={{display: 'inline-block'}}>Copyright &copy; 2023</p>
        </footer>
    </div>
  )
}

export default LandingPage;