import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
  static defaultProps = {
    title: "Microblog",
    description: "Get in the Rithm of blogging",
  }
  render() {
    return (
      <div className="Header container">
        <h1 >{this.props.title}</h1>
        <p className="Description">{this.props.description}</p>
        <div>
          <Link to='/' className="HeaderLinks HeaderLinks-ltr" style={{ textDecoration: 'none'}}><strong>Blog</strong> </Link>
          <Link to='/new' className="HeaderLinks" style={{ textDecoration: 'none'}}><strong>Add a new post</strong></Link>
        </div>
      </div>
    )
  }
  
}

export default Header