import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {

  const title = "Microblog";
  const description = "Get in the Rithm of blogging!"
  
  return (
    <div className="Header">
      <h1 style={{fontSize: '4em'}}>{title}</h1>
      <p>{description}</p>
      <Link to='/' className="HeaderLinks" style={{ textDecoration: 'none' }}> Blog</Link>
      <Link to='/new' className="HeaderLinks" style={{ textDecoration: 'none' }}>Add a new post</Link>
    </div>
  )
}

export default Header;
