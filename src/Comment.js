import React, {Component} from 'react';
import { connect } from 'react-redux'
import { removeComment } from './actions'
import {Redirect} from 'react-router-dom';
//import './Comment.css'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.removeComment(this.props.id)
  }

  render() {
    console.log('comment props: ', this.props.comment)
    if(this.props.comment)
    return (
      <div className="Comment">
        <i class="fas fa-times d-inline p-2 m-1 left PostIcon PostDelete"
          onClick={this.delete} />
        <p className="d-inline p-2 m-1">{this.props.comment.text}</p>

      </div>
    )
    
  }
}

function mapStateToProps(state, ownProps) {
  const commentId = ownProps.id
  return {
    comment: state.comments[commentId]
  };
}

const mapDispatchToProps = { 
  removeComment
};

export default connect(mapStateToProps,mapDispatchToProps)(Comment);
