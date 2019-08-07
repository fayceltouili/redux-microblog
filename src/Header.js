import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
  static defaultProps = {
    title: "Microblog",
    description: "Get in the Rithm of blogging!"
  }
  render() {
    return (
      <div className="Header">
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <Link to='/' style={{marginRight: '20px'}}> Blog</Link>
        <Link to='/new'>Add a new post</Link>
      </div>
    )
  }
  
}

export default Header