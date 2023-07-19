import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', color: 'white'}}>
        <Link style={{textDecoration: 'none', color: 'white', display: 'inline-block', }} to='/'><button>Home</button></Link>
        <p style={{display: 'inline-block'}}>Copyright &copy; 2023</p>
        <span></span>
    </div>
  )
}

export default Footer;