import React, {Component} from 'react';
//import './Comment.css'

class Comment extends Component {
  render() {
    return (
      <div className="Comment">
        {this.props.comment}
      </div>
    )
  }
}

export default Comment