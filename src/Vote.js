import React, {Component} from 'react';
import { votePostOnAPI } from './actions';
import { connect } from 'react-redux';


import './Vote.css'

class Vote extends Component {
  constructor(props){
    super(props);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }


  upVote() {
    const postId = this.props.postId
    this.props.votePostOnAPI('up', postId)
  }

  downVote() {
    const postId = this.props.postId
    this.props.votePostOnAPI('down', postId)
  }
  render() {
    return (
      <div>
         <p className="d-inline"><strong>{this.props.votes} votes </strong></p> {' '}
         <i className="fas fa-chevron-circle-up d-inline VoteUp VoteIcon" 
            onClick={this.upVote} /> {' '}
        <i className="fas fa-chevron-circle-down d-inline VoteDown VoteIcon"
          onClick={this.downVote} /> 
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const postId = ownProps.postId
  return {
    votes: state.posts[postId].votes,

    // comments: state.posts[postId].map(commentId => state.comments[commentId])
  };
}

export default connect(
  mapStateToProps, 
  { votePostOnAPI })
  (Vote);

