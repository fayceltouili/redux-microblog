import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Button } from 'reactstrap'
import EditPostForm from './EditPostForm';
import CommentForm from './CommentForm';
import Comment from './Comment'
import uuid from 'uuid/v4'
import { removePost, updatePost, addComment, removeComment } from './actions';
import { connect } from 'react-redux'

//import './PostDetails.css'

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditForm: false,
    }
    this.toggleEditForm = this.toggleEditForm.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.addComment = this.addComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

  toggleEditForm() {
    this.setState(st => ({
      isEditForm: !st.isEditForm
    }))
  }
  handleDelete(){
    const id = this.props.match.params.id;
    this.props.deletePost(id);
  }
  addComment(comment, commentId) {
    comment.postId = this.props.match.params.id
    this.props.addComment(comment, commentId)
    
  }
  deleteComment(id){
    this.setState(st => {
      const copyComments = st.comments
      delete copyComments[id]
      return {comments: copyComments}
    })
  }
  render() {
    const post = this.props.post
    const id = this.props.match.params.id;
    if(!post){
      return <Redirect to="/"></Redirect>
    }

    return (
      <div className="PostDetails">
        {this.state.isEditForm ? <EditPostForm updateBlogPost={this.props.updateBlogPost} toggleEditForm={this.toggleEditForm} {...post} id={id}/>:
        <div>
          <div>
            <h1>{post.title}</h1>
            <i>{post.description}</i>
            <p>{post.body}</p>
            <Button onClick={this.toggleEditForm}>Edit</Button>
            <Button onClick={this.handleDelete}>Delete</Button>
          </div>
          <hr></hr>
          {post.comments.map(key => <Comment id={key} key={key} />)}
          <CommentForm  addComment={this.addComment}/>
        </div> 
        }      
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const postId = ownProps.match.params.id
  return {
    post: state.posts[postId],

    // comments: state.posts[postId].map(commentId => state.comments[commentId])
  };
}

const mapDispatchToProps = {
  removePost, 
  updatePost, 
  addComment
};

export default connect(mapStateToProps,mapDispatchToProps)(PostDetails);
