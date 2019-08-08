import React, {Component} from 'react';
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { removeComment } from './actions'
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
    console.log('comment props: ', this.props)
    return (
      <div className="Comment">

        <Button size='sm' onClick={this.delete}>Delete</Button> {this.props.comment.text}
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
