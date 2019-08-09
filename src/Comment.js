import React, {Component} from 'react';
import { connect } from 'react-redux'
import { removeCommentFromAPI } from './actions'
//import './Comment.css'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    const commentId = this.props.id;
    const postId = this.props.postId
    this.props.removeCommentFromAPI(commentId, postId)
  }

  render() {
    return (
      <div className="Comment">
        <i className="fas fa-times d-inline p-2 m-1 left PostIcon PostDelete"
          onClick={this.delete} />
        <p className="d-inline p-2 m-1">{this.props.text}</p>

      </div>
    )
    
  }
}

// function mapStateToProps(state, ownProps) {
//   const commentId = ownProps.id
//   return {
//     comment: state.comments[commentId]
//   };
// }

const mapDispatchToProps = { 
  removeCommentFromAPI
};

export default connect(null, mapDispatchToProps)(Comment);
