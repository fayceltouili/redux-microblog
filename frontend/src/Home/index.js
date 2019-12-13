import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import Vote from '../Vote';
import './Home.css';

const Home = ({ posts }) => {
 
console.log(posts)
  // sort posts by vote
  const sortedPostVote = Object.keys(posts).sort((a, b) => 
    posts[b].votes - posts[a].votes
    )

    // extract first image path from body
    const getImgSrc = body => 
      (( body.split(' ').filter(x => x.includes("src="))[0] || '' ).split('src="')[1] || '').slice(0, -1)
  

  return (
    <div className="Home container">

      <div className="container">
        {sortedPostVote.map(postKey => 
          <div className="justify-content-between Home-element" key={postKey}>
            <h5>
              <Link to={`posts/${postKey}`}>{posts[postKey].title.toUpperCase()}</Link>
              <hr></hr>         
            </h5>
            <p>{posts[postKey].description} <Link to={`posts/${postKey}`}>continue reading ..</Link>
            <img src={getImgSrc(posts[postKey].body) || ""} style={{float: 'right', height: 100}}></img>
            </p>
            <small> Created at {moment(posts[postKey].created_at).format('LLLL')}</small>
            <Vote postId={postKey}/>
          </div>
          )}
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
