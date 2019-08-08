import React, {Component} from 'react';
import BlogpostCard from './BlogpostCard'
import {connect} from 'react-redux';
import './Home.css'

class Home extends Component {
  render() {
    const {posts} = this.props
    return (
      <div className="Home container">
        <p className="Home-welcome"> Welcome to <strong>Microblog</strong>, our innovative site for communication on the information superhighway</p>
        <div className="row">
          {Object.keys(posts).map(postKey => <BlogpostCard 
          key={postKey}
            id={postKey}
            title={posts[postKey].title}
            description={posts[postKey].description}
            />)}
        </div>
     
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(Home);
