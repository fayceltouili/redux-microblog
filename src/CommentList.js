import React, {Component} from 'react';
import Comment from './Comment'
//import './CommentList.css'

class CommentList extends Component {
  render() {
    return (
      <div className="CommentList">
        {this.props.comments.map((comment, i) => <Comment comment={comment} />)}
      </div>
    )
  }
}

export default CommentList