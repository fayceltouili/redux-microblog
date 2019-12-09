import React from 'react';
import { votePostOnAPI } from '../actions';
import { connect } from 'react-redux';
import './Vote.css'

const Vote = props => {

  const { votes, postId, votePostOnAPI } = props

  const upVote = () => {
    votePostOnAPI('up', postId)
  }

  const downVote = () => {
    votePostOnAPI('down', postId)
  }

  const voteUnit = Math.abs(votes) === 1  ? 'vote' : 'votes'

  return (
    <div>
      <p className="d-inline"><strong>{votes} {voteUnit} </strong></p> {' '}
      <i className="fas fa-chevron-circle-up d-inline VoteUp VoteIcon" 
        onClick={upVote} /> {' '}
      <i className="fas fa-chevron-circle-down d-inline VoteDown VoteIcon"
        onClick={downVote} /> 
    </div>
  )

}

function mapStateToProps(state, ownProps) {
  const postId = ownProps.postId
  return {
    votes: state.posts[postId].votes,
    postId,
  };
}

export default connect(mapStateToProps, { votePostOnAPI })(Vote);
