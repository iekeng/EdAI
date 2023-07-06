import React from 'react'
import { Link } from 'react-router-dom'
import edailogo from '../EdAI Logo.png'
import '../LandingPage.css'

const LandingPage = () => {
  return (
    <div>
      <header id='LP-Header'>
        <img id="logo" src={edailogo} alt="Logo" />
      </header>
        <section id='Valp-Curr'>
          <aside id='Valueproposition'>
            
            <p>Breaking Barriers to Education: EdAI's AI-Powered Platform for African Students"</p>

          </aside>
          <Link to='/LoginSignUp'><button>LogIn/SignUp</button></Link>
        </section>
        <section id='testimonials'>
        </section>
    </div>
  )
}

export default LandingPage;