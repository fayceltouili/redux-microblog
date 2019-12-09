import React from 'react';
import BlogpostCard from '../BlogpostCard'
import {connect} from 'react-redux';

const Home = ({ posts }) => {
 

  // sort posts by vote
  const sortedPostVote = Object.keys(posts).sort((a, b) => 
    posts[b].votes - posts[a].votes
    )

  return (
    <div className="Home container">
      <p className="Home-welcome">
        Welcome to <strong>Microblog</strong>, our innovative site for communication on the information superhighway
      </p>
      <div className="row">
        {sortedPostVote.map(postKey => <BlogpostCard 
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


const mapStateToProps = state => {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(Home);
