import React, {Component} from 'react';
import BlogpostCard from './BlogpostCard'
import {connect} from 'react-redux';
import './Home.css'

class Home extends Component {
 
  constructor(props) {
    super(props);
    this.sortByVotes = this.sortByVotes.bind(this)
  }

  sortByVotes(a, b) {
    return this.props.posts[b].votes - this.props.posts[a].votes
  }

  render() {
    const {posts} = this.props
    const postKeys = Object.keys(posts)
    const sortedPostKeys = postKeys.sort(this.sortByVotes)

    return (
      <div className="Home container">
        <p className="Home-welcome"> Welcome to <strong>Microblog</strong>, our innovative site for communication on the information superhighway</p>
        <div className="row">
          {sortedPostKeys.map(postKey => <BlogpostCard 
          key={postKey}
            id={postKey}
            title={posts[postKey].title}
            tags={posts[postKey].tags}
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
