import React, {Component} from 'react';
import { Button } from 'reactstrap'
//import './Comment.css'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.deleteComment(this.props.id)
  }

  render() {
    return (
      <div className="Comment">

        <Button size='sm' onClick={this.delete}>Delete</Button> {this.props.comment}
      </div>
    )
  }
}

export default Comment