import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
        <p style={{color: 'black'}}>Copyright &copy; 2023</p>
        <Link to='/LandingPage'>Home</Link>
    </div>
  )
}

export default Footer;