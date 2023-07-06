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
          
        </section>
        <Link to='/LoginSignUp'><button>LogIn/SignUp</button></Link>
        <section id='testimonials'>
        </section>
        <footer style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <p style={{display: 'inline-block'}}>Copyright &copy; 2023</p>
        </footer>
    </div>
  )
}

export default LandingPage;