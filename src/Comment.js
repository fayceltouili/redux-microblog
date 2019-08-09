import React, {Component} from 'react';
import { connect } from 'react-redux'
import { removeCommentFromAPI, updateCommentToAPI } from './actions';
import EditCommentForm from './EditCommentForm'
//import './Comment.css'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditForm: false,
    }
    this.deleteComment = this.deleteComment.bind(this);
    this.toggleEditCommentForm = this.toggleEditCommentForm.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this)
  }

  deleteComment() {
    const commentId = this.props.id;
    const postId = this.props.postId
    this.props.removeCommentFromAPI(commentId, postId)
  }

  toggleEditCommentForm(){
    this.props.toggleEditComment()
    this.setState(st => ({
      isEditForm: !st.isEditForm
    }));
  }
  handleCommentUpdate(text){
    const commentId = this.props.id;
    const postId = this.props.postId
    this.props.updateCommentToAPI(commentId, text, postId)
    this.toggleEditCommentForm()
  }
  
  render() {
    console.log('comment',this.state)
    const { text, commentId} = this.props
    return (
    <div>
      
      {this.state.isEditForm ? <div> <EditCommentForm 
                                handleCommentUpdate={this.handleCommentUpdate}
                                text={text} commentId={commentId}
                                /> </div>: 
    
      <div className="Comment">
        <i className="fas fa-times d-inline p-2 m-1 left PostIcon PostDelete"
          onClick={this.deleteComment} />
        <i className="far fa-edit d-inline p-2 m-1 left PostIcon PostEdit" 
              onClick={this.toggleEditCommentForm} />
        <p className="d-inline p-2 m-1">{text}</p>

      </div>
      }
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
  removeCommentFromAPI,
  updateCommentToAPI
};

export default connect(null, mapDispatchToProps)(Comment);
