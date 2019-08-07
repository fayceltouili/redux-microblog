import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { Button } from 'reactstrap'
import EditPostForm from './EditPostForm';
import CommentForm from './CommentForm';
import Comment from './Comment'
import uuid from 'uuid/v4'
//import './PostDetails.css'

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditForm: false,
      comments: {}
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
  addComment(comment) {
    const id = uuid()
    this.setState(st => ({
      comments: {...st.comments, [id]: comment}
    }))
  }
  deleteComment(id){
    this.setState(st => {
      const copyComments = st.comments
      delete copyComments[id]
      return {comments: copyComments}
    })
  }
  render() {
    console.log("comments: ", this.state.comments)
    const { comments }  = this.state
    const id = this.props.match.params.id;
    const post = this.props.posts[id]
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
          {Object.keys(comments).map(key => <Comment comment={comments[key]} id={key} key={key} deleteComment={this.deleteComment} />)}
          <CommentForm  addComment={this.addComment}/>
          
        </div> 
        }      </div>
    )
  }
}

export default PostDetails